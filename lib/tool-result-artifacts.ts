import fs from "node:fs";
import path from "node:path";
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { slugify } from "./slug";

export type ToolResultAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

export type BuildAttachmentsResult = {
  attachments: ToolResultAttachment[];
  pdfOk: boolean;
  docxOk: boolean;
  errors: string[];
};

type InlineRun = { text: string; bold?: boolean };

type Block =
  | { kind: "heading"; level: 1 | 2 | 3; runs: InlineRun[] }
  | { kind: "paragraph"; runs: InlineRun[] }
  | { kind: "bullet"; runs: InlineRun[]; ordered?: string }
  | { kind: "table"; headers: InlineRun[][]; rows: InlineRun[][][] }
  | { kind: "spacer" };

const DISCLAIMER_TEXT_PL =
  "Dokument ma charakter informacyjny i został wygenerowany automatycznie na podstawie danych podanych w formularzu oraz ogólnie dostępnej wiedzy o wymaganiach sanitarno-higienicznych. Nie zastępuje indywidualnej oceny ryzyka przeprowadzonej przez uprawnionego specjalistę ds. bezpieczeństwa żywności ani nie stanowi gwarancji pozytywnego wyniku kontroli PIS/GIS. Przed wdrożeniem i okazaniem dokumentu inspektorowi zalecamy weryfikację merytoryczną i dostosowanie do specyfiki zakładu.";

const FONT_DIR = path.join(process.cwd(), "node_modules/dejavu-fonts-ttf/ttf");

function readFont(name: string): Buffer {
  return fs.readFileSync(path.join(FONT_DIR, name));
}

export async function buildToolResultAttachments(params: {
  toolName: string;
  toolSlug?: string;
  orderId: string;
  resultMarkdown: string;
}): Promise<BuildAttachmentsResult> {
  const baseName = buildBaseName(params.toolSlug ?? params.toolName, params.orderId);
  const markdown = normalizeMarkdown(params.resultMarkdown);
  const markdownWithDisclaimer = `${markdown}\n\n---\n\n**Informacja prawna:** ${DISCLAIMER_TEXT_PL}\n`;
  const blocks = parseMarkdownBlocks(markdownWithDisclaimer);
  const errors: string[] = [];

  const attachments: ToolResultAttachment[] = [
    {
      filename: `${baseName}.md`,
      content: Buffer.from(markdownWithDisclaimer, "utf8"),
      contentType: "text/markdown; charset=utf-8",
    },
  ];

  let docxOk = false;
  let pdfOk = false;

  try {
    const docxContent = await buildDocxBuffer(params.toolName, blocks);
    attachments.push({
      filename: `${baseName}.docx`,
      content: docxContent,
      contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    docxOk = true;
  } catch (err) {
    errors.push(`DOCX: ${err instanceof Error ? err.message : String(err)}`);
  }

  try {
    const pdfContent = await buildPdfBuffer(params.toolName, blocks);
    attachments.push({
      filename: `${baseName}.pdf`,
      content: pdfContent,
      contentType: "application/pdf",
    });
    pdfOk = true;
  } catch (err) {
    errors.push(`PDF: ${err instanceof Error ? err.message : String(err)}`);
  }

  return { attachments, pdfOk, docxOk, errors };
}

function buildBaseName(label: string, orderId: string) {
  const raw = label.replace(/^uslugi:/, "");
  const name = slugify(raw) || "projekt-www";
  return `${name}-${orderId.slice(0, 8)}`;
}

function normalizeMarkdown(value: string) {
  return value.replace(/\r\n/g, "\n").trim();
}

function isTableSeparator(line: string) {
  return /^\|?[\s\-:|]+\|[\s\-:|]+\|?$/.test(line.trim());
}

function isTableRow(line: string) {
  const trimmed = line.trim();
  return trimmed.includes("|") && trimmed.split("|").filter((c) => c.trim()).length >= 2;
}

function parseTableCells(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function parseInlineRuns(raw: string): InlineRun[] {
  const value = raw
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1");

  const runs: InlineRun[] = [];
  const re = /(\*\*(.+?)\*\*|__(.+?)__)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(value)) !== null) {
    if (match.index > lastIndex) {
      runs.push(...splitFillLineRuns(value.slice(lastIndex, match.index)));
    }
    runs.push({ text: match[2] ?? match[3] ?? "", bold: true });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < value.length) {
    runs.push(...splitFillLineRuns(value.slice(lastIndex)));
  }

  return mergeAdjacentRuns(runs.length ? runs : splitFillLineRuns(value));
}

function splitFillLineRuns(text: string): InlineRun[] {
  if (!text.includes("_") && !/\[UZUPEŁNIJ/i.test(text)) {
    return text ? [{ text }] : [];
  }

  const runs: InlineRun[] = [];
  const re = /(_{3,}|\[UZUPEŁNIJ[^\]]*\])/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      runs.push({ text: text.slice(lastIndex, match.index) });
    }
    const token = match[0];
    runs.push({ text: token.startsWith("[") ? token : token.replace(/_/g, "_") });
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    runs.push({ text: text.slice(lastIndex) });
  }

  return runs.filter((r) => r.text.length > 0);
}

function mergeAdjacentRuns(runs: InlineRun[]): InlineRun[] {
  const out: InlineRun[] = [];
  for (const run of runs) {
    const prev = out.at(-1);
    if (prev && !!prev.bold === !!run.bold) {
      prev.text += run.text;
    } else {
      out.push({ ...run });
    }
  }
  return out;
}

function runsToPlainText(runs: InlineRun[]): string {
  return runs.map((r) => r.text).join("");
}

function parseMarkdownBlocks(markdown: string): Block[] {
  const lines = markdown.split("\n");
  const blocks: Block[] = [];
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;
    blocks.push({ kind: "paragraph", runs: parseInlineRuns(paragraphBuffer.join(" ")) });
    paragraphBuffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      flushParagraph();
      if (blocks.at(-1)?.kind !== "spacer") {
        blocks.push({ kind: "spacer" });
      }
      continue;
    }

    const trimmed = line.trim();

    const headingMatch = /^(#{1,3})\s+(.*)$/.exec(trimmed);
    if (headingMatch) {
      flushParagraph();
      blocks.push({
        kind: "heading",
        level: headingMatch[1].length as 1 | 2 | 3,
        runs: parseInlineRuns(headingMatch[2]),
      });
      continue;
    }

    const checkboxMatch = /^[-*]\s+\[([ xX])\]\s+(.*)$/.exec(trimmed);
    if (checkboxMatch) {
      flushParagraph();
      const mark = checkboxMatch[1].toLowerCase() === "x" ? "☑" : "☐";
      blocks.push({
        kind: "bullet",
        runs: [{ text: `${mark} ` }, ...parseInlineRuns(checkboxMatch[2])],
      });
      continue;
    }

    const bulletMatch = /^[-*]\s+(.*)$/.exec(trimmed);
    if (bulletMatch) {
      flushParagraph();
      blocks.push({
        kind: "bullet",
        runs: [{ text: "• " }, ...parseInlineRuns(bulletMatch[1])],
      });
      continue;
    }

    const orderedMatch = /^(\d+)\.\s+(.*)$/.exec(trimmed);
    if (orderedMatch) {
      flushParagraph();
      blocks.push({
        kind: "bullet",
        ordered: orderedMatch[1],
        runs: [{ text: `${orderedMatch[1]}. ` }, ...parseInlineRuns(orderedMatch[2])],
      });
      continue;
    }

    if (isTableRow(trimmed)) {
      const tableLines: string[] = [trimmed];
      while (i + 1 < lines.length && isTableRow(lines[i + 1].trim())) {
        i++;
        tableLines.push(lines[i].trim());
      }

      const dataLines = tableLines.filter((l) => !isTableSeparator(l));
      if (dataLines.length >= 1) {
        flushParagraph();
        const parsed = dataLines.map(parseTableCells);
        const headers = parsed[0].map((cell) => parseInlineRuns(cell));
        const rows = parsed.slice(1).map((row) => row.map((cell) => parseInlineRuns(cell)));
        blocks.push({ kind: "table", headers, rows });
        continue;
      }
    }

    paragraphBuffer.push(trimmed);
  }

  flushParagraph();
  return blocks.filter((block, index) => block.kind !== "spacer" || index < blocks.length - 1);
}

function docxRunsFromInline(runs: InlineRun[], sizeHalfPoints = 22) {
  return runs.map(
    (run) =>
      new TextRun({
        text: run.text,
        bold: run.bold,
        size: sizeHalfPoints,
      }),
  );
}

async function buildDocxBuffer(title: string, blocks: Block[]) {
  const children: (Paragraph | Table)[] = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      spacing: { after: 240 },
      children: [new TextRun({ text: title, bold: true, size: 32 })],
    }),
  ];

  for (const block of blocks) {
    if (block.kind === "spacer") {
      children.push(new Paragraph({ spacing: { after: 160 } }));
      continue;
    }

    if (block.kind === "table") {
      children.push(renderDocxTable(block));
      children.push(new Paragraph({ spacing: { after: 160 } }));
      continue;
    }

    if (block.kind === "heading") {
      children.push(
        new Paragraph({
          heading:
            block.level === 1 ? HeadingLevel.HEADING_1 : block.level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3,
          spacing: { before: 220, after: 120 },
          children: docxRunsFromInline(block.runs, block.level === 1 ? 28 : 24),
        }),
      );
      continue;
    }

    children.push(
      new Paragraph({
        spacing: { after: block.kind === "bullet" ? 80 : 140 },
        children: docxRunsFromInline(block.runs, block.kind === "bullet" ? 21 : 22),
      }),
    );
  }

  const document = new Document({
    sections: [{ properties: {}, children }],
  });

  return Buffer.from(await Packer.toBuffer(document));
}

function renderDocxTable(block: Extract<Block, { kind: "table" }>) {
  const colCount = Math.max(block.headers.length, ...block.rows.map((r) => r.length), 1);

  const makeCell = (runs: InlineRun[] | undefined, header = false) =>
    new TableCell({
      children: [
        new Paragraph({
          children: docxRunsFromInline(runs ?? [{ text: "" }], header ? 20 : 20),
        }),
      ],
    });

  const headerRow = new TableRow({
    children: Array.from({ length: colCount }, (_, i) => makeCell(block.headers[i], true)),
  });

  const dataRows = block.rows.map(
    (row) =>
      new TableRow({
        children: Array.from({ length: colCount }, (_, i) => makeCell(row[i])),
      }),
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [headerRow, ...dataRows],
  });
}

type PdfFonts = { regular: PDFFont; bold: PDFFont };

async function loadPdfFonts(pdf: PDFDocument): Promise<PdfFonts> {
  pdf.registerFontkit(fontkit);
  const regular = await pdf.embedFont(readFont("DejaVuSans.ttf"));
  const bold = await pdf.embedFont(readFont("DejaVuSans-Bold.ttf"));
  return { regular, bold };
}

async function buildPdfBuffer(title: string, blocks: Block[]) {
  const pdf = await PDFDocument.create();
  const fonts = await loadPdfFonts(pdf);
  let page = pdf.addPage();

  const marginX = 50;
  const marginY = 48;
  const maxWidth = page.getWidth() - marginX * 2;
  let cursorY = page.getHeight() - marginY;

  const ensureSpace = (requiredHeight: number) => {
    if (cursorY - requiredHeight >= marginY) return;
    page = pdf.addPage();
    cursorY = page.getHeight() - marginY;
  };

  const drawRuns = (
    runs: InlineRun[],
    fontSize: number,
    opts?: { indent?: number; lineGap?: number },
  ) => {
    const indent = opts?.indent ?? 0;
    const lineHeight = fontSize * 1.45;
    const lines = wrapInlineRuns(runs, fonts, fontSize, maxWidth - indent);

    ensureSpace(lines.length * lineHeight + (opts?.lineGap ?? 8));
    for (const line of lines) {
      let x = marginX + indent;
      for (const segment of line) {
        const font = segment.bold ? fonts.bold : fonts.regular;
        page.drawText(segment.text, {
          x,
          y: cursorY,
          font,
          size: fontSize,
          color: rgb(0.07, 0.1, 0.17),
        });
        x += font.widthOfTextAtSize(segment.text, fontSize);
      }
      cursorY -= lineHeight;
    }
    cursorY -= opts?.lineGap ?? 6;
  };

  drawRuns([{ text: title, bold: true }], 18);

  for (const block of blocks) {
    if (block.kind === "spacer") {
      cursorY -= 6;
      continue;
    }

    if (block.kind === "table") {
      drawPdfTable(page, block, fonts, marginX, marginY, maxWidth, () => {
        page = pdf.addPage();
        cursorY = page.getHeight() - marginY;
        return page;
      }, () => cursorY, (y) => {
        cursorY = y;
      });
      continue;
    }

    if (block.kind === "heading") {
      const headingSize = block.level === 1 ? 15 : block.level === 2 ? 13 : 12;
      drawRuns(block.runs, headingSize, { lineGap: 8 });
      continue;
    }

    drawRuns(block.runs, block.kind === "bullet" ? 10.5 : 11);
  }

  return Buffer.from(await pdf.save());
}

type WrappedSegment = InlineRun;

function wrapInlineRuns(
  runs: InlineRun[],
  fonts: PdfFonts,
  fontSize: number,
  maxWidth: number,
): WrappedSegment[][] {
  const tokens: InlineRun[] = [];
  for (const run of runs) {
    const parts = run.text.split(/(\s+)/);
    for (const part of parts) {
      if (!part) continue;
      tokens.push({ text: part, bold: run.bold });
    }
  }

  const lines: WrappedSegment[][] = [];
  let currentLine: WrappedSegment[] = [];
  let currentWidth = 0;

  const lineWidth = (line: WrappedSegment[]) =>
    line.reduce((w, seg) => {
      const font = seg.bold ? fonts.bold : fonts.regular;
      return w + font.widthOfTextAtSize(seg.text, fontSize);
    }, 0);

  const pushLine = () => {
    if (currentLine.length) lines.push(currentLine);
    currentLine = [];
    currentWidth = 0;
  };

  for (const token of tokens) {
    const font = token.bold ? fonts.bold : fonts.regular;
    const tokenWidth = font.widthOfTextAtSize(token.text, fontSize);

    if (!currentLine.length) {
      if (tokenWidth <= maxWidth) {
        currentLine.push({ ...token });
        currentWidth = tokenWidth;
      } else {
        const broken = breakLongToken(token, font, fontSize, maxWidth);
        for (let i = 0; i < broken.length; i++) {
          if (i < broken.length - 1) {
            lines.push([broken[i]]);
          } else {
            currentLine = [broken[i]];
            currentWidth = font.widthOfTextAtSize(broken[i].text, fontSize);
          }
        }
      }
      continue;
    }

    if (currentWidth + tokenWidth <= maxWidth) {
      const last = currentLine.at(-1);
      if (last && !!last.bold === !!token.bold) {
        last.text += token.text;
      } else {
        currentLine.push({ ...token });
      }
      currentWidth = lineWidth(currentLine);
      continue;
    }

    pushLine();

    if (tokenWidth <= maxWidth) {
      currentLine = [{ ...token }];
      currentWidth = tokenWidth;
    } else {
      const broken = breakLongToken(token, font, fontSize, maxWidth);
      for (let i = 0; i < broken.length; i++) {
        if (i < broken.length - 1) {
          lines.push([broken[i]]);
        } else {
          currentLine = [broken[i]];
          currentWidth = font.widthOfTextAtSize(broken[i].text, fontSize);
        }
      }
    }
  }

  pushLine();
  return lines.length ? lines : [[{ text: "" }]];
}

function breakLongToken(token: InlineRun, font: PDFFont, fontSize: number, maxWidth: number): InlineRun[] {
  const parts: InlineRun[] = [];
  let chunk = "";
  for (const char of token.text) {
    const candidate = `${chunk}${char}`;
    if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
      chunk = candidate;
      continue;
    }
    if (chunk) parts.push({ text: chunk, bold: token.bold });
    chunk = char;
  }
  if (chunk) parts.push({ text: chunk, bold: token.bold });
  return parts.length ? parts : [{ text: token.text, bold: token.bold }];
}

function drawPdfTable(
  startPage: PDFPage,
  block: Extract<Block, { kind: "table" }>,
  fonts: PdfFonts,
  marginX: number,
  marginY: number,
  maxWidth: number,
  newPage: () => PDFPage,
  getCursorY: () => number,
  setCursorY: (y: number) => void,
) {
  let page = startPage;
  let cursorY = getCursorY();
  const colCount = Math.max(block.headers.length, ...block.rows.map((r) => r.length), 1);
  const colWidth = maxWidth / colCount;
  const cellPadX = 4;
  const cellPadY = 4;
  const fontSize = 9;
  const lineHeight = fontSize * 1.35;

  const rowHeight = (cells: InlineRun[][]) => {
    let maxLines = 1;
    for (const cell of cells) {
      const lines = wrapInlineRuns(cell ?? [{ text: "" }], fonts, fontSize, colWidth - cellPadX * 2);
      maxLines = Math.max(maxLines, lines.length);
    }
    return maxLines * lineHeight + cellPadY * 2;
  };

  const drawRow = (cells: InlineRun[][], header: boolean) => {
    const height = rowHeight(cells);
    if (cursorY - height < marginY) {
      page = newPage();
      cursorY = page.getHeight() - marginY;
    }

    const topY = cursorY;
    for (let c = 0; c < colCount; c++) {
      const x = marginX + c * colWidth;
      page.drawRectangle({
        x,
        y: topY - height,
        width: colWidth,
        height,
        borderColor: rgb(0.75, 0.78, 0.82),
        borderWidth: 0.5,
        color: header ? rgb(0.95, 0.96, 0.98) : rgb(1, 1, 1),
      });

      const lines = wrapInlineRuns(cells[c] ?? [{ text: "" }], fonts, fontSize, colWidth - cellPadX * 2);
      let textY = topY - cellPadY - fontSize;
      for (const line of lines) {
        let tx = x + cellPadX;
        for (const seg of line) {
          const font = seg.bold || header ? fonts.bold : fonts.regular;
          page.drawText(seg.text, {
            x: tx,
            y: textY,
            font,
            size: fontSize,
            color: rgb(0.07, 0.1, 0.17),
          });
          tx += font.widthOfTextAtSize(seg.text, fontSize);
        }
        textY -= lineHeight;
      }
    }

    cursorY = topY - height - 4;
  };

  const headerCells = Array.from({ length: colCount }, (_, i) => block.headers[i] ?? [{ text: "" }]);
  drawRow(headerCells, true);
  for (const row of block.rows) {
    const cells = Array.from({ length: colCount }, (_, i) => row[i] ?? [{ text: "" }]);
    drawRow(cells, false);
  }

  setCursorY(cursorY - 4);
}

export { runsToPlainText, parseInlineRuns, parseMarkdownBlocks };

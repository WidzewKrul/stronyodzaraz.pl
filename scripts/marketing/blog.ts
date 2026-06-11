/**
 * Generate one blog post via OpenRouter (CLI).
 *
 * npm run mkt:blog -- --keyword "ile kosztuje sklep internetowy"
 * npm run mkt:blog -- --from-queue
 * npm run mkt:blog -- --keyword "..." --dry-run
 */
import { parseArgs, logSection, logOk, logErr } from "./_lib";
import { generateAndPublishBlogArticle } from "../../lib/blog-generate";
import { pickNextPendingItem, markQueueItem } from "../../lib/blog-queue";

async function main() {
  const args = parseArgs();
  const dryRun = Boolean(args["dry-run"]);
  const fromQueue = Boolean(args["from-queue"]);
  const keyword = typeof args.keyword === "string" ? args.keyword : undefined;

  if (fromQueue) {
    const next = await pickNextPendingItem();
    if (!next) {
      logErr("Brak pending w kolejce BlogQueue (DB)");
      process.exit(1);
    }
    const { item } = next;
    logSection(`Kolejka: ${item.primaryKeyword}`);
    if (dryRun) {
      logOk(`Dry-run — pominięto generowanie (${item.category})`);
      return;
    }
    await markQueueItem(item.primaryKeyword, { status: "generating" });
    const result = await generateAndPublishBlogArticle({
      primaryKeyword: item.primaryKeyword,
      category: item.category,
      internalLinks: item.internalLinks,
    });
    if (!result.ok) {
      await markQueueItem(item.primaryKeyword, { status: "failed", error: result.error });
      logErr(result.error);
      process.exit(1);
    }
    await markQueueItem(item.primaryKeyword, { status: "published", publishedSlug: result.slug });
    logOk(`Opublikowano: /blog/${result.slug}`);
    return;
  }

  if (!keyword) {
    logErr("Podaj --keyword \"fraza\" lub --from-queue");
    process.exit(1);
  }

  logSection(`Keyword: ${keyword}`);
  if (dryRun) {
    logOk("Dry-run — bez wywołania OpenRouter");
    return;
  }

  const result = await generateAndPublishBlogArticle({
    primaryKeyword: keyword,
    category: "strony-internetowe",
    internalLinks: ["/uslugi", "/uslugi/strony-internetowe"],
  });

  if (!result.ok) {
    logErr(result.error);
    process.exit(1);
  }
  logOk(`Zapisano: ${result.path} → /blog/${result.slug}`);
}

main().catch((e) => {
  logErr(String(e));
  process.exit(1);
});

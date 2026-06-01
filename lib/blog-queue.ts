import fs from "node:fs";
import path from "node:path";

export type QueueItem = {
  priority: number;
  primaryKeyword: string;
  category: string;
  internalLinks: string[];
  status: "pending" | "generating" | "published" | "failed";
  publishedSlug?: string;
  error?: string;
};

type QueueFile = { version: number; items: QueueItem[] };

const QUEUE_PATH = path.join(process.cwd(), "content", "blog", "queue.json");
const SEED_PATH = path.join(process.cwd(), "docs", "blog", "queue", "seed-queue.json");

function ensureQueueFile(): QueueFile {
  fs.mkdirSync(path.dirname(QUEUE_PATH), { recursive: true });
  if (!fs.existsSync(QUEUE_PATH)) {
    const seed = JSON.parse(fs.readFileSync(SEED_PATH, "utf8")) as QueueFile;
    fs.writeFileSync(QUEUE_PATH, JSON.stringify(seed, null, 2), "utf8");
    return seed;
  }
  return JSON.parse(fs.readFileSync(QUEUE_PATH, "utf8")) as QueueFile;
}

export function loadBlogQueue(): QueueFile {
  return ensureQueueFile();
}

function saveQueue(data: QueueFile): void {
  fs.mkdirSync(path.dirname(QUEUE_PATH), { recursive: true });
  fs.writeFileSync(QUEUE_PATH, JSON.stringify(data, null, 2), "utf8");
}

export function pickNextPendingItem(): { item: QueueItem; index: number } | null {
  const data = loadBlogQueue();
  let bestIdx = -1;
  let bestPriority = -1;
  for (let i = 0; i < data.items.length; i++) {
    const it = data.items[i];
    if (it.status !== "pending") continue;
    if (it.priority > bestPriority) {
      bestPriority = it.priority;
      bestIdx = i;
    }
  }
  if (bestIdx < 0) return null;
  return { item: data.items[bestIdx], index: bestIdx };
}

export function markQueueItem(index: number, patch: Partial<QueueItem>): void {
  const data = loadBlogQueue();
  data.items[index] = { ...data.items[index], ...patch };
  saveQueue(data);
}

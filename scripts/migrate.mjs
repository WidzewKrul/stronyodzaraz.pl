import { readFileSync } from "node:fs";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

const client = postgres(url, { max: 1 });
const db = drizzle(client);

async function applySqlFile(path) {
  const repairSql = readFileSync(path, "utf8");
  for (const statement of repairSql.split("--> statement-breakpoint")) {
    const sql = statement.trim();
    if (sql) await client.unsafe(sql);
  }
}

console.log("[migrate] Running migrations...");
await migrate(db, { migrationsFolder: "./drizzle" });

const [{ reg }] = await client`
  SELECT to_regclass('public."DocumentTemplate"') AS reg
`;
if (!reg) {
  console.log("[migrate] Repair missing DocumentTemplate from 0001...");
  await applySqlFile("./drizzle/0001_document_templates.sql");
}

console.log("[migrate] Repair ServiceOrder customer columns from 0002...");
await applySqlFile("./drizzle/0002_service_order_customer.sql");

console.log("[migrate] Done.");
await client.end();

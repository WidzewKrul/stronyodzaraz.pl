# Blog — folder docs

| Plik | Opis |
|------|------|
| `../BLOG-AUTOMAT.md` | Pełna architektura automatycznego bloga |
| `prompts/system-blog.md` | System prompt OpenRouter |
| `prompts/article-output.schema.json` | Schemat JSON outputu |
| `queue/seed-queue.json` | 40 tematów startowych |

**Runtime (po implementacji):**
- `content/blog/*.md` — opublikowane artykuły
- `content/blog/queue.json` — stan kolejki (sync ze seed)

# Avantgarde Studio website — notes for Claude

Static bilingual (zh/en) site in `site/`, rendered from `site/assets/js/content.js` (home) and `site/assets/js/content-pages.js` (subpages). Hosted on Cloudflare Pages, project `avantgarde-site`, domain www.a-v-a-n-t-g-a-r-d-e.com.

## Workflow

- After editing content.js, content-pages.js, main.js or page.js, run `npm run build` and commit the regenerated HTML and `sitemap.xml` with the change. The pages carry pre-rendered Chinese copy, so a stale build shows old text to crawlers and no-JS visitors.
- `npm test` must pass; `npm run test:worker` too when touching `workers/lab-results` or the AG LAB copy it reads (`site/lab/js/lab-content.js`, `lab-items.js`, `lab-reading.js`). For copy or layout changes, also run `npm run check` (line breaks, orphans, overflow at 280–2560 px). Compare against the previous commit: some footer flags are long-standing.
- Pushing to `main` deploys automatically (`.github/workflows/deploy.yml`). Work on a branch and merge to `main` only when the change is ready to go live.
- Write copy in both languages. Chinese titles break only at punctuation or a zero-width break (U+200B, written as a backslash-u200b escape in content.js).

## Rules for content

- This repository is public. Never commit internal notes, meeting minutes, partners' or tutors' private details, or secrets. `.gitignore` lists the folders that stay on the owner's PC.
- Tutors appear by initials only: LD (shown as "Dr LD"), HS, KL, XG. Never write their full names, in pages, file names, URLs or comments.
- Dr LD is billed only as "Independent Curator and Reader". Never mention UAL, Chelsea or her role there in any written or marketing material.
- HS and KL are anonymised: no names, schools or employers beyond what content.js already says.
- Visual design is black, white and grey only (`#0e0f0e`, `#f4f5f3`, `#d6d6d5`). Partner logos are drawn in `currentColor`.
- Results are Skyline's 2025–26 offers and must stay credited to Skyline. Don't promise admission anywhere.

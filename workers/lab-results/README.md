# AG LAB results Worker

Stores AG LAB submissions in Cloudflare D1 and emails visitors their results with Cloudflare Email Service.
It runs on the site's own domain under `/api/lab/*`, next to the Pages site.

| Route | What it does |
| --- | --- |
| `POST /api/lab/lead` | The results page's one form (unlock + 1:1 reading). Stores the lead and notifies `STUDIO_TO`. If the visitor leaves an email, it also sends them the full report: the web reading plus about twice as much again, in the studio email template. |
| `POST /api/lab/results` | Report-only endpoint (email + consent, Turnstile, rate limits). The page no longer shows a separate email form, so nothing calls it today; it's kept for a future "send again" link. |
| cron, daily | Deletes everything older than 12 months, as the privacy notice promises. |

The page sends result **keys** only (type, sign numbers, archetype…). Every email is written here from the shared copy in `site/lab/js/`, so the endpoint can't be used to send arbitrary content.

## One-time setup (owner)

1. **Workers Paid plan.** Sending to any address needs it (Dashboard → Workers & Pages → Plans).
2. **Onboard the domain for sending.** Go to Compute → Email Service → Email Sending → Onboard Domain → `a-v-a-n-t-g-a-r-d-e.com`. Cloudflare adds the SPF, DKIM and DMARC records.
3. **Database:** done. `ag-lab` (APAC) exists and its ID is in `wrangler.jsonc`. The deploy creates the tables (`d1 migrations apply`).
4. **Turnstile (spam protection):**
   - Create a widget for `www.a-v-a-n-t-g-a-r-d-e.com` under Dashboard → Turnstile.
   - Put the **site key** in `site/lab/js/lab-content.js` → `meta.turnstileSiteKey`.
   - Store the **secret** on the Worker:
     ```bash
     npx -y wrangler@4 secret put TURNSTILE_SECRET
     ```
   Until both are set, the Turnstile check is skipped and only the rate limits apply.
5. **API token.** The Worker step uses the GitHub secret `LAB_WORKER_API_TOKEN` if it exists, otherwise `CLOUDFLARE_API_TOKEN`. That token needs, on this account: Workers Scripts, Workers Routes, D1 and Email Sending (all Edit). If deploys fail with `code 7403` on `/d1/database/…`, the token in use lacks D1 on this account.
6. **Turn on automatic deploys.** In GitHub, go to Settings → Secrets and variables → Actions → Variables and add `LAB_WORKER` = `on`. Each push to `main` then applies migrations and deploys the Worker after the Pages site.

To deploy by hand instead: `npm run deploy:worker`.

## Secrets and private endpoints

This repo is public. Secrets never go in `wrangler.jsonc`, code or docs:
```bash
npx -y wrangler@4 secret put TURNSTILE_SECRET     # and any future key, e.g. CRM_API_KEY
npx -y wrangler@4 secret put CRM_URL              # private endpoints are secrets too
```
Read them as `env.NAME`. `vars` in `wrangler.jsonc` is only for public values (sender addresses, the site URL). `npm test` includes a secret scan.

## Local development

```bash
npm run test:worker          # stubbed D1 / email / rate limits, runs anywhere
npm run dev:worker           # wrangler dev: local D1, emails written to .wrangler/tmp instead of sent
```
Before the first `wrangler dev`, run `npx -y wrangler@4 d1 migrations apply ag-lab --local`.

## Reading the data

```bash
npx -y wrangler@4 d1 execute ag-lab --remote --command "SELECT created_at, purpose, type, sun, moon, rising FROM submissions ORDER BY created_at DESC LIMIT 20"
```
For item analysis (Cronbach's α per scale), see `tools/lab-psychometrics.js`. Exports are participant data, so keep them off GitHub (`lab-answers*.json` is gitignored).

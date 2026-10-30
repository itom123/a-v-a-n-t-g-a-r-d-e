# Contact-form Worker (`avantgarde-contact`)

Handles the home page's "从一次作品集评估开始" form: checks Turnstile, rate-limits and de-duplicates with a
Durable Object (`AvantgardeEmailGuard`), emails the enquiry to `hello@` and sends the visitor a confirmation.
It is served at `https://email-api.a-v-a-n-t-g-a-r-d-e.com/v1/contact/avantgarde`.

## How it deploys

The Worker's settings live in Cloudflare and are not in this repo: the email bindings (`SEND_EMAIL`, `SEND_ACK`),
the Durable Object binding (`EMAIL_GUARD`), the `email-api` domain, and the secrets `TURNSTILE_SECRET` and
`CONTACT_DEDUPLICATION_KEY`. When `src/index.js` changes on `main`, the Deploy workflow uploads the code alone
through Cloudflare's "put script content" API, which leaves those settings untouched. There is no wrangler
config here on purpose: a `wrangler deploy` without the exact settings could drop a binding or the domain.

To change a setting, use the Cloudflare dashboard (Workers & Pages → avantgarde-contact → Settings).

## Notes

- The email template is the studio standard shared with `workers/lab-results/src/template.js`; keep the two in step.
- Tutors appear by initials only (this repo is public).
- The source here was taken from the deployed Worker on 2026-10-30; nothing else was changed apart from the
  dark-mode logo (`badge.png`, "light only") and the tutor initials.

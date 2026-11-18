# Early Light Biodigestion

**Modular biodigestion systems that turn organic waste into premium byproducts.**

Early Light deploys Flybox.bio's Insect Waste Management™ technology to convert organic waste on-site — cheaper, greener, and 20× faster than composting.

## Structure

```
index.html                  — Main marketing site
partners/
  houston-hospitality.html  — Password-protected partner portal (HoustonHospitality)
css/
  style.css                 — Global styles
```

## Partner Portal

Access partner sites via the portal at the bottom of the home page. Enter the project name to navigate to the partner-specific page.

- **HoustonHospitality** — requires access code

## Ecosystem Links

- [White Eagle Nutrition](https://whiteeaglenutrition.com)
- [Nellie's Garden Frass Co.](https://nelliesgarden.com)
- [Nellie's BSFL](https://nelliesbsfl.com)
- [Light Forager](https://lightforager.org)
- [Flybox.bio](https://flybox.bio)

## Public-site analytics

PostHog is configured at build time, not from committed credentials. Set
`POSTHOG_PROJECT_KEY` to the public ingestion key for the existing website
analytics project and `POSTHOG_HOST` to its verified ingestion host in Vercel's
Production environment. Then deploy this change. `vercel.json` builds `dist/`
with `node scripts/build.mjs`. With missing values the build succeeds and
analytics stays off, with a configuration warning.

Only the five public earlylight.bio pages are instrumented. The partner portal,
preview hosts, Global Privacy Control and Do Not Track requests are excluded.
No replay, autocapture, person profiles, persistent browser storage, form text,
email values, campaign parameters or query strings are captured. Referrers retain
only the origin. Mail links record an intent click, not a submitted lead. Outbound
clicks record only the destination hostname. The public contact form emits
`lead_submitted` only after Formspree accepts the submission; failures and
in-flight repeated clicks do not count. No form field values enter analytics.
This is a lead-generation website, not an online checkout: there is deliberately
no `Purchase` event or invented order revenue. Purchases belong on the actual
store/order-confirmation integration, not a marketing link click.
These conservative storage settings limit cross-page visitor/session metrics.

Checks: `node --check assets/analytics.js`, `node --check assets/contact-form.js`, `node --test tests/*.test.cjs`,
and `node scripts/build.mjs`. To test an injected build locally, supply test
values for both variables. After deployment, verify actual events in PostHog;
a passing unit test does not prove production ingestion. A reverse proxy can
be evaluated later to reduce events lost to blockers.

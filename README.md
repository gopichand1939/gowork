# GoWork

Gopichand's portfolio for product engineering and software consulting, built with Next.js, React, and TypeScript.

## Local development

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. Project content lives in `lib/projects.ts`, and branding and contact details live in `lib/site.ts`.

## Checks and production build

```sh
npm test
npm run build
```

The production build exports the site to `out/`. Run `npm start` to serve that export locally.

## Netlify deployment

Connect this repository to Netlify with production branch `main`. The checked-in `netlify.toml` configures Node.js 22, `npm run build`, and the `out` publish directory.

Set `NEXT_PUBLIC_SITE_URL` to the production site URL before building so canonical links and the sitemap point to the deployed site. See `.env.example` for configuration. The contact form defaults to preparing an email draft; enable Netlify Forms mode only after configuring and verifying form handling.

For a manual deployment with an authenticated and linked Netlify CLI:

```sh
npx netlify-cli deploy --build --prod
```

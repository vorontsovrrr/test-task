# Dev Journal 

## Run locally

```bash
npm install
npm run develop
```

Open http://localhost:8000.

## Build & serve static HTML

```bash
npm run build
npm run serve
```

Open http://localhost:9000 and view source to verify posts are pre-rendered.

## Pages
- `/` Home: lists posts (title, excerpt, author, date)
- `/posts/{slug}` Post: MDX rendered with Prism highlighting and SEO
- `/admin` Admin: client-only editor with preview (excluded from sitemap)
- `/about` About: static author info and avatar

## About data strategy
About page renders static content at build time for predictability and performance.

## Backend integration

- Run backend in `../backend` with `npm install && npm run start:dev` (NestJS + SQLite).
- Frontend admin uses `GATSBY_API_BASE_URL` (default `http://localhost:4000`) to create posts.
- Backend writes JSON files into `frontend/src/data/posts` and optionally pings Gatsby refresh when `ENABLE_GATSBY_REFRESH_ENDPOINT=true`.

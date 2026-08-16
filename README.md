# all-websites

Curated bookmark gallery (“Links”) backed by PocketBase. Each entry has a title, URL, image, tag, featured flag, and sort order.

**Live:** [all-websites.w-ilyas.site](https://all-websites.w-ilyas.site)

## Stack

pnpm, Vite 8, React 19, TanStack Query, Tailwind CSS 4, PocketBase (`VITE_PB_URL`).

## Run locally

```bash
pnpm install
cp .env.example .env   # set VITE_PB_URL
pnpm dev
```


## Deploy

Push to `main` builds with pnpm/Vite and deploys over SSH, then reloads the Caddy site config.

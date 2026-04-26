# PinkPawPets

Static website for **PinkPawPets** — loving pet care by Charlie & Katie.

Live site: [https://pinkpawpets.com](https://pinkpawpets.com)

## Stack

- Single-page static HTML/CSS/JS (no build step)
- Hosted on GitHub Pages
- Custom domain via GoDaddy DNS

## Files

- `index.html` — the live site
- `pinkpawpets_booking_website_v2.html` — original component fragment (kept for reference)
- `CNAME` — tells GitHub Pages the custom domain

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

Push to `main`. GitHub Pages auto-deploys.

## DNS (GoDaddy)

Apex `pinkpawpets.com` points to GitHub Pages IPs:

| Type  | Name | Value                |
|-------|------|----------------------|
| A     | @    | 185.199.108.153      |
| A     | @    | 185.199.109.153      |
| A     | @    | 185.199.110.153      |
| A     | @    | 185.199.111.153      |
| CNAME | www  | rtekarch.github.io   |

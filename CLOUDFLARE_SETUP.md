# Cloudflare Setup

This repo can be served directly from GitHub Pages today. Cloudflare is still an account-side step, so it is documented here instead of being "done" in git.

## Recommended Setup

1. Add `vikramaditya.me` to Cloudflare.
2. Point the apex domain and `www` records to the current GitHub Pages target.
3. Keep the orange cloud proxy enabled.
4. In SSL/TLS, use `Full`.
5. Enable Brotli, Auto Minify, Early Hints, HTTP/3, and Tiered Cache.
6. Add a cache rule for static assets:
   - `assets/*`
   - Cache level: `Cache Everything`
   - Edge TTL: 1 month
7. Add a bypass rule for HTML if fresh content edits need faster rollout.
8. Add WAF bot protection and basic rate limiting for the contact form path.

## Notes

- `CNAME` already exists and should not be changed.
- Service worker and manifest support are part of the repo now, so Cloudflare should be configured to respect normal caching and not strip them.
- If Cloudflare is enabled later, do one final smoke test for:
  - theme toggle
  - service worker registration
  - offline fallback
  - form submit
  - canonical URLs

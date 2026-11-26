---
name: verify-app
description: Launch, check and drive the static About Me page (index.html + styles.css + assets/portrait.jpg) to prove a change works. Use after any edit to the page.
---

# verify-app — static About Me page

No build step, no JS. The "app" is the repo root served as static files.

## Launch
```
python3 -m http.server 8731 --bind 127.0.0.1 >/tmp/verify-app.log 2>&1 &
echo $! > /tmp/verify-app.pid
sleep 1; curl -sf -o /dev/null -w '%{http_code}\n' http://127.0.0.1:8731/   # expect 200
```
Reuse the Fredrin preview instead if it is already running.

## Doctor (read-only)
```
test -s index.html && test -s styles.css && test -s assets/portrait.jpg
file assets/portrait.jpg                      # JPEG 510x510
grep -c 'href="https://salvatoreamoroso.com/"' index.html
grep -c 'href="https://github.com/salvatore-amoroso"' index.html
grep -c 'linkedin.com/in/salvatore-amoroso-640279159/' index.html
grep -c 'href="mailto:inquiries@salvatoreamoroso.com"' index.html
! grep -E 'https?://[^"]*(fonts|cdn)' index.html styles.css   # no external font/CDN
```
Each grep count must be 1.

## Drive
Use a headless browser (Playwright chromium) against http://127.0.0.1:8731/ at widths 1280, 390, 320.
Selectors/routes:
- `h1` — exactly one, text "Salvatore Amoroso"
- `main .example` — exactly three sections (`#yokoy`, `#perk`, `#neptune` headings)
- `footer a` — four links (Portfolio, GitHub, LinkedIn, mailto)
- `img.portrait` — `complete && naturalWidth === 510`
- Overflow: `document.documentElement.scrollWidth <= clientWidth` at every width
- Keyboard: press Tab repeatedly; each link's `:focus-visible` shows a 3px outline
- No portrait: `document.querySelector('.portrait').remove()` then re-check overflow and that the intro text still fills the row

## Evidence
Screenshots per width (full page), the printed measurements (scrollWidth/clientWidth, link hrefs, naturalWidth), and the HTTP status.

## Cleanup
Kill only what Launch started: `kill $(cat /tmp/verify-app.pid) && rm -f /tmp/verify-app.pid /tmp/verify-app.log`.

## Feature map
| Feature | Where | Check |
|---|---|---|
| Name + intro + portrait | `header.intro` | h1, portrait loads |
| Three work examples | `main .examples` | 3 `.example`, grid → stacked on mobile |
| Contact links | `footer .links` | 4 hrefs, focus visible |
| Theme tokens | `:root` in `styles.css` | contrast AA |

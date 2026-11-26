// Fredrin host for the static About Me page.
// The page files at the repo root stay the single source of truth: they are
// pulled into the module graph as static imports, so the sandboxed app needs
// no read grant outside $APP_DATA.
import { fredrin } from "fredrin";
import page from "../../index.html" with { type: "text" };
import styles from "../../styles.css" with { type: "text" };
import portrait from "../../assets/portrait.jpg" with { type: "bytes" };

const routes: Record<string, { body: BodyInit; type: string }> = {
  "/": { body: page, type: "text/html; charset=utf-8" },
  "/index.html": { body: page, type: "text/html; charset=utf-8" },
  "/styles.css": { body: styles, type: "text/css; charset=utf-8" },
  "/assets/portrait.jpg": { body: portrait, type: "image/jpeg" },
};

fredrin.serve((req) => {
  const route = routes[new URL(req.url).pathname];
  if (!route) return new Response("not found", { status: 404 });
  return new Response(route.body, { headers: { "content-type": route.type } });
});

const express = require("express");

const app = express();
const port = Number(process.env.PORT || 8080);

const envName = process.env.APP_ENV || "unknown";
const imageTag = process.env.IMAGE_TAG || "unknown";
const hostname = process.env.HOSTNAME || "local";

app.get("/healthz", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Promote Demo — ${envName}</title>
  <style>
    :root {
      --ink: #0f172a;
      --muted: #475569;
      --bg: #f8fafc;
      --panel: #ffffff;
      --accent: #0ea5e9;
      --border: #e2e8f0;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: "IBM Plex Sans", "Segoe UI", sans-serif;
      color: var(--ink);
      background:
        radial-gradient(1200px 600px at 10% -10%, #bae6fd 0%, transparent 55%),
        radial-gradient(900px 500px at 100% 0%, #e2e8f0 0%, transparent 50%),
        var(--bg);
      display: grid;
      place-items: center;
      padding: 2rem;
    }
    main {
      width: min(42rem, 100%);
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
    }
    h1 {
      margin: 0 0 0.5rem;
      font-size: clamp(1.6rem, 3vw, 2.1rem);
      letter-spacing: -0.02em;
    }
    p { margin: 0 0 1.25rem; color: var(--muted); line-height: 1.5; }
    dl {
      display: grid;
      grid-template-columns: 8rem 1fr;
      gap: 0.65rem 1rem;
      margin: 0;
    }
    dt { color: var(--muted); font-weight: 600; }
    dd {
      margin: 0;
      font-family: "IBM Plex Mono", ui-monospace, monospace;
      font-size: 0.95rem;
      word-break: break-all;
    }
    .pill {
      display: inline-block;
      margin-bottom: 1rem;
      padding: 0.25rem 0.7rem;
      border-radius: 999px;
      background: #e0f2fe;
      color: #0369a1;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <main>
    <div class="pill">${envName}</div>
    <h1>Harness CI → ArgoCD promote</h1>
    <p>Same image tag moves Dev → Staging → Prod by updating Git desired state. ArgoCD only syncs.</p>
    <dl>
      <dt>Environment</dt><dd>${envName}</dd>
      <dt>Image tag</dt><dd>${imageTag}</dd>
      <dt>Pod</dt><dd>${hostname}</dd>
    </dl>
  </main>
</body>
</html>`);
});

app.listen(port, () => {
  console.log(`promote-demo listening on :${port} env=${envName} tag=${imageTag}`);
});

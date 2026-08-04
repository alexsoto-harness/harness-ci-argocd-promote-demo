"use strict";

const express = require("express");
const { healthPayload } = require("./lib/health");
const { readEnv } = require("./lib/env");
const { renderPage } = require("./lib/html");

function createApp(env = process.env) {
  const app = express();
  const runtime = readEnv(env);

  app.get("/healthz", (_req, res) => {
    res.status(200).json(healthPayload());
  });

  app.get("/", (_req, res) => {
    res.type("html").send(
      renderPage({
        envName: runtime.envName,
        imageTag: runtime.imageTag,
        hostname: runtime.hostname,
      }),
    );
  });

  return app;
}

function start(env = process.env) {
  const runtime = readEnv(env);
  const app = createApp(env);
  return app.listen(runtime.port, () => {
    console.log(
      `promote-demo listening on :${runtime.port} env=${runtime.envName} tag=${runtime.imageTag}`,
    );
  });
}

if (require.main === module) {
  start();
}

module.exports = { createApp, start };

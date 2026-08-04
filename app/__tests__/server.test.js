"use strict";

const http = require("http");
const { createApp } = require("../server");

function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

function get(port, path) {
  return new Promise((resolve, reject) => {
    http
      .get({ host: "127.0.0.1", port, path }, (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => resolve({ status: res.statusCode, body }));
      })
      .on("error", reject);
  });
}

describe("server", () => {
  test("GET /healthz", async () => {
    const app = createApp({
      APP_ENV: "dev",
      IMAGE_TAG: "1",
      HOSTNAME: "test",
      PORT: "0",
    });
    const { server, port } = await listen(app);
    try {
      const res = await get(port, "/healthz");
      expect(res.status).toBe(200);
      expect(JSON.parse(res.body)).toEqual({ status: "ok" });
    } finally {
      await new Promise((r) => server.close(r));
    }
  });

  test("GET / renders page", async () => {
    const app = createApp({
      APP_ENV: "staging",
      IMAGE_TAG: "99",
      HOSTNAME: "pod-x",
      PORT: "0",
    });
    const { server, port } = await listen(app);
    try {
      const res = await get(port, "/");
      expect(res.status).toBe(200);
      expect(res.body).toContain("staging");
      expect(res.body).toContain("99");
      expect(res.body).toContain("pod-x");
    } finally {
      await new Promise((r) => server.close(r));
    }
  });
});

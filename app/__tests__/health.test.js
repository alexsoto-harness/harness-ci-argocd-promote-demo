"use strict";

const { healthPayload, isHealthy } = require("../lib/health");

describe("health", () => {
  test("healthPayload returns ok", () => {
    expect(healthPayload()).toEqual({ status: "ok" });
  });

  test("isHealthy accepts ok payload", () => {
    expect(isHealthy({ status: "ok" })).toBe(true);
  });

  test("isHealthy rejects missing status", () => {
    expect(isHealthy({})).toBe(false);
  });

  test("isHealthy rejects null", () => {
    expect(isHealthy(null)).toBe(false);
  });

  test("isHealthy rejects degraded", () => {
    expect(isHealthy({ status: "degraded" })).toBe(false);
  });
});

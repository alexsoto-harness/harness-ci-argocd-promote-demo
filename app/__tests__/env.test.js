"use strict";

const { readEnv, formatLabel, isKnownEnv } = require("../lib/env");

describe("env", () => {
  test("readEnv uses defaults", () => {
    expect(readEnv({})).toEqual({
      envName: "unknown",
      imageTag: "unknown",
      hostname: "local",
      port: 8080,
    });
  });

  test("readEnv maps provided values", () => {
    expect(
      readEnv({
        APP_ENV: "dev",
        IMAGE_TAG: "42",
        HOSTNAME: "pod-a",
        PORT: "9090",
      }),
    ).toEqual({
      envName: "dev",
      imageTag: "42",
      hostname: "pod-a",
      port: 9090,
    });
  });

  test("formatLabel joins env and tag", () => {
    expect(formatLabel({ envName: "staging", imageTag: "9" })).toBe("staging@9");
  });

  test("isKnownEnv accepts demo envs", () => {
    expect(isKnownEnv("dev")).toBe(true);
    expect(isKnownEnv("staging")).toBe(true);
    expect(isKnownEnv("prod")).toBe(true);
    expect(isKnownEnv("unknown")).toBe(true);
  });

  test("isKnownEnv rejects others", () => {
    expect(isKnownEnv("qa")).toBe(false);
  });
});

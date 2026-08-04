"use strict";

const {
  isNonEmptyString,
  isPositiveInt,
  isImageTag,
  assertEnvName,
} = require("../lib/validate");

describe("validate", () => {
  test("isNonEmptyString true", () => {
    expect(isNonEmptyString("x")).toBe(true);
  });
  test("isNonEmptyString false for blank", () => {
    expect(isNonEmptyString("  ")).toBe(false);
  });
  test("isPositiveInt true", () => expect(isPositiveInt("3")).toBe(true));
  test("isPositiveInt false for zero", () => expect(isPositiveInt(0)).toBe(false));
  test("isImageTag accepts tags", () => {
    expect(isImageTag("1.2.3")).toBe(true);
    expect(isImageTag("build_42")).toBe(true);
  });
  test("isImageTag rejects spaces", () => {
    expect(isImageTag("bad tag")).toBe(false);
  });
  test("assertEnvName accepts known", () => {
    expect(assertEnvName("dev")).toBe("dev");
  });
  test("assertEnvName rejects unknown", () => {
    expect(() => assertEnvName("qa")).toThrow(/invalid env/);
  });
});

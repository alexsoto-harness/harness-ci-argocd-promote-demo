"use strict";

const { maybeSlow } = require("../../lib/delay");
const { clamp } = require("../../lib/math");

describe("slow math suite 08", () => {
  test("slow math/clamp #41", async () => {
    await maybeSlow(20);
    expect(clamp(41, 0, 100)).toBe(41);
  });
  test("slow math/clamp #42", async () => {
    await maybeSlow(20);
    expect(clamp(42, 0, 100)).toBe(42);
  });
  test("slow math/clamp #43", async () => {
    await maybeSlow(20);
    expect(clamp(43, 0, 100)).toBe(43);
  });
  test("slow math/clamp #44", async () => {
    await maybeSlow(20);
    expect(clamp(44, 0, 100)).toBe(44);
  });
  test("slow math/clamp #45", async () => {
    await maybeSlow(20);
    expect(clamp(45, 0, 100)).toBe(45);
  });
});

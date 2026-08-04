"use strict";

const { maybeSlow } = require("../../lib/delay");
const { clamp } = require("../../lib/math");

describe("slow math suite 02", () => {
  test("slow math/clamp #11", async () => {
    await maybeSlow(20);
    expect(clamp(11, 0, 100)).toBe(11);
  });
  test("slow math/clamp #12", async () => {
    await maybeSlow(20);
    expect(clamp(12, 0, 100)).toBe(12);
  });
  test("slow math/clamp #13", async () => {
    await maybeSlow(20);
    expect(clamp(13, 0, 100)).toBe(13);
  });
  test("slow math/clamp #14", async () => {
    await maybeSlow(20);
    expect(clamp(14, 0, 100)).toBe(14);
  });
  test("slow math/clamp #15", async () => {
    await maybeSlow(20);
    expect(clamp(15, 0, 100)).toBe(15);
  });
});

"use strict";

const { maybeSlow } = require("../../lib/delay");
const { mul } = require("../../lib/math");

describe("slow math suite 07", () => {
  test("slow math/mul #36", async () => {
    await maybeSlow(20);
    expect(mul(36, 2)).toBe(72);
  });
  test("slow math/mul #37", async () => {
    await maybeSlow(20);
    expect(mul(37, 2)).toBe(74);
  });
  test("slow math/mul #38", async () => {
    await maybeSlow(20);
    expect(mul(38, 2)).toBe(76);
  });
  test("slow math/mul #39", async () => {
    await maybeSlow(20);
    expect(mul(39, 2)).toBe(78);
  });
  test("slow math/mul #40", async () => {
    await maybeSlow(20);
    expect(mul(40, 2)).toBe(80);
  });
});

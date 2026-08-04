"use strict";

const { maybeSlow } = require("../../lib/delay");
const { mul } = require("../../lib/math");

describe("slow math suite 01", () => {
  test("slow math/mul #6", async () => {
    await maybeSlow(20);
    expect(mul(6, 2)).toBe(12);
  });
  test("slow math/mul #7", async () => {
    await maybeSlow(20);
    expect(mul(7, 2)).toBe(14);
  });
  test("slow math/mul #8", async () => {
    await maybeSlow(20);
    expect(mul(8, 2)).toBe(16);
  });
  test("slow math/mul #9", async () => {
    await maybeSlow(20);
    expect(mul(9, 2)).toBe(18);
  });
  test("slow math/mul #10", async () => {
    await maybeSlow(20);
    expect(mul(10, 2)).toBe(20);
  });
});

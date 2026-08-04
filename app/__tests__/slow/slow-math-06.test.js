"use strict";

const { maybeSlow } = require("../../lib/delay");
const { add } = require("../../lib/math");

describe("slow math suite 06", () => {
  test("slow math/add #31", async () => {
    await maybeSlow(20);
    expect(add(31, 1)).toBe(32);
  });
  test("slow math/add #32", async () => {
    await maybeSlow(20);
    expect(add(32, 1)).toBe(33);
  });
  test("slow math/add #33", async () => {
    await maybeSlow(20);
    expect(add(33, 1)).toBe(34);
  });
  test("slow math/add #34", async () => {
    await maybeSlow(20);
    expect(add(34, 1)).toBe(35);
  });
  test("slow math/add #35", async () => {
    await maybeSlow(20);
    expect(add(35, 1)).toBe(36);
  });
});

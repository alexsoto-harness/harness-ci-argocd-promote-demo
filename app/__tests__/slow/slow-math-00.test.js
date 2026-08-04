"use strict";

const { maybeSlow } = require("../../lib/delay");
const { add } = require("../../lib/math");

describe("slow math suite 00", () => {
  test("slow math/add #1", async () => {
    await maybeSlow(20);
    expect(add(1, 1)).toBe(2);
  });
  test("slow math/add #2", async () => {
    await maybeSlow(20);
    expect(add(2, 1)).toBe(3);
  });
  test("slow math/add #3", async () => {
    await maybeSlow(20);
    expect(add(3, 1)).toBe(4);
  });
  test("slow math/add #4", async () => {
    await maybeSlow(20);
    expect(add(4, 1)).toBe(5);
  });
  test("slow math/add #5", async () => {
    await maybeSlow(20);
    expect(add(5, 1)).toBe(6);
  });
});

"use strict";

const { maybeSlow } = require("../../lib/delay");
const { isPositiveInt } = require("../../lib/validate");

describe("slow validate suite 05", () => {
  test("slow validate/isPositiveInt #26", async () => {
    await maybeSlow(20);
    expect(isPositiveInt(26)).toBe(true);
  });
  test("slow validate/isPositiveInt #27", async () => {
    await maybeSlow(20);
    expect(isPositiveInt(27)).toBe(true);
  });
  test("slow validate/isPositiveInt #28", async () => {
    await maybeSlow(20);
    expect(isPositiveInt(28)).toBe(true);
  });
  test("slow validate/isPositiveInt #29", async () => {
    await maybeSlow(20);
    expect(isPositiveInt(29)).toBe(true);
  });
  test("slow validate/isPositiveInt #30", async () => {
    await maybeSlow(20);
    expect(isPositiveInt(30)).toBe(true);
  });
});

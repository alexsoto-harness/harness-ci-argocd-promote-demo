"use strict";

const { maybeSlow } = require("../../lib/delay");
const { isPositiveInt } = require("../../lib/validate");

describe("slow validate suite 11", () => {
  test("slow validate/isPositiveInt #56", async () => {
    await maybeSlow(20);
    expect(isPositiveInt(56)).toBe(true);
  });
  test("slow validate/isPositiveInt #57", async () => {
    await maybeSlow(20);
    expect(isPositiveInt(57)).toBe(true);
  });
  test("slow validate/isPositiveInt #58", async () => {
    await maybeSlow(20);
    expect(isPositiveInt(58)).toBe(true);
  });
  test("slow validate/isPositiveInt #59", async () => {
    await maybeSlow(20);
    expect(isPositiveInt(59)).toBe(true);
  });
  test("slow validate/isPositiveInt #60", async () => {
    await maybeSlow(20);
    expect(isPositiveInt(60)).toBe(true);
  });
});

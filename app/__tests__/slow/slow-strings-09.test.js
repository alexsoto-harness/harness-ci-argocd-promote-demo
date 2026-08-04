"use strict";

const { maybeSlow } = require("../../lib/delay");
const { slugify } = require("../../lib/strings");

describe("slow strings suite 09", () => {
  test("slow strings/slugify #46", async () => {
    await maybeSlow(20);
    expect(slugify('Item 46')).toBe('item-46');
  });
  test("slow strings/slugify #47", async () => {
    await maybeSlow(20);
    expect(slugify('Item 47')).toBe('item-47');
  });
  test("slow strings/slugify #48", async () => {
    await maybeSlow(20);
    expect(slugify('Item 48')).toBe('item-48');
  });
  test("slow strings/slugify #49", async () => {
    await maybeSlow(20);
    expect(slugify('Item 49')).toBe('item-49');
  });
  test("slow strings/slugify #50", async () => {
    await maybeSlow(20);
    expect(slugify('Item 50')).toBe('item-50');
  });
});

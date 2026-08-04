"use strict";

const { maybeSlow } = require("../../lib/delay");
const { slugify } = require("../../lib/strings");

describe("slow strings suite 03", () => {
  test("slow strings/slugify #16", async () => {
    await maybeSlow(20);
    expect(slugify('Item 16')).toBe('item-16');
  });
  test("slow strings/slugify #17", async () => {
    await maybeSlow(20);
    expect(slugify('Item 17')).toBe('item-17');
  });
  test("slow strings/slugify #18", async () => {
    await maybeSlow(20);
    expect(slugify('Item 18')).toBe('item-18');
  });
  test("slow strings/slugify #19", async () => {
    await maybeSlow(20);
    expect(slugify('Item 19')).toBe('item-19');
  });
  test("slow strings/slugify #20", async () => {
    await maybeSlow(20);
    expect(slugify('Item 20')).toBe('item-20');
  });
});

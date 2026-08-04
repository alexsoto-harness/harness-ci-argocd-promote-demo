"use strict";

const {
  capitalize,
  slugify,
  truncate,
  reverse,
  countWords,
  includesIgnoreCase,
} = require("../lib/strings");

describe("strings", () => {
  test("capitalize", () => expect(capitalize("harness")).toBe("Harness"));
  test("capitalize empty", () => expect(capitalize("")).toBe(""));
  test("slugify", () => expect(slugify(" Hello World! ")).toBe("hello-world"));
  test("truncate short", () => expect(truncate("abc", 10)).toBe("abc"));
  test("truncate long", () => expect(truncate("abcdef", 4)).toBe("abc…"));
  test("reverse", () => expect(reverse("demo")).toBe("omed"));
  test("countWords", () => expect(countWords("one two three")).toBe(3));
  test("countWords empty", () => expect(countWords("   ")).toBe(0));
  test("includesIgnoreCase", () => {
    expect(includesIgnoreCase("Harness CI", "ci")).toBe(true);
  });
});

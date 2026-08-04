"use strict";

const { maybeSlow } = require("../../lib/delay");
const { reverse } = require("../../lib/strings");

describe("slow strings suite 10", () => {
  test("slow strings/reverse #51", async () => {
    await maybeSlow(20);
    expect(reverse('51')).toBe('15');
  });
  test("slow strings/reverse #52", async () => {
    await maybeSlow(20);
    expect(reverse('52')).toBe('25');
  });
  test("slow strings/reverse #53", async () => {
    await maybeSlow(20);
    expect(reverse('53')).toBe('35');
  });
  test("slow strings/reverse #54", async () => {
    await maybeSlow(20);
    expect(reverse('54')).toBe('45');
  });
  test("slow strings/reverse #55", async () => {
    await maybeSlow(20);
    expect(reverse('55')).toBe('55');
  });
});

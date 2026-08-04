"use strict";

const { maybeSlow } = require("../../lib/delay");
const { reverse } = require("../../lib/strings");

describe("slow strings suite 04", () => {
  test("slow strings/reverse #21", async () => {
    await maybeSlow(20);
    expect(reverse('21')).toBe('12');
  });
  test("slow strings/reverse #22", async () => {
    await maybeSlow(20);
    expect(reverse('22')).toBe('22');
  });
  test("slow strings/reverse #23", async () => {
    await maybeSlow(20);
    expect(reverse('23')).toBe('32');
  });
  test("slow strings/reverse #24", async () => {
    await maybeSlow(20);
    expect(reverse('24')).toBe('42');
  });
  test("slow strings/reverse #25", async () => {
    await maybeSlow(20);
    expect(reverse('25')).toBe('52');
  });
});

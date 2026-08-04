"use strict";

const {
  add,
  sub,
  mul,
  div,
  clamp,
  sum,
  avg,
  isEven,
  factorial,
} = require("../lib/math");

describe("math", () => {
  test("add", () => expect(add(2, 3)).toBe(5));
  test("sub", () => expect(sub(9, 4)).toBe(5));
  test("mul", () => expect(mul(3, 4)).toBe(12));
  test("div", () => expect(div(10, 2)).toBe(5));
  test("div by zero throws", () => {
    expect(() => div(1, 0)).toThrow("division by zero");
  });
  test("clamp high", () => expect(clamp(20, 0, 10)).toBe(10));
  test("clamp low", () => expect(clamp(-5, 0, 10)).toBe(0));
  test("clamp mid", () => expect(clamp(5, 0, 10)).toBe(5));
  test("sum", () => expect(sum([1, 2, 3])).toBe(6));
  test("avg", () => expect(avg([2, 4, 6])).toBe(4));
  test("avg empty throws", () => {
    expect(() => avg([])).toThrow("avg of empty list");
  });
  test("isEven true", () => expect(isEven(4)).toBe(true));
  test("isEven false", () => expect(isEven(5)).toBe(false));
  test("factorial 0", () => expect(factorial(0)).toBe(1));
  test("factorial 5", () => expect(factorial(5)).toBe(120));
  test("factorial rejects negative", () => {
    expect(() => factorial(-1)).toThrow(/non-negative/);
  });
});

"use strict";

function add(a, b) {
  // TI demo: narrow source change — only math-related tests should be selected.
  return Number(a) + Number(b);
}

function absDiff(a, b) {
  return Math.abs(Number(a) - Number(b));
}

function sub(a, b) {
  return Number(a) - Number(b);
}

function mul(a, b) {
  return Number(a) * Number(b);
}

function div(a, b) {
  const denominator = Number(b);
  if (denominator === 0) {
    throw new Error("division by zero");
  }
  return Number(a) / denominator;
}

function clamp(value, min, max) {
  return Math.min(Math.max(Number(value), Number(min)), Number(max));
}

function sum(values) {
  return values.reduce((acc, n) => acc + Number(n), 0);
}

function avg(values) {
  if (!values.length) {
    throw new Error("avg of empty list");
  }
  return sum(values) / values.length;
}

function isEven(n) {
  return Number(n) % 2 === 0;
}

function factorial(n) {
  const value = Number(n);
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("factorial requires non-negative integer");
  }
  let result = 1;
  for (let i = 2; i <= value; i += 1) {
    result *= i;
  }
  return result;
}

module.exports = { add, absDiff, sub, mul, div, clamp, sum, avg, isEven, factorial };

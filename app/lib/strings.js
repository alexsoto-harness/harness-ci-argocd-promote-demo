"use strict";

function capitalize(value) {
  const text = String(value);
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function truncate(value, max) {
  const text = String(value);
  const limit = Number(max);
  if (text.length <= limit) return text;
  return `${text.slice(0, Math.max(0, limit - 1))}…`;
}

function reverse(value) {
  return String(value).split("").reverse().join("");
}

function countWords(value) {
  const trimmed = String(value).trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function includesIgnoreCase(haystack, needle) {
  return String(haystack).toLowerCase().includes(String(needle).toLowerCase());
}

module.exports = {
  capitalize,
  slugify,
  truncate,
  reverse,
  countWords,
  includesIgnoreCase,
};

"use strict";

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveInt(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
}

function isImageTag(value) {
  return typeof value === "string" && /^[A-Za-z0-9._-]{1,128}$/.test(value);
}

function assertEnvName(envName) {
  if (!["dev", "staging", "prod"].includes(envName)) {
    throw new Error(`invalid env: ${envName}`);
  }
  return envName;
}

// Intentionally lightly tested for coverage demos.
function experimentalFlags(env = process.env) {
  if (env.DEMO_EXPERIMENTAL === "1") {
    return { experimental: true, reason: "demo flag enabled" };
  }
  if (env.DEMO_EXPERIMENTAL === "0") {
    return { experimental: false, reason: "demo flag disabled" };
  }
  return { experimental: false, reason: "unset" };
}

module.exports = {
  isNonEmptyString,
  isPositiveInt,
  isImageTag,
  assertEnvName,
  experimentalFlags,
};

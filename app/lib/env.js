"use strict";

function readEnv(env = process.env) {
  return {
    envName: env.APP_ENV || "unknown",
    imageTag: env.IMAGE_TAG || "unknown",
    hostname: env.HOSTNAME || "local",
    port: Number(env.PORT || 8080),
  };
}

function formatLabel({ envName, imageTag }) {
  return `${envName}@${imageTag}`;
}

function isKnownEnv(envName) {
  return ["dev", "staging", "prod", "unknown"].includes(envName);
}

module.exports = { readEnv, formatLabel, isKnownEnv };

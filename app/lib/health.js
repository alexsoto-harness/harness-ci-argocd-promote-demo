"use strict";

function healthPayload() {
  return { status: "ok" };
}

function isHealthy(payload) {
  return Boolean(payload && payload.status === "ok");
}

module.exports = { healthPayload, isHealthy };

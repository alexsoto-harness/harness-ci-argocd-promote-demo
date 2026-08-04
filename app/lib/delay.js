"use strict";

/**
 * Demo helper: elongates test runtime when DEMO_SLOW_MS > 0.
 * Coverage / local fast runs can set DEMO_SLOW_MS=0.
 */
function demoDelayMs() {
  const raw = process.env.DEMO_SLOW_MS;
  if (raw === undefined || raw === "") return 250;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : 250;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function maybeSlow(multiplier = 1) {
  const ms = Math.round(demoDelayMs() * multiplier);
  if (ms > 0) {
    await sleep(ms);
  }
  return ms;
}

module.exports = { demoDelayMs, sleep, maybeSlow };

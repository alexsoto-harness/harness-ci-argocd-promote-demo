"use strict";

/**
 * Controllable flaky tests for Harness flaky detection demos.
 *
 * Detection needs pass + fail on the SAME commit within 14 days.
 * Re-run Build (or the Test step) twice on one commit with:
 *   FLAKY_TESTS=force_fail
 *   FLAKY_TESTS=force_pass
 *
 * Values: off | force_fail | force_pass | random
 */
function flakyMode() {
  return (process.env.FLAKY_TESTS || "off").toLowerCase();
}

function shouldFail(name) {
  const mode = flakyMode();
  if (mode === "off" || mode === "force_pass") return false;
  if (mode === "force_fail") return true;
  if (mode === "random") {
    const rate = Number(process.env.FLAKY_RATE || "0.5");
    // Deterministic-ish per test name within a process, still varies across runs via Math.random
    return Math.random() < rate;
  }
  return false;
}

describe("flaky demos", () => {
  test("flaky network timeout simulation", () => {
    if (shouldFail("network")) {
      throw new Error("simulated flaky network timeout");
    }
    expect(true).toBe(true);
  });

  test("flaky race condition simulation", () => {
    if (shouldFail("race")) {
      throw new Error("simulated flaky race");
    }
    expect(1 + 1).toBe(2);
  });

  test("flaky shared state simulation", () => {
    if (shouldFail("state")) {
      throw new Error("simulated flaky shared state");
    }
    expect("ok").toBe("ok");
  });

  test("flaky timing assertion simulation", () => {
    if (shouldFail("timing")) {
      throw new Error("simulated flaky timing");
    }
    expect(Date.now()).toBeGreaterThan(0);
  });

  test("flaky external dependency simulation", () => {
    if (shouldFail("external")) {
      throw new Error("simulated flaky external dependency");
    }
    expect(["a", "b"]).toHaveLength(2);
  });
});

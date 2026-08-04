"use strict";

const { escapeHtml, renderPage, pageTitle } = require("../lib/html");

describe("html", () => {
  test("escapeHtml encodes entities", () => {
    expect(escapeHtml(`<a href="x">&</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;",
    );
  });

  test("pageTitle includes env", () => {
    expect(pageTitle("dev")).toBe("Promote Demo — dev");
  });

  test("renderPage includes env tag and host", () => {
    const html = renderPage({
      envName: "dev",
      imageTag: "123",
      hostname: "pod-1",
    });
    expect(html).toContain("dev");
    expect(html).toContain("123");
    expect(html).toContain("pod-1");
    expect(html).toContain("theme-default");
  });

  test("renderPage escapes untrusted values", () => {
    const html = renderPage({
      envName: `<script>`,
      imageTag: `"onload`,
      hostname: `</dd>`,
    });
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&quot;onload");
    expect(html).toContain("&lt;/dd&gt;");
  });
});

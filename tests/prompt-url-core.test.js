/*
 * Dependency-free tests for the URL generator's reusable rules.
 * Run with: node --test tests/prompt-url-core.test.js
 */
"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const core = require("../docs/assets/js/prompt-url-core.js");

test("keeps the observed service URL formats from the prototype", () => {
  assert.equal(core.SERVICE_CONFIG.chatgpt.baseUrl, "https://chatgpt.com/?prompt=");
  assert.equal(core.SERVICE_CONFIG.grok.baseUrl, "https://grok.com/?q=");
  assert.equal(core.createServiceUrl("chatgpt", "hello"), "https://chatgpt.com/?prompt=hello");
  assert.equal(core.createServiceUrl("grok", "hello"), "https://grok.com/?q=hello");
});
test("returns no URL for an empty prompt", () => {
  for (const service of ["chatgpt", "grok"]) {
    const state = core.getServiceState(service, "");
    assert.equal(state.url, "");
    assert.equal(state.length, 0);
    assert.equal(state.hasPrompt, false);
    assert.equal(state.isUsable, false);
  }
});

test("encodes Japanese, line breaks, symbols, and emoji with encodeURIComponent", () => {
  const prompt = "日本語の指示\nline 2 & ? = # / 🙂";
  const expectedEncoding = encodeURIComponent(prompt);

  assert.equal(
    core.createServiceUrl("chatgpt", prompt),
    core.SERVICE_CONFIG.chatgpt.baseUrl + expectedEncoding
  );
  assert.equal(
    core.createServiceUrl("grok", prompt),
    core.SERVICE_CONFIG.grok.baseUrl + expectedEncoding
  );
});

test("measures the complete URL at the 1,999 / 2,000 / 2,001 boundaries", () => {
  for (const service of ["chatgpt", "grok"]) {
    const baseLength = core.SERVICE_CONFIG[service].baseUrl.length;

    for (const [targetLength, expectedUsable] of [
      [1999, true],
      [2000, true],
      [2001, false]
    ]) {
      const prompt = "a".repeat(targetLength - baseLength);
      const state = core.getServiceState(service, prompt);

      assert.equal(state.length, targetLength, `${service} should total ${targetLength}`);
      assert.equal(state.isWithinLimit, expectedUsable);
      assert.equal(state.isUsable, expectedUsable);
      assert.equal(state.remaining, core.MAX_URL_LENGTH - targetLength);
    }
  }
});

test("escapes every special character in link display text", () => {
  const html = core.createHtmlLink(
    "chatgpt",
    "test & verify",
    `<label> & "double" 'single'`
  );

  assert.equal(
    html,
    '<a href="https://chatgpt.com/?prompt=test%20%26%20verify" ' +
      'target="_blank" rel="noopener noreferrer">' +
      '&lt;label&gt; &amp; &quot;double&quot; &#39;single&#39;</a>'
  );
});

test("uses the service name when display text is blank", () => {
  assert.match(core.createHtmlLink("chatgpt", "hello", "   "), />ChatGPT<\/a>$/);
  assert.match(core.createHtmlLink("grok", "hello", ""), />Grok<\/a>$/);
});

test("does not create HTML for an over-limit URL", () => {
  const baseLength = core.SERVICE_CONFIG.chatgpt.baseUrl.length;
  const prompt = "a".repeat(core.MAX_URL_LENGTH + 1 - baseLength);

  assert.equal(core.createHtmlLink("chatgpt", prompt, "ChatGPT"), "");
});

test("rejects unsupported service names", () => {
  assert.throws(() => core.createServiceUrl("unknown", "hello"), /Unsupported service/);
});

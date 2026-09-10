/*
 * Lightweight structural checks for a build-free GitHub Pages site.
 * These checks do not replace a standards validator or visual browser review.
 */
"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const docsRoot = path.join(projectRoot, "docs");

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

const htmlFiles = listFiles(docsRoot).filter((file) => file.endsWith(".html"));

test("contains every required GitHub Pages route", () => {
  for (const relativePath of [
    "index.html",
    "ja/index.html",
    "en/index.html",
    "tools/ai-prompt-url-generator/index.html"
  ]) {
    assert.equal(fs.existsSync(path.join(docsRoot, relativePath)), true, relativePath);
  }
});

test("published HTML has no Markdown fences or project placeholders", () => {
  for (const file of htmlFiles) {
    const source = fs.readFileSync(file, "utf8");
    assert.equal(source.includes("```"), false, `${file} contains a Markdown fence`);
    assert.equal(source.includes("{{"), false, `${file} contains a project placeholder`);
  }
});

test("published HTML uses unique ids and basic document metadata", () => {
  for (const file of htmlFiles) {
    const source = fs.readFileSync(file, "utf8");
    const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);

    assert.match(source, /^<!doctype html>/i, `${file} needs an HTML5 doctype`);
    assert.match(source, /<html\s+lang="[^"]+"/i, `${file} needs a document language`);
    assert.match(source, /name="viewport"/i, `${file} needs a viewport meta tag`);
    assert.equal(new Set(ids).size, ids.length, `${file} contains a duplicate id`);
  }
});

test("tool warns that opening a service URL may submit the prompt", () => {
  const toolHtml = fs.readFileSync(
    path.join(docsRoot, "tools/ai-prompt-url-generator/index.html"),
    "utf8"
  );
  const localizationScript = fs.readFileSync(
    path.join(docsRoot, "assets/js/prompt-url-generator.js"),
    "utf8"
  );

  assert.match(toolHtml, /開くだけで送信が始まる場合があります/);
  assert.match(localizationScript, /submit it as soon as the URL opens/);
});

test("all local href and src references resolve inside docs", () => {
  for (const file of htmlFiles) {
    const source = fs.readFileSync(file, "utf8");
    const references = [...source.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(
      (match) => match[1]
    );

    for (const reference of references) {
      if (/^(?:https?:|mailto:|#|\?)/i.test(reference)) {
        continue;
      }

      const localPart = reference.split(/[?#]/, 1)[0];
      let resolved = path.resolve(path.dirname(file), localPart);

      if (localPart.endsWith("/")) {
        resolved = path.join(resolved, "index.html");
      }

      assert.equal(
        fs.existsSync(resolved),
        true,
        `${path.relative(projectRoot, file)} has a missing reference: ${reference}`
      );
      assert.equal(
        resolved.startsWith(docsRoot),
        true,
        `${path.relative(projectRoot, file)} points outside docs: ${reference}`
      );
    }
  }
});

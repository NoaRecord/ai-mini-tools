# Codex Kickoff — AI Mini Tools

Use this as the initial instruction after opening Codex in the repository root.

---

Read `AGENTS.md` first, then inspect the entire repository tree and `git status`.

The goal of this session is to turn this directory into the initial version of a reusable public repository for small AI-related utilities.

The first prototype is:

`ideas/AI-prompt-URL/ai-prompt-url-generator.html`

Treat that file as a behavioral reference. Do not delete or overwrite it.

## Main goals for this session

1. Review the existing repository structure and the current prototype.
2. Create a simple maintainable repository structure for multiple future mini tools.
3. Prepare a bilingual Japanese/English GitHub Pages catalog.
4. Migrate the AI Prompt URL Generator as the first published tool.
5. Preserve the current intended behavior while fixing obvious source-format problems such as embedded Markdown triple-backtick markers.
6. Keep the initial implementation static and browser-only unless there is a concrete reason not to.
7. Do not introduce Astro, React, a package manager, or a build pipeline merely for future possibilities. If you think one is already justified, explain the concrete benefit before adopting it.
8. Preserve unfinished article links as project placeholders, but do not expose broken placeholder URLs as clickable links on the public page.
9. Distinguish external-service behavior that is officially documented from behavior that is merely observed to work.
10. Do not call the ChatGPT/Grok query-string formats an official API unless official documentation supports that claim.

## Preferred initial layout

Use this as the default unless inspection reveals a strong reason to change it:

```text
AGENTS.md
README.md
README.ja.md
LICENSE or documented license placeholder
project/
ideas/
docs/
  index.html
  ja/index.html
  en/index.html
  assets/
  tools/ai-prompt-url-generator/index.html
```

GitHub Pages should be designed so that `docs/` can be published directly from the main branch.

## First-tool requirements

Preserve and test:

- prompt input;
- URL encoding;
- Japanese text;
- line breaks;
- symbols;
- emoji;
- ChatGPT URL generation;
- Grok URL generation;
- full URL length display;
- 2,000-character conservative project limit;
- HTML `<a>` generation;
- URL copy;
- HTML copy;
- open URL;
- escaping;
- responsive behavior.

Review:

- current service URL formats;
- empty-input button state;
- clipboard behavior on HTTPS;
- special characters in link display text;
- visible privacy explanation;
- Japanese/English UI;
- verification-date display for compatibility-sensitive behavior.

Do not silently change the 2,000-character rule. It is a project safety threshold based on observed testing, not an assertion of a universal official limit.

## Working style

Do not stop for minor reversible choices. Make a reasonable choice and record it.

Before making a difficult-to-reverse choice, publishing externally, adding ongoing cost, choosing license terms, or exposing private information, ask.

If you discover a material defect in the current prototype, report it early, but continue with other independent work where possible.

## Completion checks

Before finishing:

- run appropriate syntax/HTML checks available locally;
- test the first tool in a local browser if possible;
- inspect browser console errors if browser tooling is available;
- run a search for `{{`;
- confirm no secrets are being published;
- inspect `git diff`;
- list changed files;
- list tests run and results;
- list unresolved compatibility assumptions;
- list the exact manual steps still required to create the GitHub repository and enable GitHub Pages.

Do not commit, push, create the GitHub repository, or enable Pages unless I explicitly ask you to do so in this session.

Proceed through the first milestone without asking for confirmation unless a material ambiguity or risky decision is encountered.

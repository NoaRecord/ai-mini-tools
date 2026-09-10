# AI Mini Tools — Project Specification

Status: initial planning
Suggested repository name: `ai-mini-tools`

## 1. Purpose

Create a public repository of small AI-related utilities that are useful to beginners and intermediate users.

The repository should serve three related purposes:

1. provide practical mini tools that can be used immediately;
2. make the source code inspectable on GitHub;
3. act as a practical companion to X Articles and NoaRecord articles.

The tools should remain useful even when a related article is unfinished. Article links may therefore remain explicit placeholders during development.

## 2. Initial scope

The first published tool is based on:

`ideas/AI-prompt-URL/ai-prompt-url-generator.html`

Its current purpose is to:

- accept a prompt;
- URL-encode it;
- generate ChatGPT and Grok URLs;
- show URL lengths;
- apply a conservative 2,000-character completed-URL limit;
- generate an HTML `<a>` link;
- copy URLs or HTML to the clipboard;
- open the generated destination.

The existing file is a prototype/reference, not the final public layout.

## 3. Important factual distinction

The ChatGPT and Grok query-string formats used by this tool should be treated as observed compatibility behavior unless official documentation explicitly guarantees them.

For public copy:

- distinguish "officially documented" from "observed to work";
- include a verification date where useful;
- do not call an undocumented behavior a public API;
- keep the 2,000-character rule described as a conservative project limit based on testing, not as a universal official browser/service limit.

## 4. Recommended repository name

Primary recommendation:

`ai-mini-tools`

Rationale:

- short;
- understandable in Japanese and English;
- broad enough for tools beyond prompt utilities;
- produces a readable GitHub Pages project URL such as:
  `https://<owner>.github.io/ai-mini-tools/`

Branding on the site can be:

- Japanese: `AIミニツール集`
- English: `AI Mini Tools`
- optional brand prefix: `NoaRecord AI Mini Tools`

The repository itself does not need `noarecord-` in the name if it already lives under the NoaRecord GitHub account.

## 5. Local folder naming

If numeric prefixes are useful for the local workspace, keep them locally.

Recommended local path:

`C:\dev\codex-lab\00_tools\0000_ai-mini-tools`

Recommended GitHub repository:

`ai-mini-tools`

The local directory and remote repository are allowed to have different names.

## 6. Initial architecture: keep it static

For the first release, do not introduce Astro unless there is a concrete maintenance need.

Suggested structure:

```text
ai-mini-tools/
├─ AGENTS.md
├─ README.md
├─ README.ja.md
├─ LICENSE
├─ project/
│  ├─ PROJECT_SPEC.md
│  ├─ RELEASE_CHECKLIST.md
│  └─ CONTENT_LINKS.md
├─ ideas/
│  └─ AI-prompt-URL/
│     └─ ai-prompt-url-generator.html
└─ docs/
   ├─ index.html
   ├─ ja/
   │  └─ index.html
   ├─ en/
   │  └─ index.html
   ├─ assets/
   │  ├─ css/
   │  └─ js/
   └─ tools/
      └─ ai-prompt-url-generator/
         └─ index.html
```

GitHub Pages can initially publish from the `docs/` directory on the main branch.

This avoids a build system for the first tool.

Reconsider Astro when one or more of the following becomes true:

- shared components are being duplicated;
- the number of tools makes manual catalog maintenance tedious;
- localization becomes cumbersome;
- metadata needs to generate pages automatically;
- a build step would clearly reduce maintenance rather than add it.

## 7. Bilingual policy

### Catalog

Provide:

- `/ja/` — Japanese catalog;
- `/en/` — English catalog;
- `/` — a small language selector or a stable landing page.

### Individual tools

For the first tool, prefer one implementation with localized strings rather than two independently maintained copies of the application logic.

A visible language switch should be available.

Possible approaches, in order of initial simplicity:

1. one page with a `lang` query parameter and shared application logic;
2. one page with stored language preference and visible switch;
3. separate localized routes generated from shared data if/when a build system is introduced.

Do not maintain two divergent copies of core JavaScript solely for translation.

## 8. Relationship with articles

Related articles are expected but may be incomplete.

Use placeholders rather than blocking the tool release:

```text
{{ARTICLE_URL_JA}}
{{ARTICLE_URL_EN}}
```

Suggested public navigation for each mature tool:

- Use the tool
- View source
- Read the explanation

Japanese equivalents:

- ツールを使う
- ソースを見る
- 解説を読む

If an article is not ready, hide the public link or display it as "準備中 / Coming later" rather than publishing a broken URL.

## 9. First-tool migration requirements

During migration from the prototype:

### Preserve

- prompt input;
- URL generation;
- Japanese, line-break, symbol, and emoji encoding;
- URL length display;
- 2,000-character project safety limit;
- HTML-link generation;
- URL copy;
- HTML copy;
- open-in-new-tab action;
- clipboard fallback if still useful;
- output escaping;
- responsive layout.

### Fix or review

- remove embedded Markdown triple-backtick code fences;
- check HTML validity;
- check button enabled/disabled state for an empty prompt;
- test special characters in link text;
- test clipboard behavior on GitHub Pages HTTPS;
- test fallback behavior where possible;
- verify current ChatGPT and Grok destination behavior;
- add a concise privacy note if all prompt processing remains local in the browser;
- add a verification date for service-dependent behavior;
- add Japanese/English UI.

### Do not silently change

- service URL formats;
- the 2,000-character policy;
- copy semantics;
- escaping behavior.

Any such change should be documented.

## 10. Privacy and security

The preferred first tool should remain browser-only.

If the implementation sends no prompt text to the repository owner's server, the page may say so in clear language.

However, opening the generated ChatGPT or Grok URL necessarily sends the prompt as part of that destination URL to the destination service and can expose it through normal URL handling.

Therefore public copy should not claim that prompt data "never leaves the browser" without qualification.

Recommended wording concept:

> URL generation is performed in your browser. The prompt is sent to the selected external service only when you open or otherwise use the generated URL.

Do not store prompts, analytics payloads containing prompts, or clipboard contents.

## 11. Documentation

Initial repository documentation:

- `README.md` — English-first repository overview;
- `README.ja.md` — Japanese version;
- `project/PROJECT_SPEC.md` — this file;
- `project/RELEASE_CHECKLIST.md` — public-release checks;
- `project/CONTENT_LINKS.md` — article and public URL placeholders.

Suggested `CONTENT_LINKS.md`:

```md
# Content links

- Repository: {{REPOSITORY_URL}}
- GitHub Pages: {{PAGES_URL}}

## AI Prompt URL Generator

- Tool: {{PROMPT_URL_GENERATOR_URL}}
- Japanese article: {{ARTICLE_URL_JA}}
- English article: {{ARTICLE_URL_EN}}
- Last compatibility verification: {{VERIFIED_DATE}}
```

## 12. License

Recommended default if broad reuse is intended: MIT License.

Do not add a license merely by assumption if the user has not decided the terms.

If undecided, leave:

`{{LICENSE_DECISION}}`

as a project-level blocker and do not publish a claim that the code is open source.

## 13. Initial milestone

Milestone 1 is complete when:

- repository structure exists;
- the prototype remains preserved under `ideas/`;
- the first tool has a clean published version under `docs/tools/`;
- Japanese and English catalog pages exist;
- the tool has Japanese/English UI;
- README files exist;
- local checks pass;
- no secret is present;
- no unintended placeholder is visible on the public site;
- Git diff has been reviewed.

Creating the remote repository and enabling GitHub Pages are separate publication steps and should only be performed when explicitly requested.

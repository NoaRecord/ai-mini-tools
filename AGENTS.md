# AGENTS.md

## Purpose

This repository collects small, practical AI-related utilities and publishes them on GitHub and GitHub Pages.

Primary goals:

- keep each mini tool small, understandable, and independently maintainable;
- publish a bilingual Japanese/English catalog on GitHub Pages;
- preserve working examples and experiments under `ideas/`;
- make it easy to add future tools without redesigning the repository;
- support related X Articles / NoaRecord articles without blocking development when those articles are unfinished.

## Instruction priority

When instructions conflict, follow this order:

1. the user's explicit instruction for the current task;
2. this `AGENTS.md`;
3. project documentation in `project/`;
4. existing implementation and established repository conventions;
5. the agent's own implementation judgment.

If a choice is reversible and does not materially affect the project, make a reasonable choice and report it instead of stopping for confirmation.

Ask the user before making decisions that are difficult to reverse, materially change scope, create ongoing cost, affect licensing, publish externally, or may expose private information.

## Basic policy

- Before editing, inspect `git status`, the relevant files, and the surrounding structure.
- Do not make unrelated changes.
- Files that are reasonably necessary to complete the requested task may be created or modified even when not named individually.
- For existing working files, prefer minimal, reviewable changes over unnecessary rewrites.
- Do not silently remove existing behavior, comments, logging, tests, compatibility workarounds, or debugging code.
- When a larger refactor is genuinely simpler or safer, explain why and preserve externally visible behavior unless a change was requested.
- After changes, inspect the diff and run the checks that are practical in the current environment.
- Report checks that could not be run.
- Do not use destructive Git operations such as force-push, destructive reset, or deleting branches unless the user explicitly asks.
- Do not commit, push, publish, create a remote repository, or change GitHub Pages settings unless the current task explicitly includes that action.
- Never commit secrets.

## Secrets and sensitive data

- Do not display, copy, commit, or modify secrets such as API keys, access tokens, private keys, credentials, production database connection strings, or private `.env` values.
- `.env.example` and other clearly non-secret templates may be read and maintained.
- If a secret appears in a file that is about to be committed or published, stop that publication step and report the problem.

## Use of subagents and models

- Use subagents only when parallel work or task isolation is likely to improve speed, quality, or context efficiency.
- Do not create parallel work merely to satisfy a quota.
- Do not hard-code a particular model name, product tier, polling interval, or subagent implementation in repository policy.
- The main agent remains responsible for integrating results and checking the final diff.
- Prefer task decomposition by responsibility: research, implementation, tests, documentation, or review.

## Project-specific rules

### Mini tools

- Prefer browser-only HTML/CSS/JavaScript when a tool does not need a server.
- Avoid external dependencies unless they provide a clear benefit.
- A tool that performs external network requests must document what is sent, where it is sent, and why.
- Preserve a usable mobile layout.
- Keep each published tool in its own directory.
- Experimental or unfinished material belongs under `ideas/` until promoted.

### Bilingual site

- The GitHub Pages catalog must support Japanese and English.
- Japanese and English versions should describe the same functionality, while allowing natural wording in each language.
- Do not duplicate core application logic merely to translate UI text when a shared implementation is practical.
- A visible language switch must remain available.
- New user-facing catalog text should normally be added in both languages in the same change.

### External-service compatibility

Some tools depend on behavior of external services such as ChatGPT, Grok, Gemini, or GitHub.

- Treat undocumented URL formats and observed behavior as compatibility assumptions, not guaranteed APIs.
- Record the date of the most recent verification where practical.
- Distinguish official documentation, observed behavior, and inference.
- Do not silently rewrite an observed workaround into a claim of official support.

### Placeholders

Unfinished related articles and external URLs may be represented with explicit placeholders such as:

- `{{ARTICLE_URL_JA}}`
- `{{ARTICLE_URL_EN}}`
- `{{REPOSITORY_URL}}`
- `{{PAGES_URL}}`
- `{{VERIFIED_DATE}}`

Placeholders are allowed during development.

Before a public release, search for `{{...}}`. Any remaining placeholder must either be intentionally allow-listed or reported as a release blocker.

### Current first sample

The initial prototype is currently under:

`ideas/AI-prompt-URL/ai-prompt-url-generator.html`

Treat it as a behavioral reference during migration. Preserve its intended features unless a change is requested.

Known migration item: remove Markdown code-fence markers that were accidentally embedded in the HTML source.

## Preferred workflow

1. Run `git status`.
2. Read `AGENTS.md`, relevant project documentation, and the files in scope.
3. State the intended change briefly.
4. Make the smallest coherent set of changes needed for the task.
5. Run appropriate syntax checks, tests, and/or local browser checks where available.
6. Inspect `git diff` or an equivalent diff.
7. Search for accidental secrets and unintended placeholders before publication-related work.
8. Report:
   - files changed;
   - behavior changed;
   - checks run and their results;
   - unresolved items;
   - recommended next step.

## Coding style

- Follow existing formatting and naming conventions.
- For educational or example code, retain comments that explain non-obvious behavior.
- Comment risky, compatibility-sensitive, or non-obvious workarounds.
- Prefer clear code over abstraction that is unnecessary for a small utility.

## GitHub and GitHub Pages

- The public repository is intended to contain multiple AI-related mini tools.
- The repository name and the local directory name do not have to be identical, but avoid needless mismatch.
- For the initial release, prefer the simplest GitHub Pages publishing arrangement that satisfies the requirements.
- If static files are sufficient, publishing from `/docs` on the main branch is preferred over introducing a build pipeline.
- Introduce Astro or another build system only when the catalog, shared components, localization, or maintenance burden justifies it.
- Public-facing repository documentation should include:
  - purpose;
  - tool list;
  - usage;
  - privacy/security notes where relevant;
  - license;
  - contribution/development notes if useful.
- The user must approve any change to this `AGENTS.md`. Suggestions are welcome, but do not silently modify the policy file.

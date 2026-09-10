# Release Checklist — AI Mini Tools

Use this before publishing or updating GitHub Pages.

## Repository

- [ ] `git status` reviewed.
- [ ] `git diff` reviewed.
- [ ] No accidental generated files or local-only files are staged.
- [ ] No secret, token, key, credential, private `.env`, or personal data is included.
- [ ] License decision is explicit.

## Placeholders

Search the repository for:

```text
{{
```

- [ ] No unintended placeholder is visible on the public site.
- [ ] Intentional project-only placeholders are documented.
- [ ] Article links that are not ready are hidden or shown as non-clickable "Coming later / 準備中".

## GitHub Pages

- [ ] `docs/index.html` exists.
- [ ] Japanese catalog works.
- [ ] English catalog works.
- [ ] Language switch works.
- [ ] All internal paths work with the GitHub Pages project base path.
- [ ] No absolute path accidentally assumes `/` is the repository root on the domain.
- [ ] 404-prone links checked.
- [ ] Mobile layout checked.

## AI Prompt URL Generator

- [ ] No Markdown triple-backtick markers remain in published HTML.
- [ ] Empty prompt state behaves correctly.
- [ ] Japanese prompt tested.
- [ ] English prompt tested.
- [ ] Line breaks tested.
- [ ] Symbols tested.
- [ ] Emoji tested.
- [ ] Link text containing `<`, `>`, `&`, `"`, and `'` tested.
- [ ] ChatGPT URL length display checked.
- [ ] Grok URL length display checked.
- [ ] 1,999 / 2,000 / 2,001 boundary behavior checked where practical.
- [ ] Copy URL tested.
- [ ] Copy HTML tested.
- [ ] Open URL tested.
- [ ] Browser console checked for errors.
- [ ] Clipboard fallback reviewed.
- [ ] Current ChatGPT destination behavior verified.
- [ ] Current Grok destination behavior verified.
- [ ] Verification date updated.

## Privacy wording

- [ ] Page does not claim more privacy than the implementation provides.
- [ ] If URL generation is local, this is stated accurately.
- [ ] It is clear that opening/using a generated URL sends the prompt to the selected external service.
- [ ] No prompt contents are sent to analytics.

## Documentation

- [ ] README describes what the repository is.
- [ ] Japanese README is available.
- [ ] First tool is listed.
- [ ] Source link works.
- [ ] Tool link works.
- [ ] Article link is correct or intentionally absent.
- [ ] Compatibility assumptions are documented.

## Final report

- [ ] Changed files listed.
- [ ] Tests/checks listed with results.
- [ ] Unverified items listed.
- [ ] Publication steps, if still manual, listed.

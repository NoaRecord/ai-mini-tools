# External-service compatibility

Last reviewed: 2026-09-10

## Scope

The AI Prompt URL Generator currently preserves these prototype formats:

```text
https://chatgpt.com/?prompt=<encoded prompt>
https://grok.com/?q=<encoded prompt>
```

## Evidence classification

- Official OpenAI documentation identifies `chatgpt.com` as the ChatGPT web application: <https://learn.chatgpt.com/docs/web>
- Official xAI documentation identifies `grok.com` as the preferred Grok web application: <https://docs.x.ai/grok/faq>
- Neither source reviewed above documents the prompt-prefill query parameter used by this project.
- The `prompt` and `q` parameter behavior is therefore an observed compatibility assumption, not an official public API guarantee.
- The 2,000-character completed-URL limit is a conservative project threshold based on prior testing. It is not presented as a browser-wide or service-wide official limit.

## Verification record

The date records when the public entry points, generated navigation, and visible prompt-handling behavior were checked. A successful observation does not guarantee future compatibility or the same behavior across login states.

The September 2026 article draft records these author observations:

- ChatGPT previously accepted `q=` in the author's environment, then appeared to convert it to `prompt=`; this project keeps `prompt=`.
- Some in-app browsers, including X's internal browser in the author's environment, were unreliable; a standard Chrome or Chromium-based browser is the suggested fallback.
- At least one tested path differed between 1,999 and 2,001 completed-URL characters; automated checks therefore cover 1,999 / 2,000 / 2,001.

These are user-supplied observations, not official guarantees.

Standard Chrome check on 2026-09-10:

- `chatgpt.com/?prompt=` placed the test text in ChatGPT's composer without sending it.
- `grok.com/?q=` showed the test text and then a confirmation popup. A conversation and response appeared only after the user chose an option in that popup; automatic submission was not verified. Because service behavior can vary or change, continue treating URL opening as potentially capable of submission.
- Embedded-browser behavior remains environment-dependent; the release check above used standard Chrome.

Before each release, repeat the browser checks in `RELEASE_CHECKLIST.md` and update this file and the tool page together.

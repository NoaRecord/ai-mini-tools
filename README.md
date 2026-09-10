# AI Mini Tools

[日本語](README.ja.md)

A small collection of static, browser-based utilities for AI services, published with GitHub Pages.

[Open AI Mini Tools](https://noarecord.github.io/ai-mini-tools/)

## Tool

- **AI Prompt URL Generator** — builds ChatGPT / Grok URLs and escaped HTML links.
- [Published-page source](docs/tools/ai-prompt-url-generator/index.html)
- [Preserved prototype](ideas/AI-prompt-URL/ai-prompt-url-generator.html)

## Preview and test

```powershell
python -m http.server 8000 --directory docs
node --test tests/*.test.js
```

Open `http://127.0.0.1:8000/` after starting the server.

## Structure

```text
docs/       GitHub Pages site and published tools
ideas/      Preserved prototypes
project/    Specifications and release checks
tests/      Dependency-free checks
```

The site is designed for direct publication from `/docs` on the main branch, without a framework or build pipeline. Changes to `docs/` are published automatically after they are pushed to `main`. External-service query formats are treated as observed compatibility behavior, not official APIs.

## External services

The catalog includes links to Ko-fi and an OFUSE support widget. Catalog pages load `https://ofuse.me/assets/platform/widget.js` to render that widget, so the browser makes a normal request to OFUSE when those pages open. The prompt-entry tool page does not load this third-party script.

## License

Licensed under the [MIT License](LICENSE).

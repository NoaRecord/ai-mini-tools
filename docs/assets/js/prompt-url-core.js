/*
 * AI Prompt URL Generator: reusable, DOM-independent logic.
 *
 * The small UMD-style wrapper keeps the same source usable by a plain browser
 * script and by Node's built-in test runner without adding a package system.
 */
(function initializePromptUrlCore(globalScope) {
  "use strict";

  const MAX_URL_LENGTH = 2000;

  // These query formats are observed compatibility behavior, not official APIs.
  const SERVICE_CONFIG = Object.freeze({
    chatgpt: Object.freeze({
      baseUrl: "https://chatgpt.com/?prompt=",
      defaultLinkText: "ChatGPT"
    }),
    grok: Object.freeze({
      baseUrl: "https://grok.com/?q=",
      defaultLinkText: "Grok"
    })
  });

  function getServiceConfig(service) {
    const config = SERVICE_CONFIG[service];

    if (!config) {
      throw new TypeError(`Unsupported service: ${service}`);
    }

    return config;
  }

  function createServiceUrl(service, prompt) {
    const normalizedPrompt = String(prompt ?? "");

    if (normalizedPrompt.length === 0) {
      return "";
    }

    return getServiceConfig(service).baseUrl + encodeURIComponent(normalizedPrompt);
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function createHtmlLink(service, prompt, linkText) {
    const config = getServiceConfig(service);
    const url = createServiceUrl(service, prompt);

    if (!url || url.length > MAX_URL_LENGTH) {
      return "";
    }

    const normalizedText = String(linkText ?? "").trim() || config.defaultLinkText;

    return (
      `<a href="${escapeAttribute(url)}" ` +
      `target="_blank" rel="noopener noreferrer">` +
      `${escapeHtml(normalizedText)}</a>`
    );
  }

  function getServiceState(service, prompt) {
    const url = createServiceUrl(service, prompt);
    const length = url.length;
    const hasPrompt = length > 0;
    const isWithinLimit = length <= MAX_URL_LENGTH;

    return Object.freeze({
      service,
      url,
      length,
      remaining: MAX_URL_LENGTH - length,
      hasPrompt,
      isWithinLimit,
      isUsable: hasPrompt && isWithinLimit
    });
  }

  const api = Object.freeze({
    MAX_URL_LENGTH,
    SERVICE_CONFIG,
    createServiceUrl,
    createHtmlLink,
    escapeHtml,
    escapeAttribute,
    getServiceState
  });

  globalScope.PromptUrlCore = api;

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis === "object" ? globalThis : window);

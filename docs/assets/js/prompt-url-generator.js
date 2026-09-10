/*
 * AI Prompt URL Generator: browser UI and localization.
 *
 * Core URL and escaping rules live in prompt-url-core.js so they can be tested
 * without a browser. This file is limited to DOM, clipboard, and window actions.
 */
(function initializePromptUrlGenerator() {
  "use strict";

  const core = window.PromptUrlCore;

  if (!core) {
    throw new Error("PromptUrlCore must load before the application script.");
  }

  const SERVICES = Object.freeze(["chatgpt", "grok"]);
  const copyStatusTimers = new Map();

  const messages = Object.freeze({
    ja: Object.freeze({
      documentTitle: "AI Prompt URL Generator | AIミニツール集",
      metaDescription: "プロンプト入りのChatGPT / Grok URLとHTMLリンクをブラウザ内で生成します。",
      skipLink: "ツール本体へ移動",
      languageLabel: "言語",
      catalogLink: "← ツール一覧へ戻る",
      eyebrow: "Prompt utility 01",
      title: "AI Prompt URL Generator",
      description: "プロンプトをURLエンコードし、ChatGPT / Grok用のURLとHTMLリンクを生成します。入力内容は、生成URLを開くまで外部サービスへ送信しません。",
      compatibilityTitle: "互換性について",
      compatibilityText: "公式資料で確認できるのはWebアプリのドメインです。ここで使う ?prompt= / ?q= は2026年9月の実機観測に基づく互換形式で、公開APIではありません。内部ブラウザで開けない場合は、通常のChrome / Chromium系ブラウザを試してください。",
      openAiReference: "OpenAI公式: ChatGPT Web",
      xaiReference: "xAI公式: Grok Web",
      verificationLabel: "最終互換確認: 2026-09-10",
      promptSection: "プロンプト",
      promptLabel: "共有するプロンプト",
      promptHint: "入力すると、2サービス分のURLとHTMLを同時に更新します。",
      promptPlaceholder: "ここにプロンプトを入力してください。\n\n日本語、改行、記号、絵文字も使用できます。",
      inputLength: "入力文字数",
      chatgptLength: "ChatGPT URL",
      grokLength: "Grok URL",
      projectLimit: "自主上限",
      privacyTitle: "プライバシー",
      privacyText: "生成・文字数判定・コピー処理はこのページ内で行い、アクセス解析はありません。生成URLを開く、または共有すると、URL内のプロンプトが外部サービスや共有先に渡ります。サービスによっては、開くだけで送信が始まる場合があります。秘密情報、個人情報、APIキーは入力しないでください。",
      resultsHeading: "生成結果",
      observedFormat: "観測上の形式",
      linkTextLabel: "リンク表示文字列",
      generatedUrlLabel: "生成されたURL",
      emptyUrl: "プロンプトを入力してください。",
      emptyHtml: "<a>タグを生成します。",
      urlTooLong: "URLが長すぎるため、このURLは使用できません。",
      htmlTooLong: "URLが長すぎるため、HTMLリンクを生成できません。",
      urlLengthEmpty: "URL長: 0 / {limit}",
      urlLengthWithin: "URL長: {length} / {limit}（残り {remaining} 文字）",
      urlLengthOver: "URL長: {length} / {limit}（{over} 文字超過）",
      copyUrl: "URLをコピー",
      copyHtml: "<a>タグをコピー",
      openService: "{service}を開く",
      htmlPreviewLabel: "コピーされるHTML",
      copyUrlSuccess: "URLをコピーしました。",
      copyHtmlSuccess: "<a>タグ付きHTMLをコピーしました。",
      copyFailure: "コピーに失敗しました。ブラウザのクリップボード権限を確認してください。",
      overallErrorLead: "プロンプトが長すぎます。",
      overallErrorItem: "{service}: {length} 文字（上限 {limit} 文字）",
      overallErrorHelp: "プロンプトを短くし、完成した各URLを2,000文字以内にしてください。",
      limitNote: "2,000文字は、1,999 / 2,001文字で差が出た実測をもとにした安全側の自主基準です。ChatGPT、Grok、ブラウザの公式な共通上限ではありません。",
      noScript: "このツールを使用するにはJavaScriptを有効にしてください。"
    }),
    en: Object.freeze({
      documentTitle: "AI Prompt URL Generator | AI Mini Tools",
      metaDescription: "Generate prompt-filled ChatGPT and Grok URLs and HTML links locally in your browser.",
      skipLink: "Skip to the generator",
      languageLabel: "Language",
      catalogLink: "← Back to the tool catalog",
      eyebrow: "Prompt utility 01",
      title: "AI Prompt URL Generator",
      description: "URL-encode a prompt and build ChatGPT and Grok URLs plus HTML links. Nothing is sent to an external service until you open a generated URL.",
      compatibilityTitle: "Compatibility",
      compatibilityText: "Official sources identify the web-app domains. The ?prompt= / ?q= formats used here are compatibility behavior observed in September 2026, not public APIs. If an in-app browser fails, try a regular Chrome or Chromium-based browser.",
      openAiReference: "Official OpenAI: ChatGPT Web",
      xaiReference: "Official xAI: Grok Web",
      verificationLabel: "Last compatibility check: 2026-09-10",
      promptSection: "Prompt",
      promptLabel: "Prompt to share",
      promptHint: "Typing updates the URLs and HTML for both services at once.",
      promptPlaceholder: "Enter a prompt here.\n\nJapanese text, line breaks, symbols, and emoji are supported.",
      inputLength: "Input length",
      chatgptLength: "ChatGPT URL",
      grokLength: "Grok URL",
      projectLimit: "Project limit",
      privacyTitle: "Privacy",
      privacyText: "Generation, length checks, and copying happen on this page, with no analytics. Opening or sharing a generated URL exposes the prompt in that URL to the external service or recipient. Some services may submit it as soon as the URL opens. Do not enter secrets, personal data, or API keys.",
      resultsHeading: "Generated results",
      observedFormat: "Observed format",
      linkTextLabel: "Link display text",
      generatedUrlLabel: "Generated URL",
      emptyUrl: "Enter a prompt to generate a URL.",
      emptyHtml: "An <a> tag will appear here.",
      urlTooLong: "This URL cannot be used because it is too long.",
      htmlTooLong: "The HTML link cannot be generated because the URL is too long.",
      urlLengthEmpty: "URL length: 0 / {limit}",
      urlLengthWithin: "URL length: {length} / {limit} ({remaining} remaining)",
      urlLengthOver: "URL length: {length} / {limit} ({over} over)",
      copyUrl: "Copy URL",
      copyHtml: "Copy <a> tag",
      openService: "Open {service}",
      htmlPreviewLabel: "HTML to be copied",
      copyUrlSuccess: "URL copied.",
      copyHtmlSuccess: "HTML link copied.",
      copyFailure: "Copy failed. Check this browser's clipboard permission.",
      overallErrorLead: "The prompt is too long.",
      overallErrorItem: "{service}: {length} characters (limit {limit})",
      overallErrorHelp: "Shorten the prompt so each completed URL is 2,000 characters or fewer.",
      limitNote: "The 2,000-character threshold is a conservative project rule based on an observed difference between 1,999 and 2,001 characters. It is not a shared official limit from ChatGPT, Grok, or browsers.",
      noScript: "Enable JavaScript to use this tool."
    })
  });

  function chooseLanguage() {
    const requested = new URLSearchParams(window.location.search).get("lang");

    if (requested === "ja" || requested === "en") {
      return requested;
    }

    return navigator.language.toLowerCase().startsWith("ja") ? "ja" : "en";
  }

  let language = chooseLanguage();
  let numberFormatter = new Intl.NumberFormat(language === "ja" ? "ja-JP" : "en-US");

  const elements = {
    metaDescription: document.querySelector('meta[name="description"]'),
    brandLink: document.getElementById("brand-link"),
    catalogLink: document.getElementById("catalog-link"),
    prompt: document.getElementById("prompt"),
    promptLength: document.getElementById("prompt-length"),
    chatgptLength: document.getElementById("chatgpt-length"),
    grokLength: document.getElementById("grok-length"),
    overallError: document.getElementById("overall-error")
  };

  const serviceElements = Object.fromEntries(
    SERVICES.map((service) => [
      service,
      {
        linkText: document.getElementById(`${service}-link-text`),
        url: document.getElementById(`${service}-url`),
        urlInfo: document.getElementById(`${service}-url-info`),
        html: document.getElementById(`${service}-html`),
        copyUrl: document.getElementById(`copy-${service}-url`),
        copyHtml: document.getElementById(`copy-${service}-html`),
        open: document.getElementById(`open-${service}`),
        status: document.getElementById(`${service}-status`)
      }
    ])
  );

  function translate(key, replacements = {}) {
    const template = messages[language][key];

    if (typeof template !== "string") {
      throw new Error(`Missing translation: ${language}.${key}`);
    }

    return Object.entries(replacements).reduce(
      (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
      template
    );
  }

  function formatNumber(value) {
    return numberFormatter.format(value);
  }

  function applyTranslations() {
    document.documentElement.lang = language;
    document.title = translate("documentTitle");
    elements.metaDescription.setAttribute("content", translate("metaDescription"));
    elements.brandLink.href = language === "ja" ? "../../ja/" : "../../en/";
    elements.catalogLink.href = language === "ja" ? "../../ja/" : "../../en/";

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = translate(element.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      element.setAttribute("placeholder", translate(element.dataset.i18nPlaceholder));
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel));
    });

    document.querySelectorAll("[data-language-link]").forEach((link) => {
      if (link.dataset.languageLink === language) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    SERVICES.forEach((service) => {
      const serviceName = core.SERVICE_CONFIG[service].defaultLinkText;
      serviceElements[service].open.textContent = translate("openService", {
        service: serviceName
      });
    });
  }

  function updateService(service, state) {
    const controls = serviceElements[service];

    controls.url.classList.toggle("too-long", state.hasPrompt && !state.isWithinLimit);
    controls.html.classList.toggle("too-long", state.hasPrompt && !state.isWithinLimit);

    if (!state.hasPrompt) {
      controls.url.textContent = translate("emptyUrl");
      controls.urlInfo.textContent = translate("urlLengthEmpty", {
        limit: formatNumber(core.MAX_URL_LENGTH)
      });
      controls.html.textContent = translate("emptyHtml");
      controls.urlInfo.classList.remove("warning");
    } else if (state.isWithinLimit) {
      controls.url.textContent = state.url;
      controls.urlInfo.textContent = translate("urlLengthWithin", {
        length: formatNumber(state.length),
        limit: formatNumber(core.MAX_URL_LENGTH),
        remaining: formatNumber(state.remaining)
      });
      controls.html.textContent = core.createHtmlLink(
        service,
        elements.prompt.value,
        controls.linkText.value
      );
      controls.urlInfo.classList.remove("warning");
    } else {
      controls.url.textContent = translate("urlTooLong");
      controls.urlInfo.textContent = translate("urlLengthOver", {
        length: formatNumber(state.length),
        limit: formatNumber(core.MAX_URL_LENGTH),
        over: formatNumber(Math.abs(state.remaining))
      });
      controls.html.textContent = translate("htmlTooLong");
      controls.urlInfo.classList.add("warning");
    }

    controls.copyUrl.disabled = !state.isUsable;
    controls.copyHtml.disabled = !state.isUsable;
    controls.open.disabled = !state.isUsable;
  }

  function updateOverallError(states) {
    const overLimit = states.filter((state) => state.hasPrompt && !state.isWithinLimit);

    if (overLimit.length === 0) {
      elements.overallError.hidden = true;
      elements.overallError.textContent = "";
      return;
    }

    const detailLines = overLimit.map((state) =>
      translate("overallErrorItem", {
        service: core.SERVICE_CONFIG[state.service].defaultLinkText,
        length: formatNumber(state.length),
        limit: formatNumber(core.MAX_URL_LENGTH)
      })
    );

    elements.overallError.textContent = [
      translate("overallErrorLead"),
      ...detailLines,
      translate("overallErrorHelp")
    ].join("\n");
    elements.overallError.hidden = false;
  }

  function updateAll() {
    const prompt = elements.prompt.value;
    const states = SERVICES.map((service) => core.getServiceState(service, prompt));

    elements.promptLength.textContent = formatNumber(prompt.length);
    elements.chatgptLength.textContent = formatNumber(states[0].length);
    elements.grokLength.textContent = formatNumber(states[1].length);

    states.forEach((state) => updateService(state.service, state));
    updateOverallError(states);
  }

  function fallbackCopy(text) {
    // document.execCommand is deprecated but remains useful as a compatibility
    // fallback when the modern Clipboard API is unavailable or denied.
    const temporaryTextarea = document.createElement("textarea");
    const previouslyFocused = document.activeElement;

    temporaryTextarea.value = text;
    temporaryTextarea.setAttribute("readonly", "");
    temporaryTextarea.style.position = "fixed";
    temporaryTextarea.style.inset = "0 auto auto -9999px";
    temporaryTextarea.style.opacity = "0";
    document.body.appendChild(temporaryTextarea);
    temporaryTextarea.focus();
    temporaryTextarea.select();

    let success = false;

    try {
      success = document.execCommand("copy");
    } finally {
      temporaryTextarea.remove();

      if (previouslyFocused instanceof HTMLElement) {
        try {
          previouslyFocused.focus({ preventScroll: true });
        } catch (focusError) {
          previouslyFocused.focus();
        }
      }
    }

    if (!success) {
      throw new Error("Fallback clipboard copy failed.");
    }
  }

  async function copyPlainText(text) {
    if (window.isSecureContext && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (clipboardError) {
        // A denied modern API can still succeed through the user-gesture fallback.
      }
    }

    fallbackCopy(text);
  }

  async function copyHtml(text) {
    if (
      window.isSecureContext &&
      navigator.clipboard?.write &&
      window.ClipboardItem
    ) {
      try {
        const item = new ClipboardItem({
          "text/html": new Blob([text], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" })
        });

        await navigator.clipboard.write([item]);
        return;
      } catch (clipboardError) {
        // Fall back to a plain-text representation of the complete <a> element.
      }
    }

    fallbackCopy(text);
  }

  function showStatus(service, message) {
    const status = serviceElements[service].status;
    const previousTimer = copyStatusTimers.get(service);

    if (previousTimer) {
      window.clearTimeout(previousTimer);
    }

    status.textContent = message;
    copyStatusTimers.set(
      service,
      window.setTimeout(() => {
        status.textContent = "";
        copyStatusTimers.delete(service);
      }, 2500)
    );
  }

  async function handleCopyUrl(service) {
    const state = core.getServiceState(service, elements.prompt.value);

    if (!state.isUsable) {
      return;
    }

    try {
      await copyPlainText(state.url);
      showStatus(service, translate("copyUrlSuccess"));
    } catch (error) {
      showStatus(service, translate("copyFailure"));
    }
  }

  async function handleCopyHtml(service) {
    const controls = serviceElements[service];
    const html = core.createHtmlLink(
      service,
      elements.prompt.value,
      controls.linkText.value
    );

    if (!html) {
      return;
    }

    try {
      await copyHtml(html);
      showStatus(service, translate("copyHtmlSuccess"));
    } catch (error) {
      showStatus(service, translate("copyFailure"));
    }
  }

  function handleOpen(service) {
    const state = core.getServiceState(service, elements.prompt.value);

    if (!state.isUsable) {
      return;
    }

    window.open(state.url, "_blank", "noopener,noreferrer");
  }

  elements.prompt.addEventListener("input", updateAll);

  SERVICES.forEach((service) => {
    const controls = serviceElements[service];
    controls.linkText.addEventListener("input", updateAll);
    controls.copyUrl.addEventListener("click", () => handleCopyUrl(service));
    controls.copyHtml.addEventListener("click", () => handleCopyHtml(service));
    controls.open.addEventListener("click", () => handleOpen(service));
  });

  applyTranslations();
  updateAll();
})();

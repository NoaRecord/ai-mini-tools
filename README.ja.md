# AIミニツール集

[English](README.md)

AIサービス向けの、小規模な静的ブラウザツール集です。GitHub Pagesで公開します。

[AIミニツール集を開く](https://noarecord.github.io/ai-mini-tools/)

## ツール

- **AI Prompt URL Generator** — ChatGPT / Grok用URLとエスケープ済みHTMLリンクを生成します。
- [公開版ページのソース](docs/tools/ai-prompt-url-generator/index.html)
- [保存する参照用プロトタイプ](ideas/AI-prompt-URL/ai-prompt-url-generator.html)

## プレビューとテスト

```powershell
python -m http.server 8000 --directory docs
node --test tests/*.test.js
```

サーバー起動後に `http://127.0.0.1:8000/` を開きます。

## 構成

```text
docs/       GitHub Pagesサイトと公開ツール
ideas/      保存するプロトタイプ
project/    仕様とリリース確認項目
tests/      外部依存のない確認コード
```

mainブランチの `/docs` を直接配信し、フレームワークやビルド工程を使わない構成です。`docs/` の変更をmainへpushすると、GitHub Pagesも自動更新されます。外部サービスのクエリ形式は公式APIではなく、観測上の互換動作として扱います。

## 外部サービス

カタログにはKo-fiへのリンクとOFUSEの支援ウィジェットがあります。カタログ表示時にウィジェット描画用の `https://ofuse.me/assets/platform/widget.js` を読み込むため、ブラウザからOFUSEへ通常の通信が発生します。プロンプト入力を行うツール本体のページでは、この第三者スクリプトを読み込みません。

## ライセンス

[MIT License](LICENSE)で公開します。

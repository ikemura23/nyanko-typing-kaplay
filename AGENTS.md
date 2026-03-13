## プロジェクト概要
- にゃんこタイピング風のタイピングゲーム。敵を倒すタワーデフェンス風 UI で、子ども向けにローマ字・キー入力の土台を提供する。
- ドメイン用語・概念の定義は **docs/DOMAIN.md** を参照する。

## 技術スタック
- **ゲームエンジン**: [Kaplay](https://kaplayjs.com/) — ゲームロジック・シーン・スプライト・入力はすべて Kaplay の API に準拠する
- **ビルド**: Vite（開発サーバー・本番ビルド）

## コードスタイル
- すべてのコードにJavaScriptを使用する
- ES modules（`"type": "module"`）と Vite に準拠する

## パッケージマネージャー
- npm

## ビルドコマンド
- `npm run dev` — 開発サーバー起動（http://localhost:8000）
- `npm run build` — 本番ビルド（出力: `dist/`）
- `npm run preview` — ビルド結果のプレビュー
- `npm run zip` — ビルド後に `dist/game.zip` を作成（itch.io 等用）
- `npm run deploy` — ビルド後に Cloudflare Pages へデプロイ（`wrangler.toml` 使用）

## デプロイ（Cloudflare Pages）
- 初回のみ: `npx wrangler login` でログイン。必要なら `npx wrangler pages project create` でプロジェクト作成（または `npm run deploy` 実行時にプロジェクト名を聞かれて自動作成）。
- 通常: `npm run deploy` で `dist/` を Cloudflare Pages にアップロード。

## ディレクトリ構成
- `src/` — ゲームのソースコード（エントリ: `main.js`）
  - `src/common/` — 共通定数・共有モジュール
  - `src/game/` — ゲームプレイシーン（本編のタイピング・敵処理など）
  - `src/menu/` — メニュー／タイトルシーン（スタート画面）
  - `src/result/` — リザルトシーン（スコア表示・リトライ等）
- `dist/` — ビルド出力（index.html、JS バンドル、静的アセット）
- `docs/` — 設計・計画ドキュメント（PLAN.md、DOMAIN.md 等）。ドメイン用語は DOMAIN.md。
- ルート — `package.json`、`vite.config.js`、`wrangler.toml`、`index.html` 等の設定・エントリ

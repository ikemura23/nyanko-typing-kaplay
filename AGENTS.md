## プロジェクト概要
- にゃんこタイピング風のタイピングゲーム。敵を倒すタワーデフェンス風 UI で、子ども向けにローマ字・キー入力の土台を提供する。

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

## ディレクトリ構成
- `src/` — ゲームのソースコード（エントリ: `main.js`）
- `dist/` — ビルド出力（index.html、JS バンドル、静的アセット）
- `docs/` — 設計・計画ドキュメント（PLAN.md 等）
- ルート — `package.json`、`vite.config.js`、`index.html` 等の設定・エントリ

# KNOWLEDGE.md

## 概要

開発中に**何を学んだか・何にハマったか**を残すためのドキュメント。気づいたこと・つまずいた点を随時メモし、今後の拡張や振り返りに活用する。

## ドキュメントの構造

- トピックごとに見出し（##）で区切る
- Kaplay、Vite、その他ライブラリやツールなど、種類は問わず追記してよい
- **汎用的に使える内容**や**間違いやすい内容**を記載する（細かい仕様値や画面別の指定は載せない）
- 可能ならリファレンス・公式ドキュメントへのリンクを入れる

---

## Kaplay

### グローバルモード（kaplay/global）で統一

- **方針**: プロジェクトでは `import "kaplay/global"` を使い、Kaplay の API はグローバルに露出して使う（`k.` プレフィックスなし）。
- **手順**: エントリで `kaplay()` を呼んで初期化すると、`loadRoot`・`go`・`add`・`scene` などがグローバルで使える。
- **参照**: [KAPLAY Docs — Installation](https://kaplayjs.com/docs/guides/install/)（デフォルトで `global: true`）。

### text コンポーネント

**リファレンス**: [TextCompOpt — KAPLAY Docs](https://kaplayjs.com/docs/api/TextCompOpt)

- **文字の大きさ**: `text()` のオプションで `size` を指定する（数値＝ピクセル単位の高さ）。`fontSize` という名前ではないので注意。
- **文字色**: 同じオブジェクトに `color()` コンポーネントを付けて指定する。

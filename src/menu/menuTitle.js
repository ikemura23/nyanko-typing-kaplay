/** メニュー上部のタイトル文言を追加する */
export function addMenuTitle({ w }) {
    add([
        text("にゃんこタイピング", { size: 64 }),
        color(0, 0, 0),
        pos(w / 2, 200),
        anchor("center"),
    ]);
}

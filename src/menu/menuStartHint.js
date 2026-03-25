/** スタート操作の案内テキストを追加する */
export function addMenuStartHint({ w, h }) {
    add([
        text("スペースキーでスタート", { size: 32 }),
        color(0, 0, 0),
        pos(w / 2, h - 200),
        anchor("center"),
    ]);
}

/** 結果画面の見出し「せいせき」を追加する */
export function addResultTitle({ w }) {
    add([
        text("せいせき", { size: 80 }),
        color(0, 0, 0),
        pos(w / 2, 200),
        anchor("center"),
    ]);
}

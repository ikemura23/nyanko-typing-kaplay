/** 再プレイ・メニューへ戻る操作の案内を追加する */
export function addResultHints({ w, h }) {
    add([
        text("スペースキーでもう１回ゲームする", { size: 28 }),
        color(0, 0, 0),
        pos(w / 2, h - 180),
        anchor("center"),
    ]);
    add([
        text("エンターキーでメニューにもどる", { size: 28 }),
        color(0, 0, 0),
        pos(w / 2, h - 140),
        anchor("center"),
    ]);
}

/** メニューのマスコット（bean）スプライトを追加する */
export function addMenuMascot({ w }) {
    add([
        sprite("bean"),
        pos(w / 2, 320),
        anchor("center"),
    ]);
}

import { GROUND_HEIGHT } from "../common/groundHeight.js";

/** 画面下端に静的な地面（矩形・衝突）を追加する */
export function addGroundArea({ w, h }) {
    add([
        rect(w, GROUND_HEIGHT),
        pos(0, h - GROUND_HEIGHT),
        outline(4),
        area(),
        body({ isStatic: true }),
        color("#FF8322"),
    ]);
}

import { BACKGROUND_COLOR } from "../common/backgroundColor.js";

/** メニュー画面いっぱいの背景矩形を追加する */
export function addMenuBackground({ w, h }) {
    add([
        rect(w, h),
        pos(0, 0),
        anchor("topleft"),
        color(BACKGROUND_COLOR),
    ]);
}

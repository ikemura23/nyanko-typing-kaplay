// 結果画面

import { BACKGROUND_COLOR } from "../common/backgroundColor.js";

export function registerResultScene() {
    scene("result", () => {
        const w = width();
        const h = height();

        // 背景
        add([
            rect(w, h),
            pos(0, 0),
            anchor("topleft"),
            color(BACKGROUND_COLOR),
        ]);

        // 仮UI: せいせき（画面中央・大フォント）
        add([
            text("せいせき", { size: 80 }),
            color(0, 0, 0),
            pos(w / 2, 200),
            anchor("center"),
        ]);

        // 操作用説明（画面中央下部）
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

        onKeyPress("space", () => go("game"));
        onKeyPress("enter", () => go("menu"));
    });
}
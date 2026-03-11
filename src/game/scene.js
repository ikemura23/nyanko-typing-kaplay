import { BACKGROUND_COLOR } from "../common/backgroundColor.js";

export function registerGameScene() {
    loadSprite("bean", "sprites/bean.png");

    scene("game", () => {
        const w = width();
        const h = height();

        // 重力を設定
        setGravity(1600);

        // 背景
        add([
            rect(w, h),
            pos(0, 0),
            anchor("topleft"),
            color(BACKGROUND_COLOR),
        ]);

        // 地面エリア
        add([
            rect(width(), 56),
            pos(0, height() - 56),
            outline(4),
            area(),
            body({ isStatic: true }),
            color("#FF8322"),
        ]);

        // 仮のキャラクター
        const player = add([
            sprite("bean"),
            pos(80, h - 56),
            anchor("bot"),
            area(),
            body(),
        ]);

        // 仮の敵
        add([
            rect(48, 64),
            area(),
            body({isStatic: true}),
            outline(4),
            pos(width(), height() - 56),
            anchor("botleft"),
            color(255, 180, 255),
            move(LEFT, 80), // 移動速度
            "enemy",
        ]);

        onKeyPress("space", () => go("result")); // デバッグ用なので後で削除
    });
}
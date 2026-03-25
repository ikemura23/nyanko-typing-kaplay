import { GROUND_HEIGHT } from "../common/groundHeight.js";

/** プレイヤー用スプライトを Kaplay に読み込む */
export function loadPlayerAssets() {
    loadSprite("bean", "sprites/bean.png");
}

/** 地上にプレイヤー（bean）を配置する */
export function addPlayer({ w, h, groundHeight = GROUND_HEIGHT }) {
    return add([
        sprite("bean"),
        pos(80, h - groundHeight),
        anchor("bot"),
        area(),
        body(),
    ]);
}

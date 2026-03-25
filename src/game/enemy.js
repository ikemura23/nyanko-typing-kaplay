import { GROUND_HEIGHT } from "../common/groundHeight.js";

// 敵の移動速度
const ENEMY_SPEED = 80*8;

// 敵の見た目に使う Crew スプライト名（loadCrew の第2引数と一致）。
// 利用可能な名前は KAPLAY Crew の一覧を参照: https://v4000.kaplayjs.com/crew/
const ENEMY_SPRITES = ["flowy", "ghosty", "gigagantrum", "ghostiny", "beantle"];

/** 敵スプライトと衝突時の爆発用スプライトを Kaplay に読み込む */
export function loadEnemyAssets() {
    loadCrew("sprite", "flowy");
    loadCrew("sprite", "ghosty");
    loadCrew("sprite", "gigagantrum");
    loadCrew("sprite", "ghostiny");
    loadCrew("sprite", "beantle");
    loadCrew("sprite", "kaboom");
}

/** 画面右端の地上に敵を1体生成し、左へ移動させる（w/h は画面サイズ、groundHeight は足元オフセット） */
export function spawnEnemy({ w, h, groundHeight = GROUND_HEIGHT }) {
    const spriteName = choose(ENEMY_SPRITES);
    return add([
        sprite(spriteName),
        scale(4),
        area(),
        body({ isStatic: true }),
        pos(w, h - groundHeight),
        anchor("botleft"),
        move(LEFT, ENEMY_SPEED),
        "enemy",
    ]);
}

/** プレイヤーと敵の衝突時に爆発演出を出し、getResultPayload() の値を渡してリザルトへ遷移する */
export function attachPlayerEnemyGameOver(player, getResultPayload) {
    player.onCollide("enemy", (enemy) => {
        const midX = (player.pos.x + enemy.pos.x) / 2;
        const midY = ((player.pos.y + enemy.pos.y) / 2) - 100;
        const kaboomObj = add([
            sprite("kaboom"),
            pos(midX, midY),
            anchor("center"),
        ]);
        wait(1, () => {
            kaboomObj.destroy();
            go("result", getResultPayload());
        });
    });
}

import { GROUND_HEIGHT } from "../common/groundHeight.js";

// 敵の移動速度
const ENEMY_SPEED = 80*8;

const ENEMY_SPRITES = ["flowy", "ghosty", "gigagantrum", "ghostiny", "beantle"];

export function loadEnemyAssets() {
    loadCrew("sprite", "flowy");
    loadCrew("sprite", "ghosty");
    loadCrew("sprite", "gigagantrum");
    loadCrew("sprite", "ghostiny");
    loadCrew("sprite", "beantle");
    loadCrew("sprite", "kaboom");
}

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

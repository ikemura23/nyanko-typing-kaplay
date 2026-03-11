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

        // タイピングスコア(ゲーム中は非表示、成績画面で表示)
        let typingScore = 0;

        // 経過時間（画面右上に表示）
        let elapsedTime = 0;

        // 経過時間の表示（右上）
        const timerText = add([
            text("0", { size: 32 }),
            pos(w - 24, 24),
            anchor("topright"),
            color(0, 0, 0),
        ]);

        // 1秒ごとに経過時間を増やす
        loop(1, () => {
            elapsedTime += 1;
            timerText.text = String(elapsedTime);
        });

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
            move(LEFT, 800), // 移動速度
            "enemy",
        ]);

        // 敵と接触したら1秒後に結果画面へ（スコア・経過時間を渡す）
        player.onCollide("enemy", () =>
            wait(1, () => go("result", { typingScore, elapsedTime }))
        );
    });
}
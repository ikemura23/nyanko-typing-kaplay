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

        // タイピング用単語（仮で2文字 "KA"）
        const targetWord = "KA";
        let typedLength = 0;

        // タイピング用単語ゾーン（画面上部中央: 黒塗り, 白枠, 角丸）
        const zoneWidth = 96;
        const zoneHeight = 48;
        add([
            rect(zoneWidth, zoneHeight, { radius: 8 }),
            pos(w / 2, 40),
            anchor("center"),
            color(0, 0, 0),
            outline(2, rgb(255, 255, 255)),
        ]);

        // 単語テキスト（未入力=白, 入力済み正解=グレー）
        add([
            text(targetWord, {
                size: 32,
                transform: (idx, ch) =>
                    idx < typedLength
                        ? { color: rgb(128, 128, 128), override: true }
                        : {},
            }),
            pos(w / 2, 40),
            anchor("center"),
            color(255, 255, 255),
        ]);

        // キー入力: 正解なら typedLength を進める
        onCharInput((ch) => {
            if (typedLength < targetWord.length && ch.toUpperCase() === targetWord[typedLength]) {
                typedLength += 1;
            }
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
            move(LEFT, 80), // 移動速度
            "enemy",
        ]);

        // 敵と接触したら1秒後に結果画面へ（スコア・経過時間を渡す）
        player.onCollide("enemy", () =>
            wait(1, () => go("result", { typingScore, elapsedTime }))
        );
    });
}
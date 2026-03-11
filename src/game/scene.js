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

        // タイピング用単語リスト（10個・2文字ローマ字）
        const words = [
            "KA", "KI", "KU", "KE", "KO",
            "SA", "SI", "SU", "SE", "SO",
        ];
        let currentWordIndex = 0;
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
        const wordTextObj = add([
            text(words[currentWordIndex], {
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

        // キー入力: 正解なら typedLength を進める。1語完了で次の単語へ＆敵を次の1体に切り替え
        onCharInput((ch) => {
            const targetWord = words[currentWordIndex];
            if (typedLength < targetWord.length && ch.toUpperCase() === targetWord[typedLength]) {
                typedLength += 1;
                if (typedLength === targetWord.length) {
                    // 現在の敵を倒して次の敵を出現
                    currentEnemy.destroy();
                    currentEnemy = spawnEnemy();
                    // 次の単語へ（10個なので0に戻す）
                    currentWordIndex = (currentWordIndex + 1) % words.length;
                    typedLength = 0;
                    wordTextObj.text = words[currentWordIndex];
                }
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

        // 敵を1体生成する（1単語完了ごとに呼んで切り替え）
        function spawnEnemy() {
            return add([
                rect(48, 64),
                area(),
                body({ isStatic: true }),
                outline(4),
                pos(width(), height() - 56),
                anchor("botleft"),
                color(255, 180, 255),
                move(LEFT, 80),
                "enemy",
            ]);
        }
        let currentEnemy = spawnEnemy();

        // 敵と接触したら1秒後に結果画面へ（スコア・経過時間を渡す）
        player.onCollide("enemy", () =>
            wait(1, () => go("result", { typingScore, elapsedTime }))
        );
    });
}
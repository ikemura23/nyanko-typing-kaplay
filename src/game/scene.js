import { BACKGROUND_COLOR } from "../common/backgroundColor.js";
import { computeRoundsToComplete } from "../common/roundsToComplete.js";

// 敵の移動速度
const ENEMY_SPEED = 80;
// 地面の高さ
const GROUND_HEIGHT = 56;

export function registerGameScene() {
    loadSprite("bean", "sprites/bean.png");
    loadCrew("sprite", "flowy");
    loadCrew("sprite", "ghosty");
    loadCrew("sprite", "gigagantrum");
    loadCrew("sprite", "ghostiny");
    loadCrew("sprite", "beantle");
    loadCrew("sprite", "kaboom");

    scene("game", ({ typingMode, typingModeId } = {}) => {

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

        // タイピング用単語リスト（typingMode から生成）
        const words = typingMode && typeof typingMode === "object"
            ? Object.values(typingMode).flatMap((g) => g.keys || [])
            : [];
        const wordList = words.length > 0 ? words : [];
        const gameCompleteEnemyCount = computeRoundsToComplete(wordList);

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
        let currentWordIndex = 0;
        let typedLength = 0;
        let wordsCompleted = 0; // 完了した単語数（10で結果画面へ）
        let typingMistakes = 0; // 打ち間違いの回数

        // タイピング用単語ゾーン（画面上部中央: 黒塗り, 白枠, 角丸）
        const zoneWidth = 220;
        const zoneHeight = 100;
        add([
            rect(zoneWidth, zoneHeight, { radius: 16 }),
            pos(w / 2, 58),
            anchor("center"),
            color(0, 0, 0),
            outline(4, rgb(255, 255, 255)),
        ]);

        // 単語テキスト（未入力=白, 入力済み正解=グレー）
        const wordTextObj = add([
            text(wordList[currentWordIndex], {
                size: 76,
                transform: (idx, ch) =>
                    idx < typedLength
                        ? { color: rgb(128, 128, 128), override: true }
                        : {},
            }),
            pos(w / 2, 58),
            anchor("center"),
            color(255, 255, 255),
        ]);

        // キー入力: 正解なら typedLength を進める。誤りなら打ち間違いカウント
        onCharInput((ch) => {
            const targetWord = wordList[currentWordIndex];
            if (typedLength >= targetWord.length) return;
            if (ch.toUpperCase() === targetWord[typedLength]) {
                typedLength += 1;
                if (typedLength === targetWord.length) {
                    wordsCompleted += 1;
                    if (wordsCompleted >= gameCompleteEnemyCount) {
                        go("result", { typingScore, elapsedTime, typingMistakes });
                        return;
                    }
                    // 現在の敵を倒して次の敵を出現
                    currentEnemy.destroy();
                    currentEnemy = spawnEnemy();
                    // 次の単語へ
                    currentWordIndex = (currentWordIndex + 1) % wordList.length;
                    typedLength = 0;
                    wordTextObj.text = wordList[currentWordIndex];
                }
            } else {
                typingMistakes += 1;
            }
        });


        // 地面エリア
        add([
            rect(width(), GROUND_HEIGHT),
            pos(0, h - GROUND_HEIGHT),
            outline(4),
            area(),
            body({ isStatic: true }),
            color("#FF8322"),
        ]);

        // 仮のキャラクター
        const player = add([
            sprite("bean"),
            pos(80, h - GROUND_HEIGHT),
            anchor("bot"),
            area(),
            body(),
        ]);

        // 敵を1体生成する（1単語完了ごとに呼んで切り替え）
        const enemySprites = ["flowy", "ghosty", "gigagantrum", "ghostiny", "beantle"];
        function spawnEnemy() {
            const spriteName = choose(enemySprites);
            return add([
                sprite(spriteName),
                area(),
                body({ isStatic: true }),
                pos(w, h - GROUND_HEIGHT),
                anchor("botleft"),
                move(LEFT, ENEMY_SPEED),
                "enemy",
            ]);
        }
        let currentEnemy = spawnEnemy();

        // 敵と接触したら間に kaboom を表示し、1秒後に結果画面へ
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
                go("result", { typingScore, elapsedTime, typingMistakes });
            });
        });
    });
}
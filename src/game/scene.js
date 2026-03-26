import { computeRoundsToComplete } from "../common/roundsToComplete.js";
import { shuffleArray } from "../common/shuffleArray.js";
import {
    attachPlayerEnemyGameOver,
    loadEnemyAssets,
    spawnEnemy,
} from "./enemy.js";
import { addGameBackground } from "./gameBackground.js";
import { addGameTimerHud } from "./gameTimerHud.js";
import { addGroundArea } from "./ground.js";
import { addPlayer, loadPlayerAssets } from "./player.js";
import { addTypingWordPanel } from "./typingWordPanel.js";

export function registerGameScene() {
    loadPlayerAssets();
    loadEnemyAssets();

    scene("game", ({ typingMode, typingModeId } = {}) => {

        const w = width();
        const h = height();

        setGravity(1600);

        addGameBackground({ w, h });

        const words = typingMode && typeof typingMode === "object"
            ? Object.values(typingMode).flatMap((g) => g.keys || [])
            : [];
        const wordList = words.length > 0 ? shuffleArray(words) : [];
        const gameCompleteEnemyCount = computeRoundsToComplete(wordList);

        let typingScore = 0;

        const { getElapsedTime } = addGameTimerHud({ w });

        let currentWordIndex = 0;
        let typedLength = 0;
        let wordsCompleted = 0;
        let typingMistakes = 0;

        const { wordTextObj } = addTypingWordPanel({
            w,
            word: wordList[currentWordIndex] ?? "",
            getTypedLength: () => typedLength,
        });

        onCharInput((ch) => {
            const targetWord = wordList[currentWordIndex];
            if (!targetWord?.length) return;
            if (typedLength >= targetWord.length) return;
            if (ch.toUpperCase() === targetWord[typedLength]) {
                typedLength += 1;
                if (typedLength === targetWord.length) {
                    wordsCompleted += 1;
                    if (wordsCompleted >= gameCompleteEnemyCount) {
                        go("result", {
                            typingScore,
                            elapsedTime: getElapsedTime(),
                            typingMistakes,
                            typingMode,
                            typingModeId,
                        });
                        return;
                    }
                    currentEnemy.destroy();
                    currentEnemy = spawnEnemy({ w, h });
                    currentWordIndex = (currentWordIndex + 1) % wordList.length;
                    typedLength = 0;
                    wordTextObj.text = wordList[currentWordIndex] ?? "";
                }
            } else {
                typingMistakes += 1;
            }
        });

        addGroundArea({ w, h });

        const player = addPlayer({ w, h });

        let currentEnemy = spawnEnemy({ w, h });

        attachPlayerEnemyGameOver(player, () => ({
            typingScore,
            elapsedTime: getElapsedTime(),
            typingMistakes,
            typingMode,
            typingModeId,
        }));
    });
}

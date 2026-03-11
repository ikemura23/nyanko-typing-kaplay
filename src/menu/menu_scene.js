import { BACKGROUND_COLOR } from "../common/backgroundColor.js";
import { TYPING_MODE_KEYS_COLUMN } from "../typingMode/typingModeKeysColumn.js";
import { TYPING_MODE_KEYS_ROW } from "../typingMode/typingModeKeysRow.js";
import { TYPING_MODE_KEYS_GYOU } from "../typingMode/typingModeKeysGyou.js";

/** メニューで選べるタイピングモード一覧 */
const TYPING_MODES = [
  { id: "column", label: "縦キー", data: TYPING_MODE_KEYS_COLUMN },
  { id: "row", label: "横キー", data: TYPING_MODE_KEYS_ROW },
  { id: "gyou", label: "五十音", data: TYPING_MODE_KEYS_GYOU },
];

export function registerMenuScene() {
    loadSprite("bean", "sprites/bean.png");
    loadCrew("sprite", "arrow");

    scene("menu", () => {
        const w = width();
        const h = height();

        // 背景
        add([
            rect(w, h),
            pos(0, 0),
            anchor("topleft"),
            color(BACKGROUND_COLOR),
        ]);

        // タイトル: にゃんこタイピング（画面上部中央）
        add([
            text("にゃんこタイピング", { size: 64 }),
            color(0, 0, 0),
            pos(w / 2, 200),
            anchor("center"),
        ]);

        // キャラクター: bean（タイトル下）
        add([
            sprite("bean"),
            pos(w / 2, 320),
            anchor("center"),
        ]);

        // 説明: スペースキーでスタート（画面下部中央）
        add([
            text("スペースキーでスタート", { size: 32 }),
            color(0, 0, 0),
            pos(w / 2, h - 200),
            anchor("center"),
        ]);

        // タイピングモード選択
        let selectedIndex = 0;
        const modeOptionHeight = 48;
        const modeStartY = h / 2 - 24;

        add([
            text("タイピングモードを選んでください", { size: 28 }),
            color(0, 0, 0),
            pos(w / 2, modeStartY - 52),
            anchor("center"),
        ]);

        function startGame() {
            const mode = TYPING_MODES[selectedIndex];
            go("game", { typingMode: mode.data, typingModeId: mode.id });
        }

        const arrowOffsetX = 120; // メニュー文字の左側に表示する距離
        const arrowObj = add([
            sprite("arrow"),
            pos(w / 2 - arrowOffsetX, modeStartY + selectedIndex * modeOptionHeight),
            anchor("center"),
        ]);

        for (let i = 0; i < TYPING_MODES.length; i++) {
            const mode = TYPING_MODES[i];
            const y = modeStartY + i * modeOptionHeight;
            const opts = add([
                text(mode.label, { size: 36 }),
                pos(w / 2, y),
                anchor("center"),
                color(0, 0, 0),
                area({ width: 280, height: 44 }),
                "modeOption",
            ]);
            opts.onClick(() => {
                selectedIndex = i;
                updateModeHighlight();
            });
        }

        function updateModeHighlight() {
            arrowObj.pos.y = modeStartY + selectedIndex * modeOptionHeight;
        }

        onKeyPress("space", startGame);
        onKeyPress("enter", startGame);
        onKeyPress("up", () => {
            selectedIndex = (selectedIndex - 1 + TYPING_MODES.length) % TYPING_MODES.length;
            updateModeHighlight();
        });
        onKeyPress("down", () => {
            selectedIndex = (selectedIndex + 1) % TYPING_MODES.length;
            updateModeHighlight();
        });
        onKeyPress("1", () => { selectedIndex = 0; updateModeHighlight(); });
        onKeyPress("2", () => { selectedIndex = 1; updateModeHighlight(); });
        onKeyPress("3", () => { selectedIndex = 2; updateModeHighlight(); });
    });
}
import { TYPING_MODES } from "./typingModes.js";

/**
 * タイピングモード選択 UI とキー入力を登録する
 */
export function setupMenuTypingModePicker({ w, h }) {
    let selectedIndex = 0;
    const modeOptionHeight = 48;
    const modeStartY = h / 2 - 24;
    const zoneWidth = 320;
    const zoneHeight = 168;
    const labelMarginBottom = 16;

    add([
        text("タイピングモードを選んでください", { size: 28 }),
        color(0, 0, 0),
        pos(w / 2, modeStartY - 52 - labelMarginBottom),
        anchor("center"),
    ]);

    add([
        rect(zoneWidth, zoneHeight, { radius: 16 }),
        pos(w / 2, modeStartY + modeOptionHeight),
        anchor("center"),
        color(0, 0, 0),
        outline(4, rgb(255, 255, 255)),
    ]);

    function startGame() {
        const mode = TYPING_MODES[selectedIndex];
        go("game", { typingMode: mode.data, typingModeId: mode.id });
    }

    const arrowOffsetX = 120;
    const arrowObj = add([
        sprite("arrow-o"),
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
            color(255, 255, 255),
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
    onKeyPress("1", () => {
        selectedIndex = 0;
        updateModeHighlight();
    });
    onKeyPress("2", () => {
        selectedIndex = 1;
        updateModeHighlight();
    });
    onKeyPress("3", () => {
        selectedIndex = 2;
        updateModeHighlight();
    });
}

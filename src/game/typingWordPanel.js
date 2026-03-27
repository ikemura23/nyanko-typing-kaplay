const ZONE_WIDTH = 220;
const ZONE_HEIGHT = 100;
const PANEL_Y = 58;

/** タイピング用の枠と単語テキストを画面上部中央に追加する（揺れは panelRoot のみ） */
export function addTypingWordPanel({ w, word, getTypedLength }) {
    const panelRoot = add([
        pos(w / 2, PANEL_Y),
        anchor("center"),
    ]);

    const panelFrame = panelRoot.add([
        rect(ZONE_WIDTH, ZONE_HEIGHT, { radius: 16 }),
        pos(0, 0),
        anchor("center"),
        color(0, 0, 0),
        outline(4, rgb(255, 255, 255)),
    ]);

    const wordTextObj = panelRoot.add([
        text(word, {
            size: 76,
            transform: (idx, ch) =>
                idx < getTypedLength()
                    ? { color: rgb(128, 128, 128), override: true }
                    : {},
        }),
        pos(0, 0),
        anchor("center"),
        color(255, 255, 255),
        scale(1),
    ]);

    return { wordTextObj, panelFrame, panelRoot };
}

const ZONE_WIDTH = 220;
const ZONE_HEIGHT = 100;
const PANEL_Y = 58;

/** タイピング用の枠と単語テキストを画面上部中央に追加する */
export function addTypingWordPanel({ w, word, getTypedLength }) {
    add([
        rect(ZONE_WIDTH, ZONE_HEIGHT, { radius: 16 }),
        pos(w / 2, PANEL_Y),
        anchor("center"),
        color(0, 0, 0),
        outline(4, rgb(255, 255, 255)),
    ]);

    const wordTextObj = add([
        text(word, {
            size: 76,
            transform: (idx, ch) =>
                idx < getTypedLength()
                    ? { color: rgb(128, 128, 128), override: true }
                    : {},
        }),
        pos(w / 2, PANEL_Y),
        anchor("center"),
        color(255, 255, 255),
    ]);

    return { wordTextObj };
}

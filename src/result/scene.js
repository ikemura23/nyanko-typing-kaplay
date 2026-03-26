import { addResultBackground } from "./resultBackground.js";
import { addResultHints } from "./resultHints.js";
import { addResultStats } from "./resultStats.js";
import { addResultTitle } from "./resultTitle.js";
import { setupResultNavigation } from "./setupResultNavigation.js";

export function registerResultScene() {
    scene("result", ({
        typingScore = 0,
        elapsedTime = 0,
        typingMistakes = 0,
        typingMode,
        typingModeId,
    } = {}) => {
        const w = width();
        const h = height();

        addResultBackground({ w, h });
        addResultTitle({ w });
        addResultStats({ w, typingScore, elapsedTime, typingMistakes });
        addResultHints({ w, h });
        setupResultNavigation({ typingMode, typingModeId });
    });
}

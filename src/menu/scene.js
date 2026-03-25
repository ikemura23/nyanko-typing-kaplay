import { addMenuBackground } from "./menuBackground.js";
import { addMenuMascot } from "./menuMascot.js";
import { addMenuStartHint } from "./menuStartHint.js";
import { addMenuTitle } from "./menuTitle.js";
import { setupMenuTypingModePicker } from "./menuTypingModePicker.js";

export function registerMenuScene() {
    loadSprite("bean", "sprites/bean.png");
    loadCrew("sprite", "arrow-o");

    scene("menu", () => {
        const w = width();
        const h = height();

        addMenuBackground({ w, h });
        addMenuTitle({ w });
        addMenuMascot({ w });
        addMenuStartHint({ w, h });
        setupMenuTypingModePicker({ w, h });
    });
}

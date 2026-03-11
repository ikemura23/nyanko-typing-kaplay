export function registerGameScene() {
    loadSprite("bean", "sprites/bean.png");

    scene("game", () => {
        const w = width();
        const h = height();

        // 背景
        add([
            rect(w, h),
            pos(0, 0),
            anchor("topleft"),
            color("#ACFEFF"),
        ]);

    });
}
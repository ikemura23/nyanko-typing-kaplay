export function registerMenuScene() {
    loadSprite("bean", "sprites/bean.png");

    scene("menu", () => {
        const w = width();
        const h = height();

        // 背景
        add([
            rect(w, h),
            pos(0, 0),
            anchor("topleft"),
            color("#ACFEFF"),
        ]);

        // タイトル: にゃんこタイピング（画面上部中央）
        add([
            text("にゃんこタイピング", { size: 64 }),
            color(0, 0, 0),
            pos(w / 2, 200),
            anchor("center"),
        ]);

        // キャラクター: bean（中央付近）
        add([
            sprite("bean"),
            pos(w / 2, h / 2),
            anchor("center"),
        ]);

        // 説明: スペースキーでスタート（画面下部中央）
        add([
            text("スペースキーでスタート", { size: 32 }),
            color(0, 0, 0),
            pos(w / 2, h - 200),
            anchor("center"),
        ]);

        onKeyPress("space", () => go("game"));
    });
}
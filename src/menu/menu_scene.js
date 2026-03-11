export function registerMenuScene(k) {
    k.loadSprite("bean", "sprites/bean.png");

    k.scene("menu", () => {
        const w = k.width();
        const h = k.height();

        // 背景
        k.add([
            k.rect(w, h),
            k.pos(0, 0),
            k.anchor("topleft"),
            k.color("#ACFEFF"),
        ]);

        // タイトル: にゃんこタイピング（画面上部中央）
        k.add([
            k.text("にゃんこタイピング", { size: 64 }),
            k.color(0, 0, 0),
            k.pos(w / 2, 200),
            k.anchor("center"),
        ]);

        // キャラクター: bean（中央付近）
        k.add([
            k.sprite("bean"),
            k.pos(w / 2, h / 2),
            k.anchor("center"),
        ]);

        // 説明: スペースキーでスタート（画面下部中央）
        k.add([
            k.text("スペースキーでスタート", { size: 32 }),
            k.color(0, 0, 0),
            k.pos(w / 2, h - 200),
            k.anchor("center"),
        ]);

        k.onKeyPress("space", () => k.go("game"));
    });
}
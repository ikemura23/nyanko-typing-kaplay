const SCALE_PEAK = 1.1;
const PANEL_SHAKE_STEPS = 10;
const PANEL_SHAKE_STEP_SEC = 0.028;

/** panelRoot の位置だけランダムに揺らし、最後に元座標へ戻す */
function shakeTypingPanel(panelRoot, intensity) {
    const base = vec2(panelRoot.pos.x, panelRoot.pos.y);
    let i = 0;
    const tick = () => {
        if (i >= PANEL_SHAKE_STEPS) {
            panelRoot.pos = base;
            return;
        }
        const falloff = 1 - i / PANEL_SHAKE_STEPS;
        panelRoot.pos = vec2(
            base.x + rand(-intensity, intensity) * falloff,
            base.y + rand(-intensity, intensity) * falloff,
        );
        i += 1;
        wait(PANEL_SHAKE_STEP_SEC, tick);
    };
    tick();
}

/** タイピング正誤用の Crew SE を読み込む */
export function loadTypingFeedbackAssets() {
    loadCrew("sound", "bean_voice");
    loadCrew("sound", "mark_voice");
}

/** 1 文字正解時の SE と軽いスケール・パネルシェイク */
export function playTypingCorrectFeedback(wordTextObj, panelRoot) {
    play("bean_voice");
    shakeTypingPanel(panelRoot, 4);
    tween(
        1,
        SCALE_PEAK,
        0.06,
        (s) => {
            wordTextObj.scale = vec2(s);
        },
        easings.easeOutQuad,
    );
    wait(0.06, () => {
        tween(
            SCALE_PEAK,
            1,
            0.1,
            (s) => {
                wordTextObj.scale = vec2(s);
            },
            easings.easeOutQuad,
        );
    });
}

/** 不正解時の SE・枠の色フラッシュ・パネルシェイク */
export function playTypingWrongFeedback(panelFrame, panelRoot) {
    const outlineOk = rgb(255, 255, 255);
    const outlineWrong = rgb(255, 60, 80);
    play("mark_voice");
    shakeTypingPanel(panelRoot, 9);
    tween(
        outlineOk,
        outlineWrong,
        0.05,
        (c) => {
            panelFrame.outline.color = c;
        },
        easings.easeOutQuad,
    );
    wait(0.05, () => {
        tween(
            outlineWrong,
            outlineOk,
            0.12,
            (c) => {
                panelFrame.outline.color = c;
            },
            easings.easeOutQuad,
        );
    });
}

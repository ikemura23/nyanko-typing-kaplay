/** 右上に経過秒を表示し、1秒ごとにカウントアップする。`getElapsedTime` で現在値を取得できる */
export function addGameTimerHud({ w }) {
    let elapsedTime = 0;
    const timerText = add([
        text("0", { size: 32 }),
        pos(w - 24, 24),
        anchor("topright"),
        color(0, 0, 0),
    ]);
    loop(1, () => {
        elapsedTime += 1;
        timerText.text = String(elapsedTime);
    });
    return { getElapsedTime: () => elapsedTime };
}

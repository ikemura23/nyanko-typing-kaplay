/** スコア・経過時間・ミス回数の表示を追加する */
export function addResultStats({ w, typingScore, elapsedTime, typingMistakes }) {
    add([
        text(`スコア: ${typingScore}  時間: ${elapsedTime}秒  まちがい: ${typingMistakes}回`, { size: 28 }),
        color(0, 0, 0),
        pos(w / 2, 280),
        anchor("center"),
    ]);
}

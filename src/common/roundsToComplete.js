/**
 * タイピング対象リストからゲーム終了となるタイピング回数を算出する。
 * 最大文字数が 1〜2 なら 15回、3以上なら 10回。空リストのときは 10回。
 * @param {string[]} wordList - タイピング対象の文字列配列
 * @returns {number} ゲーム終了となるタイピング回数（最低10回）
 */
export function computeRoundsToComplete(wordList) {
    // リストが空のときは最大文字長を 0 とみなし、10回で終了（従来どおり）
    const maxLen = wordList.length
        ? Math.max(...wordList.map((s) => s.length))
        : 0;
    // 最大文字長が 1〜2 なら 15回、3以上なら 10回
    return maxLen <= 2 ? 15 : 10;
}

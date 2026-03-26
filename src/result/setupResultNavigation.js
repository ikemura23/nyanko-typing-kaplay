/** 結果画面のシーン遷移キー入力を登録する */
export function setupResultNavigation({ typingMode, typingModeId } = {}) {
    onKeyPress("space", () => go("game", { typingMode, typingModeId }));
    onKeyPress("enter", () => go("menu"));
}

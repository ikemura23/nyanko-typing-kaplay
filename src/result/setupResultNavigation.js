/** 結果画面のシーン遷移キー入力を登録する */
export function setupResultNavigation() {
    onKeyPress("space", () => go("game"));
    onKeyPress("enter", () => go("menu"));
}

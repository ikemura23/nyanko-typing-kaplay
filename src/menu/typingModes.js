import { TYPING_MODE_KEYS_COLUMN } from "../typingMode/typingModeKeysColumn.js";
import { TYPING_MODE_KEYS_GYOU } from "../typingMode/typingModeKeysGyou.js";
import { TYPING_MODE_KEYS_ROW } from "../typingMode/typingModeKeysRow.js";

/** メニューで選べるタイピングモード一覧 */
export const TYPING_MODES = [
    { id: "column", label: "縦キー", data: TYPING_MODE_KEYS_COLUMN },
    { id: "row", label: "横キー", data: TYPING_MODE_KEYS_ROW },
    { id: "gyou", label: "五十音", data: TYPING_MODE_KEYS_GYOU },
];

import kaplay from "kaplay";
import "kaplay/global"; // グローバルモードを使う
import { registerMenuScene } from "./menu/menu_scene.js";
import { registerGameScene } from "./game/scene.js";

// アセットを "./" 基準にすると Itch.io 等へデプロイしても正しく読める
kaplay();
loadRoot("./");

registerMenuScene();
registerGameScene();
go("menu");
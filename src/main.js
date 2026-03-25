import kaplay from "kaplay";
import { crew } from "@kaplayjs/crew";
import "kaplay/global"; // グローバルモードを使う
import { registerMenuScene } from "./menu/scene.js";
import { registerGameScene } from "./game/scene.js";
import { registerResultScene } from "./result/scene.js";

// アセットを "./" 基準にすると Itch.io 等へデプロイしても正しく読める
kaplay({ plugins: [crew] });
loadRoot("./");

registerMenuScene();
registerGameScene();
registerResultScene();
go("menu");
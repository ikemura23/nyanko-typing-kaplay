import kaplay from "kaplay";
import { registerMenuScene } from "./menu/menu_scene.js";
// import "kaplay/global"; // uncomment if you want to use without the k. prefix

// アセットを "./" 基準にすると Itch.io 等へデプロイしても正しく読める
const k = kaplay();
k.loadRoot("./");

registerMenuScene(k);

k.go("menu");
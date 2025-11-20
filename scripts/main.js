import { setupMenu } from './menu.js';
import { initGame } from './game/game.js';
import { draw } from './game/loop.js';

setupMenu((selectedLevel = 1) => {
  initGame(selectedLevel);
  draw();
});
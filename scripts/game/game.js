import { paddle } from './paddle.js';
import { ball } from './ball.js';
import { generateBricks } from './bricks.js';
import { setupInput } from './input.js';
import { ballLaunched } from '../state.js';

export function initGame(selectedLevel = 1) {
  generateBricks();
  resetBallAndPaddle();
  setupInput(paddle);
}

export function resetBallAndPaddle() {
  ballLaunched = false;
  ball.dx = 3;
  ball.dy = -3;
  paddle.x = 350;
}
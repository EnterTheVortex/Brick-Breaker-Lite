import { canvas } from './canvas.js';
import { ballLaunched, isPaused } from '../state.js';

let rightPressed = false;
let leftPressed = false;

export function setupInput(paddle) {
  document.addEventListener("keydown", e => {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
  });

  document.addEventListener("keyup", e => {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
  });

  document.addEventListener("mousemove", e => {
    const relativeX = e.clientX - canvas.getBoundingClientRect().left;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddle.x = relativeX - paddle.width / 2;
    }
  });

  canvas.addEventListener("click", () => {
    if (!ballLaunched && !isPaused) ballLaunched = true;
  });

  document.getElementById("pauseBtn").addEventListener("click", () => {
    isPaused = !isPaused;
    document.getElementById("pauseBtn").textContent = isPaused ? "Resume" : "Pause";
  });
}

export function getInputState() {
  return { rightPressed, leftPressed };
}
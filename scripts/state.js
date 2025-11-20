export let score = 0;
export let lives = 3;
export let level = 1;
export let ballLaunched = false;
export let isPaused = false;
export const completedLevels = new Set();

export function resetState() {
  score = 0;
  lives = 3;
  level = 1;
  ballLaunched = false;
  isPaused = false;
  completedLevels.clear();
}
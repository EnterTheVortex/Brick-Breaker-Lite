import { level, completedLevels } from './state.js';

export function setupMenu(startCallback) {
  document.getElementById("playBtn").addEventListener("click", () => {
    document.getElementById("mainMenu").style.display = "none";
    startCallback();
  });

  document.getElementById("levelSelectBtn").addEventListener("click", () => {
    document.getElementById("levelMenu").style.display = "block";
    const container = document.getElementById("levelButtons");
    container.innerHTML = "";

    completedLevels.forEach(lvl => {
      const btn = document.createElement("button");
      btn.textContent = "Level " + lvl;
      btn.onclick = () => {
        document.getElementById("levelMenu").style.display = "none";
        document.getElementById("mainMenu").style.display = "none";
        startCallback(lvl);
      };
      container.appendChild(btn);
    });
  });

  document.getElementById("settingsBtn").addEventListener("click", () => {
    alert("Settings coming soon!");
  });
}
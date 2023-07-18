import { getElement } from "./getEle.js";

export function setUpMenu(){
  // !!!!--------- >>>>>>>>  loop to create tehse for less code?
  let mineMenu = getElement("game-menu-mine-div");
  let smeltMenu = getElement("game-menu-smelt-div");
  let craftMenu = getElement("game-menu-craft-div");
  let settingsMenu = getElement("game-menu-settings-div");
  getElement("ore-play-area-div").style.display = "flex";
  // !!! --------implement svg stroke style changes possibly
  mineMenu.style.backgroundColor = "green";
  mineMenu.addEventListener("click", () => {
    getElement("ore-play-area-div").style.display = "flex";
    getElement("smelt-play-area-div").style.display = "none";
    getElement("settings-play-area-div").style.display = "none";
    getElement("craft-play-area-div").style.display = "none";
    mineMenu.style.backgroundColor = "green";
    smeltMenu.style.backgroundColor = "transparent";
    craftMenu.style.backgroundColor = "transparent";
    settingsMenu.style.backgroundColor = "transparent";
  });

  smeltMenu.addEventListener("click", () => {
    getElement("smelt-play-area-div").style.display = "flex";
    getElement("ore-play-area-div").style.display = "none";
    getElement("settings-play-area-div").style.display = "none";
    getElement("craft-play-area-div").style.display = "none";
    mineMenu.style.backgroundColor = "transparent";
    smeltMenu.style.backgroundColor = "green";
    craftMenu.style.backgroundColor = "transparent";
    settingsMenu.style.backgroundColor = "transparent";
  });
  craftMenu.addEventListener("click", () => {
    getElement("craft-play-area-div").style.display = "flex";
    getElement("ore-play-area-div").style.display = "none";
    getElement("smelt-play-area-div").style.display = "none";
    getElement("settings-play-area-div").style.display = "none";
    mineMenu.style.backgroundColor = "transparent";
    smeltMenu.style.backgroundColor = "transparent";
    craftMenu.style.backgroundColor = "green";
    settingsMenu.style.backgroundColor = "transparent";
  });
  settingsMenu.addEventListener("click", () => {
    getElement("settings-play-area-div").style.display = "flex";
    getElement("craft-play-area-div").style.display = "none";
    getElement("ore-play-area-div").style.display = "none";
    getElement("smelt-play-area-div").style.display = "none";

    mineMenu.style.backgroundColor = "transparent";
    smeltMenu.style.backgroundColor = "transparent";
    craftMenu.style.backgroundColor = "transparent";
    settingsMenu.style.backgroundColor = "green";
  });
}
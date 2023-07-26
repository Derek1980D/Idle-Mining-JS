import { getElement } from "./getEle.js";
import { initSmeltery } from "../class_objects/smeltery.js";
/**
 *
 * @param {object} game the game object
 * @param {object} ore the ore to create a smeltry unlock for
 */
export function createSmelteryUnlockDiv(game, ore) {
  let smelteryUnlockDiv = getElement("unlock-smeltery-template");

  let newinnerHTML = smelteryUnlockDiv.innerHTML.replace(/template/g, ore.name);

  let newContainer = document.createElement("div");
  newContainer.setAttribute("id", ore.name + "-div");
  newContainer.setAttribute("class", "smelt-div-container-css");

  let mainDiv = getElement("smelt-play-area-contents-div");
  mainDiv.appendChild(newContainer);

  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", ore.name + "unlock-div");
  newDiv.setAttribute("class", "unlock-smeltery-div-css");
  newDiv.innerHTML = newinnerHTML;

  newContainer.appendChild(newDiv);

  let unlockText = getElement(ore.name + "-smeltery-unlock-text");

  unlockText.innerHTML =
    "Unlock " +
    `<span style='color:${ore.color}'> ${ore.name} </span>` +
    " for " +
    ore.stats.smelteryUnlockCost +
    " coins";
  let unlockButton = getElement("unlock-" + ore.name + "-smeltery-button");
 
  unlockButton.addEventListener("click", () => {
    if (game.coins.totalCoins >= ore.stats.smelteryUnlockCost) {
      initSmeltery(game, ore);
      newContainer.remove();
    }
  });
}

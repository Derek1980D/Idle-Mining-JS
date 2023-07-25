import { getElement } from "./getEle.js";
import { initOre } from "../class_objects/ore.js";
import { createSmelteryUnlockDiv } from "../utils/createSmelteryUnockDiv.js";
/**
 *
 * @param {string} name name of next unlock
 * @param {integer} cost cost of next unlock
 */
export function createUnlockOreDiv(game, name, cost) {
  let oreUnlockDiv = getElement("unlock-ore-template");

  let newinnerHTML = oreUnlockDiv.innerHTML.replace(/template/g, name);

  let newConatiner = document.createElement("div");
  newConatiner.setAttribute("id", name + "-div");
  newConatiner.setAttribute("class", "ore-div-container-css");
  let mainDiv = getElement("ore-play-area-contents-div");
  mainDiv.appendChild(newConatiner);

  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", name + "unlock-div");
  newDiv.setAttribute("class", "unlock-ore-div-css");
  newDiv.innerHTML = newinnerHTML;

  newConatiner.appendChild(newDiv);

  let unlockText = getElement(name + "-unlock-text");
  // !!!!--------->> change to colors of ore to be unlocked
  unlockText.innerHTML = "Unlock " + name + " for " + cost;
  let unlockButton = getElement("unlock-" + name + "-button");

  unlockButton.addEventListener("click", () => {
    if (game.coins.totalCoins >= cost) {
      initOre(
        game,
        game.oreProgression[0].name,
        game.oreProgression[0].color,
        game.oreProgression[0].multiplier,
        game.oreProgression[0].smeltTime,
        game.oreProgression[0].smeltCost,
        game.oreProgression[0].smelteryUnlockCost
      );
       createSmelteryUnlockDiv(game, game.ores[game.ores.length-1]);
      game.oreProgression.shift();
      newConatiner.remove();
      if (game.oreProgression.length >= 1) {
        createUnlockOreDiv(
          game,
          game.oreProgression[0].name,
          game.oreProgression[0].unlockCost
        );
      }
    }
  });
}

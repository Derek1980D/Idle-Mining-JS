import { getElement } from "./getEle.js";
import { initSmeltery } from "../class_objects/smeltery.js";
/**
 *
 * @param {string} name name of next unlock
 * @param {integer} cost cost of next unlock
 */
export function createSmelteryUnlockDiv(game, name, cost) {
    
  let smelteryUnlockDiv = getElement("unlock-smeltery-template");

  let newinnerHTML = smelteryUnlockDiv.innerHTML.replace(/template/g, name);

  let newConatiner = document.createElement("div");
  newConatiner.setAttribute("id", name + "-div");
  newConatiner.setAttribute("class", "smeltery-div-container-css");

  let mainDiv = getElement("smelt-play-area-contents-div");
  mainDiv.appendChild(newConatiner);

  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", name + "unlock-div");
  newDiv.setAttribute("class", "unlock-smeltery-div-css");
  newDiv.innerHTML = newinnerHTML;

  newConatiner.appendChild(newDiv);

  let unlockText = getElement(name + "-smeltery-unlock-text");
  // !!!!--------->> change to colors of ore to be unlocked
  unlockText.innerHTML = "Unlock " + name + " for " + cost;
  let unlockButton = getElement("unlock-" + name + "-smeltery-button");

  unlockButton.addEventListener("click", () => {
    if (game.coins.totalCoins >= cost) {
      initSmeltery(
        game, game.ores[0]
        
      );
     
      newConatiner.remove();
      if (game.oreProgression.length > 0) {
     //   createUnlockOreDiv(game, "gold", 100);
      }
    }
  });
}

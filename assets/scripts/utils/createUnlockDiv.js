import { getElement } from "./getEle.js";
/**
 *
 * @param {string} name name of next unlock
 * @param {integer} cost cost of next unlock
 */
export function createUnlockOreDiv(name, cost) {
  let oreUnlockDiv = getElement("unlock-ore-template");

  let newinnerHTML = oreUnlockDiv.innerHTML.replace(/template/g, name);

  let newConatiner = document.createElement("div");
  newConatiner.setAttribute("id", name + "-div");
  newConatiner.setAttribute("class", "ore-div-container-css");
  let mainDiv = getElement("play-area-div");
  mainDiv.appendChild(newConatiner);

  newDiv = document.createElement("div");
  newDiv.setAttribute("id", name + "unlock-div");
  newDiv.setAttribute("class", "unlock-ore-div-css");
  newDiv.innerHTML = newinnerHTML;

  newConatiner.appendChild(newDiv);

  let unlockText = getElement(name + "-unlock-text");
  unlockText.innerHTML = "Unlock " + name + " for " + cost;
  let unlockButton = getElement("unlock-" + name + "-button");
  console.log(unlockButton);
  unlockButton.addEventListener("click", () => {
    if (game.coins.totalCoins >= cost) {
      initOre(name, "Silver", 10);
      newConatiner.remove();
      createUnlockOreDiv("gold", 100);
    }
  });

  //temporary, remove once progression implemented
}

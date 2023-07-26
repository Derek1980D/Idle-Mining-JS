import { getElement } from "../utils/getEle.js";
/**
 * function to update the stats panel
 * 
 * @param {object} game the game object
 */
export function updateStats(game) {
  
  let coinsDiv = getElement("coins-div");
  coinsDiv.innerHTML = `<span style=color:yellow>Coins <br />  ${game.coins.totalCoins} </span>`;
  coinsDiv.style.border = "2px solid yellow";
  coinsDiv.style.background = "radial-gradient(#e6646400, #d4d8fa7c)";
  coinsDiv.style.padding = "2px";
  coinsDiv.style.width = "90%";

  for (const i in game.ores) {
    let statDiv = getElement(game.ores[i].name + "-ore-total");
    statDiv.innerHTML =
      `<span style='color:${game.ores[i].color}'>${game.ores[i].name} ore:</span>` +
      "<br />" +
      `<span style='color:white'>  ${game.ores[i].stats.total}</span>`;
  }
  
  for (const i in game.smelteries) {
    let statDiv = getElement(game.smelteries[i].name + "-bar-stats");
    statDiv.innerHTML =
      `<span style='color:${game.smelteries[i].color}'>${game.smelteries[i].name} bars:</span>` +
      "<br />" +
      `<span style='color:white'> ${game.smelteries[i].stats.totalBars}</span`;
      console.log(game.smelteries[i].stats.totalBars);
  }
}

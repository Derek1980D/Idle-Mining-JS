// !!!!! --------------- >>>>>>>>>>>>> a summary of all coins, ores, bars, etc added to stats panel

import { getElement } from "../utils/getEle.js";
export function updateStats(game) {
  let stats = {}
  
    let coinsDiv = getElement("coins-div")
    coinsDiv.innerHTML = `<span style=color:yellow>Coins <br />  ${game.coins.totalCoins} </span>`;
     coinsDiv.style.border = "2px solid yellow";
     coinsDiv.style.background = "radial-gradient(#e6646400, #d4d8fa7c)";
     coinsDiv.style.padding = "2px";
     coinsDiv.style.width = "90%";
    for (const i in game.ores) {
        let statDiv = getElement(game.ores[i].name + "-ore-total")
       statDiv.innerHTML =
         game.ores[i].name + " ore" + "<br />" + game.ores[i].stats.total;
    }
    for (const i in game.smelteries) {
      let statDiv = getElement(game.smelteries[i].name + "-bar-stats");
      statDiv.innerHTML = game.smelteries[i].name + " bars: " + game.smelteries[i].stats.totalBars;
    }
} 
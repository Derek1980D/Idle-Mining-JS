// !!!!! --------------- >>>>>>>>>>>>> a summary of all coins, ores, bars, etc added to stats panel

import { getElement } from "../utils/getEle.js";
export function updateStats(game) {
    let coinsDiv = getElement("coins-div")
    coinsDiv.innerHTML = "Coins: " + game.coins.totalCoins;
    for (const i in game.ores) {
        let statDiv = getElement(game.ores[i].name + "-ore-total")
       statDiv.innerHTML = game.ores[i].name + ": " + game.ores[i].stats.total;
    }
    for (const i in game.smelteries) {
      let statDiv = getElement(game.smelteries[i].name + "-bar-stats");
      statDiv.innerHTML = game.smelteries[i].name + " bars: " + game.smelteries[i].stats.totalBars;
    }
} 
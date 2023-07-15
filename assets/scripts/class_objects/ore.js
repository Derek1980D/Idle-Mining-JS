import { getElement } from "../utils/getEle.js";
import { createOreDiv } from "../utils/createOreDiv.js";

export function initOre(game, oreName, color, _multiplier, smeltTime) {
  createOreDiv(oreName, color);

  // create an ore object
  let ore = {} ;
  ore["name"] = oreName;
  ore["multiplier"] = _multiplier;
  ore["stats"] = {
    total: 0,
    miners: 1,
    minerCost: 10 * _multiplier,
    perMiner: 1,
    value: 1 * _multiplier,
    smeltTime: smeltTime,
    amountForSmelt: 5
  };

  ore["color"] = color;
  
  ore["divs"] = {
    divText: getElement(oreName + "-text-div"),
    minerText: getElement(oreName + "-miner-text-div"),
    sellText: getElement("sell-" + oreName + "-text-div"),
  };

  ore["buttons"] = {
    hireButton: getElement("hire-" + oreName + "-miner-button"),
    sellButton: getElement("sell-" + oreName + "-button"),
  };

  ore.buttons.hireButton.addEventListener("click", () => {
    if (game.coins.totalCoins >= ore.stats.minerCost) {
      game.coins.totalCoins -= ore.stats.minerCost;
      ore.stats.miners += 1;
      ore.stats.minerCost *= 2;
    }
  });

  ore.buttons.sellButton.addEventListener("click", () => {
    game.coins.totalCoins += ore.stats.total * ore.stats.value;
    ore.stats.total = 0;
  });

  ore["update"] = () => {
    ore.stats.total += ore.stats.miners * ore.stats.perMiner;
    //
    ore.divs.divText.innerHTML = `<span style='color:${color}'>${ore.name}</span>: ${ore.stats.total}<br>Miners: ${ore.stats.miners}<br><span style='color:${color}'>${ore.name}</span>/Miner: ${ore.stats.perMiner}`;
    //
    ore.divs.minerText.innerHTML =
      "Cost: " +
      ore.stats.minerCost +
      `<span style='color:${game.coins.color}'> Coins</span>`;
    //
    ore.divs.sellText.innerHTML = `<span style='color:${color}'>${ore.name}</span> Value:  <span style='color:${game.coins.color}'> ${ore.stats.value}</span>     `;
  };
  game.ores.push(ore);
  //return(ore);
}

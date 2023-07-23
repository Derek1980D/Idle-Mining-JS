
import { getElement } from "../utils/getEle.js";
import { createOreDiv } from "../utils/createOreDiv.js";
import { createSmelteryUnlockDiv } from "../utils/createSmelteryUnockDiv.js";
export function initOre(game, oreName, color, _multiplier, smeltTime, smeltCost, smelteryUnlockCost) {
  createOreDiv(oreName, color);
  // add new ore to stats panel
  let oreStats = document.createElement("div");
  oreStats.setAttribute("id", oreName + "-stats");
  oreStats.style.border = "2px solid " + color;
  oreStats.style.background = "radial-gradient(#e6646400, #d4d8fa7c)";
  oreStats.style.padding = "2px";
  oreStats.style.marginTop = "5px";
  oreStats.style.width = "90%";
  oreStats.setAttribute("class", "stat-item")
  //
  let statsPanel = getElement("stats-div");
  statsPanel.appendChild(oreStats);
  let oreTotal = document.createElement("div");
  oreTotal.setAttribute("id", oreName + "-ore-total");
  oreStats.appendChild(oreTotal);
  oreTotal.innerHTML = "hi";

  let ore = {};
  ore["name"] = oreName;
  ore["multiplier"] = _multiplier;
  ore["stats"] = {
    total: 0,
    miners: 1,
    minerCost: 10 * _multiplier,
    perMiner: 1,
    value: 1 * _multiplier,
    smelteryUnlockCost: smelteryUnlockCost,
    smeltTime: smeltTime,
    smeltCost: smeltCost,
  };
 ;
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
  // place first smeltery unlock
  if (game.oreProgression.length > 0) {
   
   
  }
  createSmelteryUnlockDiv(game, ore);
}

import { getElement } from "../utils/getEle.js";
import { createSmelteryDiv } from "../utils/createSmelteryDiv.js";

export function initSmeltery(game, ore) {
  createSmelteryDiv(ore.name, ore.color);

  // create a smeltery object
  let smeltery = {};
  smeltery["name"] = ore.name;
  smeltery["stats"] = {
    // can multiply these later with upgrades.
    smeltTime: ore.stats.smeltTime,
    smeltCost: ore.stats.amountForSmelt,
    value: 10 * ore.stats.value,
    isSmelting: false,
    isActive: true,
    smeltProgress: 0,
    smeltProgressPercent: 0,
  };
  smeltery["color"] = ore.color;

  smeltery["divs"] = {
    divText: getElement("smelt-" + ore.name + "-text"),
    progessBar: getElement("smelt-" + ore.name + "-progress"),
  };
  smeltery["update"] = (interval) => {
    smeltery.divs.divText.innerHTML =
      "Smelt " +
      smeltery.stats.smeltCost +
      " " +
      ore.name +
      " ore into 1 copper bar";
    if (smeltery.stats.isActive === true) {
      if (smeltery.stats.isSmelting === false) {
        if (ore.stats.total >= smeltery.stats.smeltCost) {
          smeltery.stats.isSmelting = true;
          ore.stats.total -= smeltery.stats.smeltCost;
        }
      }
    }

    if (smeltery.stats.isSmelting === true) {

      
      smeltery.stats.smeltProgress += interval / 1000;

      smeltery.stats.smeltProgressPercent =
        (smeltery.stats.smeltProgress / smeltery.stats.smeltTime) * 100;

     
      smeltery.divs.progessBar.style.width =
        smeltery.stats.smeltProgressPercent + "%";
     
      if (smeltery.stats.smeltProgressPercent >= 100) {
        smeltery.stats.isSmelting = false;
        smeltery.stats.smeltProgress = 0;
        smeltery.divs.progessBar.style.width =  "0%";
      }
    }
  };
  game.smelteries.push(smeltery);
}

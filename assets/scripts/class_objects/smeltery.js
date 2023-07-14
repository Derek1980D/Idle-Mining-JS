import { getElement } from "../utils/getEle.js";
/**
 *
 * @param {object} game the game requesting this function
 * @param {string} oreType oretype to smelt
 * @param {string} color color
 * @param {integer} _multiplier multiplier
 * @param {integer} smeltTime time to smelt
 */
export function initSmeltery(game, oreType) {
  //!!!!!!!---------create smeltery div
  // createOreDiv(oreType, color);
  let smeltery = {};
  smeltery["oreType"] = oreType;
  smeltery["smeltTime"] = oreType.stats.smeltTime;
  smeltery["smeltProgress"] = 0;
  smeltery["isSmelting"] = false;
  smeltery["isActive"] = true;
  smeltery["update"] = (gameSinceTimeStamp) => {
    let smeltBarProgress = getElement("smelt-bar-progress-div");
   
    if(smeltery.isActive === true){
      
    if (oreType.stats.total >= oreType.stats.amountForSmelt) {
         oreType.stats.total -= oreType.stats.amountForSmelt;
        smeltery.isSmelting = true;
    }
    }
    
    if (smeltery.isSmelting == true) {
    smeltery.smeltProgress+=gameSinceTimeStamp/1000;
    let progressPercent = (smeltery.smeltProgress/smeltery.smeltTime)*100
    smeltBarProgress.style.width = progressPercent+"0%";
        if (progressPercent>= 100) {
            smeltery.smeltProgress = 0;
             smeltBarProgress.style.width = "0%";
            smeltery.isSmelting = false;
        }
    
    }
  
}
  game.smelteries.push(smeltery);
}

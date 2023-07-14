
/**
 * 
 * @param {object} game the game requesting this function
 * @param {string} oreType oretype to smelt
 * @param {string} color color
 * @param {integer} _multiplier multiplier
 * @param {integer} smeltTime time to smelt
 */
export function initSmeltery(game, oreType, color, _multiplier, smeltTime) {
  
    //!!!!!!!---------create smeltery div
   // createOreDiv(oreType, color);
   let smeltery = {};
   smeltery["oreType"] = oreType;
   smeltery["smeltTime"] = smeltTime;
   smeltery["smeltProgress"] = 0;
   smeltery["isSmelting"] = false;
   smeltery["update"] = () => {

   }
   game.smelteries.push(smeltery);
}
import { initCoins } from "./coins.js";
import { initOre } from "./ore.js";
import { createUnlockOreDiv } from "../utils/createUnlockDiv.js";
import { getOreProgression } from "../utils/oreProgression.js";
import { initSmeltery } from "./smeltery.js";
export function newGame() {
  let game = {};

  // some game variables for timing intervals
  game["lastTimeStamp"] = 0;
  game["sinceTimeStamp"] = 0;
  // array to store game ores
  game["ores"] = [];
  game["oreProgression"] = getOreProgression();
  game["smelteries"] = [];
  initCoins(game);

  // init the first item in ore progression then remove it from the array
  // !!!!!!! ---------->>>>> if i have time change this to pass in the array element and initOre parse that info
  initOre(game, game.oreProgression[0].name, game.oreProgression[0].color, game.oreProgression[0].multiplier);
  // remove the fist item from ore progresssion
  game.oreProgression.shift();


  //initSmeltery(game, game.ores[0])
  
  if (game.oreProgression.length > 0) {
    createUnlockOreDiv(game,  game.oreProgression[0].name, 10);
  }
  
 
    return game;
}


import { createSmelteryUnlockDiv } from "../utils/createSmelteryUnockDiv.js";
import { initSmeltery } from "../class_objects/smeltery.js";
import { createUnlockOreDiv } from "../utils/createUnlockDiv.js";
import { initCoins } from "./coins.js";
import { initOre } from "./ore.js";
import { getOreProgression } from "../utils/oreProgression.js";
import { setUpMenu } from "../utils/menuSetup.js";
// main game setup, returns a game object
export function gameSetup() {
  // declare game as an object
  let game = {};

  // some game variables for timing intervals
  game["lastTimeStamp"] = 0;
  game["sinceTimeStamp"] = 0;
  // array to store game ores
  game["ores"] = [];
  game["oreProgression"] = getOreProgression();
  // array to store game smelteries
  game["smelteries"] = [];

  // start a game
  game["start"] = () => {
    setUpMenu();
    initCoins(game);
    // init the first item in ore progression if its a new game
    if (localStorage.getItem("loadSave") != "true") {
      initOre(
        game,
        game.oreProgression[0].name,
        game.oreProgression[0].color,
        game.oreProgression[0].multiplier,
        game.oreProgression[0].smeltTime,
        game.oreProgression[0].smeltCost,
        game.oreProgression[0].smelteryUnlockCost
      );
      // remove the first item from ore progression
      game.oreProgression.shift();
      createUnlockOreDiv(
        game,
        game.oreProgression[0].name,
        game.oreProgression[0].unlockCost
      );

      createSmelteryUnlockDiv(game, game.ores[0]);
    }
    localStorage.setItem("loadSave", "true");
  };
  // function to save game stats
  game["saveStats"] = () => {
    let coinTotal = game.coins.totalCoins;
    let oreStats = game.ores;

    let smelteryStats = game.smelteries;
    let stats = [];
    stats.push(coinTotal, oreStats, smelteryStats);
    // stringify stats and save to local storage
    let statsString = JSON.stringify(stats);
    localStorage.setItem("stats", "" + statsString);
  };
  // function to oad game stats
  game["loadStats"] = () => {
    // parse the save string back to an array containg stats
    let statArray = JSON.parse(localStorage.getItem("stats"));
    game.coins.totalCoins = statArray[0];
    // loop though stats array 1 to load ores
    for (let i = 0; i < statArray[1].length; i++) {
      initOre(
        game,
        statArray[1][i].name,
        statArray[1][i].color,
        statArray[1][i].multiplier,
        statArray[1][i].stats.smeltTime,
        statArray[1][i].stats.smeltCost,
        statArray[1][i].stats.smelteryUnlockCost
      );
      game.ores[i].stats.miners = statArray[1][i].stats.miners;
      game.ores[i].stats.total = statArray[1][i].stats.total;
      game.oreProgression.shift();
       if (statArray[2].length > i){
        initSmeltery(game, game.ores[i]);
       } else {
          createSmelteryUnlockDiv(game, game.ores[i]);
       }
    }
    
  
    // loop though stats array 2 to load smelteries
    for (let i = 0; i < statArray[2].length; i++) {
     
      game.smelteries[i].stats.totalBars = statArray[2][i].stats.totalBars;
      game.smelteries[i].stats.smeltProgress =
        statArray[2][i].stats.smeltProgress;
    }

    if (game.oreProgression.length >= 1) {
      createUnlockOreDiv(
        game,
        game.oreProgression[0].name,
        game.oreProgression[0].unlockCost
      );
    }
  };

  return game;
}

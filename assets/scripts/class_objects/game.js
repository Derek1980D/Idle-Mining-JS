import { createUnlockOreDiv } from "../utils/createUnlockDiv.js";
import { initCoins } from "./coins.js";
import { initOre } from "./ore.js";
import { getOreProgression } from "../utils/oreProgression.js";
import { setUpMenu } from "../utils/menuSetup.js";
// main game setup, returns a game object
export function gameSetup() {
  // declare gmae as an object
  let game = {};
  // game stats for save and load
  game["stats"] = {
    totalOres: [],
    totalBars: [],
  };
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
    // init the first item in ore progression
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
     
      game.oreProgression.shift();
      createUnlockOreDiv(game, game.oreProgression[0].name, game.oreProgression[0].unlockCost);
    }
    localStorage.setItem("loadSave", "true");
    
    
  };
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
  game["loadStats"] = () => {
    let statSTring = JSON.parse(localStorage.getItem("stats"));
    game.coins.totalCoins = statSTring[0];
   
    
     
    statSTring[1].forEach((item) =>
      initOre(
        game,
        item.name,
        item.color,
        item.multiplier,
        item.smeltTime,
        item.smeltCost,
        item.smelteryUnlockCost
      )
    );
     statSTring[1].forEach((item) => game.oreProgression.shift());
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

function sayHI() {
  console.log("hi");
}

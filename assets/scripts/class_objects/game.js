import { createSmelteryUnlockDiv } from "../utils/createSmelteryUnockDiv.js";
import { initSmeltery } from "../class_objects/smeltery.js";
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
      createUnlockOreDiv(
        game,
        game.oreProgression[0].name,
        game.oreProgression[0].unlockCost
      );

      createSmelteryUnlockDiv(game, game.ores[0]);
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

    for (let i = 0; i < statSTring[1].length; i++) {
      initOre(
        game,
        statSTring[1][i].name,
        statSTring[1][i].color,
        statSTring[1][i].multiplier,
        statSTring[1][i].stats.smeltTime,
        statSTring[1][i].stats.smeltCost,
        statSTring[1][i].stats.smelteryUnlockCost
      );
      game.ores[i].stats.miners = statSTring[1][i].stats.miners;
      game.ores[i].stats.total = statSTring[1][i].stats.total;
      game.oreProgression.shift();
       
      }
      if (statSTring[2].length === 0) {
        createSmelteryUnlockDiv(game, game.ores[0]);
      }
    for (let i = 0; i < statSTring[2].length; i++) {
     initSmeltery(game, game.ores[i]);
      game.smelteries[i].stats.totalBars = statSTring[2][i].stats.totalBars;
      game.smelteries[i].stats.smeltProgress = statSTring[2][i].stats.smeltProgress;
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



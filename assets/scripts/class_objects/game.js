import { initCoins } from "./coins.js";
import { initOre } from "./ore.js";
import { createUnlockOreDiv } from "../utils/createUnlockDiv.js";
import { getOreProgression } from "../utils/oreProgression.js";
import { createSmelteryUnlockDiv } from "../utils/createSmelteryUnockDiv.js";
import { setUpMenu } from "../utils/menuSetup.js";
export function gameSetup() {
  let game = {};
  // game stats for save and load
  game.stats = {
    totalOres: [],
    totalBars: [],
  };
  // some game variables for timing intervals
  game.lastTimeStamp = 0;
  game.sinceTimeStamp = 0;
  // array to store game ores
  game.ores = [];
  game.oreProgression = getOreProgression();
  // array to store game smelteries
  game.smelteries = [];
  
  // start a game
  game.start = () => {
    setUpMenu();
    initCoins(game);
    // init the first item in ore progression 
    initOre(
      game,
      game.oreProgression[0].name,
      game.oreProgression[0].color,
      game.oreProgression[0].multiplier,
      game.oreProgression[0].smeltTime
    );
    // remove the fist item from ore progresssion
    game.oreProgression.shift();
    // place first smeltery unlock
    createSmelteryUnlockDiv(game, "yellow", 20);

    if (game.oreProgression.length > 0) {
      createUnlockOreDiv(game, game.oreProgression[0].name, 10);
    }
  }
  game.saveStats = () => {
    let coinTotal = game.coins.totalCoins;
    let oreStats = game.ores;
    let smelteryStats = game.smelteries;
    let stats = [];
    stats.push(coinTotal, oreStats, smelteryStats);
    // stringify stats and save to local storage
    let statsString = JSON.stringify(stats);
    localStorage.setItem("stats", ""+statsString);
  }
  game.loadStats = () => {
   let statSTring = JSON.parse(localStorage.getItem("stats"));
   game.coins.totalCoins = statSTring[0];
  // game.coins.totalCoins =statSTring[0];
   console.log(statSTring[0])

  }
  
 
    return game;
}


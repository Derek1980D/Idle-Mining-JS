import { gameSetup } from "./class_objects/game.js";
import { updateStats } from "./class_objects/stats.js";

let game;

window.onload = () => {
  // check local storage to see if loading stats or new game
  if (localStorage.getItem("loadSave") === "true") {
    loadSave();
  } else {
    
    startGame();
    
  }
};

// set up game object and enter the main loop
function startGame() {
  game = gameSetup();
  game.start();
  window.requestAnimationFrame(gameLoop);
}

let loadSave = () => {
  sessionStorage.setItem("loadSave", "true");
  // load data from local storage
  game = gameSetup();
  game.start();
  game.loadStats();
  // start game
  window.requestAnimationFrame(gameLoop);
};

/**
 * Main Game Loop, tries to run at 60fps with
 * requestAnimationFrame, timestamp is used
 * for updating at specific intervals
 */
let gameLoop = (timestamp) => {
  // get time past since last here
  game.sinceTimeStamp += timestamp - game.lastTimeStamp;
  updateStats(game);
  // Update every second
  if (game.sinceTimeStamp / 1000 >= 1) {
    game.sinceTimeStamp = 0;
    // loop through game ores to update
    for (const i in game.ores) {
      game.ores[i].update();
    }  
  }
  // update smelteries
  for (const i in game.smelteries) {
    game.smelteries[i].update(timestamp - game.lastTimeStamp);
  }
  // save game stats to local storage
  game.saveStats();
  game.lastTimeStamp = timestamp;
  console.log(game.oreProgression.length)
  window.requestAnimationFrame(gameLoop);
 
};

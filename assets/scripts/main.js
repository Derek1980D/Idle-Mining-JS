import { gameSetup } from "./class_objects/game.js";
import { updateStats } from "./class_objects/stats.js";

function sayHi() {
  console.log("hi");
}
let game;

window.onload = () => {
  // create new game object
  game = gameSetup();
  // check if at homepage, load button functions
  if (window.location.href.includes("index.html")) {
    let newGameButton = document.getElementById("new-game-button");
    newGameButton.addEventListener("click", startGame);
    let loadGameButton = document.getElementById("load-game-button");
    loadGameButton.addEventListener("click", loadSave);
  }

  if (window.location.href.includes("game.html")) {
    // start a game loop
    game.start();
    // start the game
    window.requestAnimationFrame(gameLoop);
  }
};

// startgame usuaing load save or not then onload to reset of page
function startGame() {
  window.location.href = "game.html";
}

let loadSave = () => {
  // load data from local storage

  // start game
  startGame();
};

/**
 * Main Game Loop, tries to run at 60fps with
 * requestAnimationFrame, timestamp is used
 * for updating at specific intervals
 */
let gameLoop = (timestamp) => {
  // get time past since last here
  game.sinceTimeStamp += timestamp - game.lastTimeStamp;

  // Update every second
  if (game.sinceTimeStamp / 1000 >= 1) {
    game.sinceTimeStamp = 0;
    // loop through game ores to update
    for (const i in game.ores) {
      game.ores[i].update();
    }
    // move this to game.update?
    updateStats(game);
  }
  // update smelteries
  for (const i in game.smelteries) {
    game.smelteries[i].update(timestamp - game.lastTimeStamp);
  }

  game.lastTimeStamp = timestamp;
  window.requestAnimationFrame(gameLoop);
};

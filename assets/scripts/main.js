import { initOreA } from "./class_objects/ore.js";
import { newGame } from "./class_objects/game.js";

let game = newGame();
// add some code for ore progression, the types and values, and update functions to only
// progress if another is availible, this leaves options to easily add new ores in later
// updates, same can be done for crafting which I will add next

//and arraay of ore progression in game, each array object stores or name, color, multiplier
// when crate a new ore from unlock div check for next if empty add a unlock in next game "update"


window.onload = () => {
  // check if at homepage, load button functions
  if (window.location.href.includes("index.html")) {
    let newGameButton = document.getElementById("new-game-button");
    newGameButton.addEventListener("click", startGame);
    let loadGameButton = document.getElementById("load-game-button");
    loadGameButton.addEventListener("click", loadSave);
  }
  if (window.location.href.includes("game.html")) {
   

    initOreA(game, "copper", "blue", 3);
 
     for (const i in game.ores) {
       game.ores[i].update();
     }
    // enter the main game loop
    window.requestAnimationFrame(gameLoop);
  }
};

// startgame usuaing load save or not then onload to reset of page
function startGame() {
  console.log("game started");
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
  // adding the time between since last here to since
  game.sinceTimeStamp += timestamp - game.lastTimeStamp;
  // since / 1000 should be around a second.
  if (game.sinceTimeStamp / 1000 >= 1) {
    game.coins.update();
    game.sinceTimeStamp = 0;
    // loop through game ores to update
    for (const i in game.ores) {
      game.ores[i].update();
    }
  }

  game.lastTimeStamp = timestamp;
  window.requestAnimationFrame(gameLoop);
};






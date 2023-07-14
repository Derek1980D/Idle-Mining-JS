import { newGame } from "./class_objects/game.js";
import { getElement } from "./utils/getEle.js";

let game;
// !!!!!!!--------------->>>>>>>>. TEMPORARY

///////////////////////////////
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
    game = newGame();
    window.requestAnimationFrame(gameLoop);
    // !!!!--------- >>>>>>>>  loop to create tehse for less code?
    let mineMenu = getElement("game-menu-mine");
    let smeltMenu = getElement("game-menu-smelt");
    // !!! --------implement svg stroke style changes possibly
    mineMenu.style.backgroundColor = "green";
    mineMenu.addEventListener("click", () => {
      getElement("smelting-play-area-div").style.display = "none";
      getElement("ore-play-area-div").style.display = "flex";
       mineMenu.style.backgroundColor = "green";
      smeltMenu.style.backgroundColor = "transparent";
    });

    
    smeltMenu.addEventListener("click", () => {
      getElement("smelting-play-area-div").style.display = "flex";
      getElement("ore-play-area-div").style.display = "none";
      mineMenu.style.backgroundColor = "transparent";
      smeltMenu.style.backgroundColor = "green";
    });
    
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
  // get time past since last here
  game.sinceTimeStamp += timestamp - game.lastTimeStamp;

  // Update every second
  if (game.sinceTimeStamp / 1000 >= 1) {
    game.sinceTimeStamp = 0;
    // loop through game ores to update
    for (const i in game.ores) {
      game.ores[i].update();
    }
  }

 for (const i in game.smelteries) {
   game.smelteries[i].update(timestamp - game.lastTimeStamp);
 }
    
   
  game.lastTimeStamp = timestamp;
  window.requestAnimationFrame(gameLoop);
};

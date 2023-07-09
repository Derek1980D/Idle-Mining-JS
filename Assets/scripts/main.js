let game = {};

window.onload = () => {
  // check if at homepage, load button functions
  if (window.location.href.includes("index.html")) {
    let newGameButton = document.getElementById("new-game-button");
    newGameButton.addEventListener("click", startGame);
    let loadGameButton = document.getElementById("load-game-button");
    loadGameButton.addEventListener("click", loadSave);
  }
  if (window.location.href.includes("game.html")) {
    // some game variables for timing intervals
    game["lastTimeStamp"] = 0;
    game["sinceTimeStamp"] = 0;
    game["ores"] = [];
    // add coins object to game
    initCoins();

    initOre("copper");
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

/**
 *
 * @param {object} game the game to add objects to
 *
 */
let initCoins = () => {
  game["coins"] = {};
  game.coins["totalCoins"] = 0;
  game.coins["totalCoinsDiv"] = getElement("coins");
  game.coins["update"] = () => {
    game.coins.totalCoinsDiv.innerHTML = game.coins.totalCoins;
    game.coins.totalCoins++;
  };
};
/**
 * // change to gernal ore creation, for now just copper
 *
 * @param {string} the name(type) of the ore
 */
let initOre = (oreName) => {
  // create and ore object
  let ore = {};
  ore["name"] = oreName;
  ore["stats"] = {
    total: 0,
    miners: 1,
    minerCost: 10,
    perMiner: 1,
    value: 1,
  };
  ore["divs"] = {
    divText: getElement(oreName + "-text"),
  };

  ore["update"] = () => {
   ore.divs.divText.innerHTML = "test copper update text";
  };
  // add to game ores arrray
  game.ores.push(ore);
};

/**
 * function to return and element by ID
 * @param {string} elementName The element to get from DOM
 * @returns the DOM element named
 */
let getElement = (elementName) => {
  return document.getElementById(elementName + "-div");
};

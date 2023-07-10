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
    //initOre("copper");

   
    initOre("Silver", "silver");
    initOre("Copper", "blue");
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
  game.coins["totalCoinsDiv"] = getElement("coins-div");
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
let initOre = (oreName, color) => {
   crateOreDiv(oreName, color);
  
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
    divText: getElement(oreName + "-text-div"),
    minerText: getElement(oreName + "-miner-text-div"),
    sellText: getElement("sell-"+ oreName+ "-text-div"),
    //hireButton: getElement(oreName + "-hire-button"),
    //sellbutton: getElement(oreName + "-sell-button")
  };

  ore["update"] = () => {
    ore.stats.total += ore.stats.miners * ore.stats.perMiner;
    //
    ore.divs.divText.innerHTML = `<span style='color:${color}'>${ore.name}</span>: ${ore.stats.total}<br>Miners: ${ore.stats.miners}<br><span style='color:${color}'>Copper</span>/Miner: ${ore.stats.perMiner}`;
    //
    ore.divs.minerText.innerHTML =
      "Cost: " +
      ore.stats.minerCost +
      "<span style='color-yellow'> Coins</span>";
    //
    ore.divs.sellText.innerHTML =
      "<span class='color-orange'>Copper</span> Value: " + ore.stats.value;
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
  return document.getElementById(elementName);
};

/**
 * 
 * @param {string} name Name of the ore
 * @param {string} color Color for div styling
 */
let crateOreDiv = (name, color) => {
  // copy the template div
  let oreDiv = getElement("ore-template");
  // replace any occurrences of template with parameter name
  let newinnerHTML = oreDiv.innerHTML.replace(/template/g, name);
  // create a new div to contain the new html
  newDiv = document.createElement("div");
  newDiv.setAttribute("id", name + "-div");
  newDiv.setAttribute("class", "ore-div-css");
  newDiv.innerHTML = newinnerHTML;
  // append main div with the new ore div
  let mainDiv = getElement("game-main-div");
  mainDiv.appendChild(newDiv);
  // new ore div elements specifc style
  newDiv.style.border = "2px solid " + color;
  let minerDiv = getElement(name + "-miner-div");
  minerDiv.style.border = "2px solid " + color;
  let sellDiv = getElement("sell-" + name + "-div");
  sellDiv.style.border = "2px solid " + color;
  sellDiv.style.marginTop = "3px";
};

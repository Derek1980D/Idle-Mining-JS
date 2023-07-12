
// add some code for ore progression, the types and values, and update functions to only
// progress if another is availible, this leaves options to easily add new ores in later
// updates, same can be done for crafting which I will add next

//and arraay of ore progression in game, each array object stores or name, color, multiplier
// when crate a new ore from unlock div check for next if empty add a unlock in next game "update"


// windows mode landscape, stats at side top menue side bottom, 2by 2 ores /crafting
// mobile potrait, stats top, menue bottom
// scale on size, check aspect ratio for the landcape or  portait
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

   
    initOre("Copper", "orange", 1);
    createUnlockOreDiv("silver", 100);
    //initOre("Silver", "Silver", 10);
    //initOre("Gold", "gold", 100);
    
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

/**
 *
 * @param {object} game the game to add objects to
 *
 */
let initCoins = () => {
  const coinsColor = "yellow"
  game["coins"] = {};
  game.coins["color"] = coinsColor;
  game.coins["totalCoins"] = 0;
  game.coins["totalCoinsDiv"] = getElement("coins-div");
  game.coins.totalCoinsDiv.style.color = coinsColor;
  game.coins["update"] = () => {
    game.coins.totalCoinsDiv.innerHTML = game.coins.totalCoins;
   
  };
};
/**
 * // change to gernal ore creation, for now just copper
 *
 * @param {string} oreName name(type) of the ore
 * @param {string} color color of the styling
 * @param {integer} _multiplier the values multiplier
 */
let initOre = (oreName, color, _multiplier) => {
   crateOreDiv(oreName, color);
  
  // create an ore object
  let ore = {};
  ore["name"] = oreName;
  ore["multiplier"] = _multiplier;
  ore["stats"] = {
    total: 0,
    miners: 1,
    minerCost: 10 * _multiplier,
    perMiner: 1,
    value: 1 * _multiplier
    ,
  };
  ore["divs"] = {
    divText: getElement(oreName + "-text-div"),
    minerText: getElement(oreName + "-miner-text-div"),
    sellText: getElement("sell-"+ oreName+ "-text-div") 
  };

  ore["buttons"] = {
    hireButton: getElement( "hire-" + oreName +"-miner-button"),
    sellButton: getElement("sell-" + oreName + "-button"),
  };
  
  ore.buttons.hireButton.addEventListener("click", ()=> {
    if (game.coins.totalCoins >= ore.stats.minerCost) {

      game.coins.totalCoins-=ore.stats.minerCost;
      ore.stats.miners+=1;
      ore.stats.minerCost*=2;
    }
    
  })

  ore.buttons.sellButton.addEventListener("click", () => {
    game.coins.totalCoins += (ore.stats.total*ore.stats.value);
    ore.stats.total = 0;
  });

  ore["update"] = () => {
    ore.stats.total += ore.stats.miners * ore.stats.perMiner;
    //
    ore.divs.divText.innerHTML = `<span style='color:${color}'>${ore.name}</span>: ${ore.stats.total}<br>Miners: ${ore.stats.miners}<br><span style='color:${color}'>${ore.name}</span>/Miner: ${ore.stats.perMiner}`;
    //
    ore.divs.minerText.innerHTML =
      "Cost: " +
      ore.stats.minerCost +
      `<span style='color:${game.coins.color}'> Coins</span>`;
    //
    ore.divs.sellText.innerHTML = `<span style='color:${color}'>${ore.name}</span> Value:  <span style='color:${game.coins.color}'> ${ore.stats.value}</span>     `;
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
  
  /// !!!!!!!!!! if game.progression isnt empty create 2 containers, one for the ore and one for the unlock ore else create 1
  //// !!!!!!!!!! remove create container from create unlock div
  // create a new ore div cointainer 
  let newConatiner = document.createElement("div")
  newConatiner.setAttribute("id", name + "-div");
  newConatiner.setAttribute("class", "ore-div-container-css");
  let mainDiv = getElement("play-area-div");
  mainDiv.appendChild(newConatiner);
  // create a new div to contain the new html
  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", name + "-div");
  newDiv.setAttribute("class", "ore-div-css");
  newDiv.innerHTML = newinnerHTML;
  // append main div with the new ore div
  newConatiner.appendChild(newDiv);
  // new ore div elements specifc style
  newDiv.style.border = "2px solid " + color;
  let minerDiv = getElement(name + "-miner-div");
  minerDiv.style.border = "1px solid " + color;
  let sellDiv = getElement("sell-" + name + "-div");
  sellDiv.style.border = "1px solid " + color;
  sellDiv.style.marginTop = "3px";


  // !!!!!!!! if game.progression has some elements left then
  //          create unlock div
  // !!!!!! --- remove unlock div crateion from other part of code
};

/**
 * 
 * @param {string} name name of next unlock
 * @param {integer} cost cost of next unlock
 */
let createUnlockOreDiv = (name, cost) => {
  let oreUnlockDiv = getElement("unlock-ore-template");
 
  let newinnerHTML = oreUnlockDiv.innerHTML.replace(/template/g, name);

let newConatiner = document.createElement("div");
newConatiner.setAttribute("id", name + "-div");
newConatiner.setAttribute("class", "ore-div-container-css");
let mainDiv = getElement("play-area-div");
mainDiv.appendChild(newConatiner);

   
   newDiv = document.createElement("div");
   newDiv.setAttribute("id", name + "unlock-div");
   newDiv.setAttribute("class", "unlock-ore-div-css");
   newDiv.innerHTML = newinnerHTML;
  
   newConatiner.appendChild(newDiv);
   

   let unlockText = getElement(name + "-unlock-text");
   unlockText.innerHTML= "Unlock " + name + " for " + cost;
   let unlockButton = getElement("unlock-" + name + "-button");
     console.log(unlockButton);
   unlockButton.addEventListener("click", ()=>{
    if (game.coins.totalCoins >= cost) {
       initOre(name, "Silver", 10);
       newConatiner.remove();
       createUnlockOreDiv("gold", 100);
    }
   })

   //temporary, remove once progression implemented
   
}

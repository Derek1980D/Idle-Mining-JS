import { initCoins } from "./coins.js";
export function newGame() {
  let game = {};
  // some game variables for timing intervals
  game["lastTimeStamp"] = 0;
  game["sinceTimeStamp"] = 0;
  // array to store game ores
  game["ores"] = [];
  initCoins(game);
  return game;
}


// TODO
export function loadGame (gameData) {

}
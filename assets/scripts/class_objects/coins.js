
/**
 *
 * @param {object} game the game to add objects to
 *
 */
export function initCoins(game) {
  const coinsColor = "yellow";
  game["coins"] = {}
  game.coins["color"] = coinsColor;
  game.coins["totalCoins"] = 1000;
 
}

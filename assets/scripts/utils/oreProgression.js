// add progression elements to array 

export function getOreProgression() {
    let OreProgression = []
    
    let copper = {
        name: "Copper",
        color: "orange",
        unlockCost: 0,
        multiplier: 1,
        smelteryUnlockCost: 10,
        smeltTime: 10,
        smeltCost: 5
    };

    let silver = {
      name: "Silver",
      color: "silver",
      unlockCost: 100,
      multiplier: 5,
      smelteryUnlockCost: 10,
      smeltTime: 20,
      smeltCost: 5,
    };

    let gold = {
      name: "Gold",
      color: "gold",
      unlockCost: 1000,
      multiplier: 10,
      smelteryUnlockCost: 10,
      smeltTime: 30,
      smeltCost: 5,
    };
    OreProgression.push(copper, silver, gold)
    return OreProgression;
}
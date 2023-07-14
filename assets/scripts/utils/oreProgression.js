// add progression elements to array 

export function getOreProgression() {
    let OreProgression = []
    
    let copper = {
        name: "Copper",
        color: "orange",
        multiplier: 1
    }

    let silver = {
        name: "Silver",
        color: "silver",
        multiplier: 5
    }

    let gold = {
        name: "Gold",
        color: "gold",
        multiplier: 10
    }
    OreProgression.push(copper, silver, gold)
    return OreProgression;
}
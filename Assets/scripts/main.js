// loading page variable here
window.onload = () => {
    // check if at homepage, load button functions
    if (window.location.href.includes("index.html")) {
         let newGameButton = document.getElementById("new-game-button");
         newGameButton.addEventListener("click", startGame);
         let loadGameButton = document.getElementById("load-game-button");
         loadGameButton.addEventListener("click", loadSave);
    }
    if (window.location.href.includes("game.html")) {
      window.requestAnimationFrame(gameLoop);
    }

};

// startgame usuaing load save or not then onload to reset of page
function startGame () {
   
    console.log("game started")
    window.location.href = "game.html";
}

let loadSave = () => {
    // load data from local storage 

    // start game
    startGame();
}

let gameLoop = () => {
    console.log("in game")
    window.requestAnimationFrame(gameLoop);
}


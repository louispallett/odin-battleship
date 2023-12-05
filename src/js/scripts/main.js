import '../../scss/styles.scss';
import { Gameboard } from "./Gameboard";
import { Computer, Human } from './Player';
import { Ship } from "./Ship";

// Global variables
const playWrapper = document.getElementById("play");
let turnCounter = 1;

const playBtn = document.getElementById("playbtn");
playBtn.addEventListener("click", () => {
    game();
});

const computerTurn = (playerGameboard, computer, playGrid) => {
    if (turnCounter % 2 != 0) {
        // It's the computer's turn
        setTimeout(() => {
            computerAttack(playerGameboard, computer, playGrid);
        }, 0);
    }
};

const computerAttack = (playerGameboard, computer, playGrid) => {
    let index = computer.play(playerGameboard);
    attack.attackResult(playerGameboard, index, playGrid.children[index]);
};

// The logic which is called when the user presses play.
const game = () => {
    const playerGameboard = new Gameboard();
    const computerGameboard = new Gameboard();
    const computer = new Computer();

    // TEMP
    const ship1 = new Ship(3);
    const ship2 = new Ship(4);
    const ship3 = new Ship(2, "vertical");
    const ship4 = new Ship(2);
    const ship5 = new Ship(2);
    const ship6 = new Ship(2, "vertical");
    computerGameboard.placeShip(0, ship1);
    playerGameboard.placeShip(0, ship1);
    computerGameboard.placeShip(20, ship2);
    playerGameboard.placeShip(20, ship2);
    computerGameboard.placeShip(35, ship3);
    playerGameboard.placeShip(35, ship3);
    computerGameboard.placeShip(87, ship4);
    playerGameboard.placeShip(87, ship4);
    computerGameboard.placeShip(41, ship5);
    playerGameboard.placeShip(41, ship5);
    computerGameboard.placeShip(84, ship6);
    playerGameboard.placeShip(84, ship6);
    // TEMP

    playBtn.remove();
    playWrapper.classList.add("gameboards");

    const left = document.createElement("div");
    left.setAttribute("id", "left");
    const playTitle = document.createElement("div");
    const playGrid = document.createElement("div");
    playTitle.classList.add("title");
    playTitle.textContent = "Player's Gameboard";
    playGrid.setAttribute("id", "player-grid");
    left.appendChild(playTitle);
    left.appendChild(playGrid);
    playWrapper.appendChild(left);
    
    const right = document.createElement("div");
    right.setAttribute("id", "right");
    const compTitle = document.createElement("div");
    const compGrid = document.createElement("div");
    compTitle.classList.add("title");
    compTitle.textContent = "Computer's Gameboard";
    compGrid.setAttribute("id", "player-grid");
    right.appendChild(compTitle);
    right.appendChild(compGrid);
    playWrapper.appendChild(right);

    createGrid(playerGameboard, playGrid, "computer");
    createGrid(computerGameboard, compGrid, "human"); 

    compGrid.addEventListener("click", (event) => {
        if (turnCounter % 2 == 0) {
            const index = event.target.dataset.index;
            attack.attackResult(computerGameboard, index, event.target);
            turnCounter++;
            computerTurn(playerGameboard, computer, playGrid);
        }
    });
};

const createGrid = (gameboard, gridElement, playing = "computer") => {
    gridElement.innerHTLM = "";

    for(let i = 0; i < 100; i++) {
        const gridItem = document.createElement("div");
        gridItem.dataset.index = i;
        gridItem.dataset.class = gameboard.board[i];
        
        if(playing == "human") {
            gridItem.addEventListener("click", () => {
                if(attack.alreadyClicked(gridItem)) return;
                attack.attackResult(gameboard, i, gridItem)
                turnCounter++;
            });
        } else {
            if (gameboard.board[i] instanceof Ship) {
                gridItem.style.backgroundColor = "green";
            }
        }

        gridElement.appendChild(gridItem);
    }
}

const attack = (() => {
    const attackResult = (gameboard, index, gridItem) => {
        const hitResult = gameboard.receiveAttack(index);

        if(alreadyClicked(gridItem)) return;

        if(hitResult) {
            success(gameboard, index, gridItem);
        } else {
            miss(gridItem);
        }
    };
    
    const success = (gameboard, index, gridItem) => {
        if(alreadyClicked(gridItem)) return;
        gridItem.dataset.class = 0;
        gridItem.style.backgroundColor = "red";
        gameboard.board[index] = 1;
        if(gameboard.haveLost()) {
            gameOver(gameboard);
        }
    };

    const miss = (gridItem) => {
        if(alreadyClicked(gridItem)) return;
        gridItem.dataset.class = 1;
        gridItem.style.backgroundColor = "pink";
    };

    const alreadyClicked = (gridItem) => {
        return(gridItem.dataset.class == 1 ||
            gridItem.dataset.class == 0)? true : false;
    };

    return { attackResult, alreadyClicked };
})();

const gameOver = (losersGameboard) => {
    console.log("STOP. Last index hit was: " + losersGameboard.hits[losersGameboard.hits.length - 1]);
};
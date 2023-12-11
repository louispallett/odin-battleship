import { Ship, ships } from "./Ship";
import { attack, createExample } from "./DOM";
import { checkBoard, checkPosition } from "./helperfunctions";
import { Gameboard } from "./Gameboard";
export { place };

const detail = document.getElementById("detail");
// Based on number of Ships
const maxClicks = ships.length - 1;
let clicks = 0;
const playerGB = new Gameboard();

//  TODO: Bug with horizontal placement.
//  [Bug 1] Currently cannot place horizontal ships if ships go into final column (indexes ending in 9). Must be issue with first conditional (marked) as can placeShips() in first column (indexes ending in 0) 

const place = (gridItem) => {
    const index = parseInt(gridItem.dataset.index);

    // BUG 1
    if(!checkBoard(playerGB, index, ships[clicks]) || !checkPosition(ships[clicks], index)) {
        detail.textContent = "Invalid position";
        return;
    }

    detail.textContent = ships[clicks].name + " placed at " + index; // May want to change this to index + 1 (so first is 1 and last is 100)
    playerGB.placeShip(index, ships[clicks]);

    if(clicks == maxClicks) {
        document.querySelectorAll(".grid-item").forEach(item => {
            item.onclick = null;
        });
        // createDoneBtn(); // Not sure we need this - can just jump straight to the game?
        setTimeout(() => {
            detail.textContent = "Ready to play!";
        }, 1000);
        setUp();
        return;
    }

    clicks++;
    showPlayerGrid(playerGB);
    createExample(ships[clicks]);
}

const showPlayerGrid = (gameboard) => {
    const playGrid = document.getElementById("player-grid");
    const playerTitle = document.querySelector("title");
    playerTitle.textContent = "Player's Board";
    playGrid.innerHTML = "";
    for(let i = 0; i < 100; i++) {
        const gridItem = document.createElement("div");
        gridItem.dataset.index = i;
        gridItem.dataset.class = gameboard.board[i];
        gridItem.onclick = function() {place(this)};

        if(gameboard.board[i] instanceof Ship) {
            gridItem.style.backgroundColor = "green";
        }

        playGrid.appendChild(gridItem);
    }
}

// Where we set the game up!
const setUp = () => {
    createPlayerGrid(playerGB);
    createComputerGrid();
}

const createPlayerGrid = (gameboard) => {
    const playGrid = document.getElementById("player-grid");
    const playerTitle = document.querySelector("title");
    playerTitle.textContent = "Player's Board";
    playGrid.innerHTML = "";
    for(let i = 0; i < 100; i++) {
        const gridItem = document.createElement("div");
        gridItem.dataset.index = i;
        gridItem.dataset.class = gameboard.board[i];

        if(gameboard.board[i] instanceof Ship) {
            gridItem.style.backgroundColor = "green";
        }

        playGrid.appendChild(gridItem);
    }
}

const createComputerGrid = () => {
    const compGB = new Gameboard();
    // Add ships randomly here via function!
    placeCBShips(compGB);

    const right = document.getElementById("right");
    right.innerHTML = "";
    const compTitle = document.createElement("div");
    compTitle.classList.add("title");
    compTitle.textContent = "Computer's Board";
    right.appendChild(compTitle);

    const compGrid = document.createElement("div");
    compGrid.setAttribute("id", "computer-grid");

    for(let i = 0; i < 100; i++) {
        const gridItem = document.createElement("div");
        gridItem.dataset.index = i;
        gridItem.dataset.class = compGB.board[i];

        gridItem.addEventListener("click", () => {
            if(attack.alreadyClicked(gridItem)) return;
            attack.attackResult(compGB, i, gridItem);
        });
        compGrid.appendChild(gridItem);
    }
    right.appendChild(compGrid);
}

const placeCBShips = (gameboard) => {
    for(let i = 0; i < ships.length; i++) {
        let index = getLegalIndex(gameboard, ships[i]);
        gameboard.placeShip(index, ships[i]);
    }
    
}

const getLegalIndex = (gameboard, ship) => {
    let index = Math.floor(Math.random() * 100);
    while(!checkBoard(gameboard, index, ship) || !checkPosition(ship, index)) {
        index = Math.floor(Math.random() * 100);
    }
    return index;
}
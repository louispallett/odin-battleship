import { Gameboard, Ship, ships } from "./classes";
import { setUp } from "./game";
import { createExample } from "./DOM";
import { checkBoard, checkPosition } from "./helperfunctions";
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
        setUp(playerGB);
        return;
    }

    clicks++;
    showPlayerGrid(playerGB);
    createExample(ships[clicks]);
}

const showPlayerGrid = (gameboard) => {
    const playGrid = document.getElementById("player-grid");
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
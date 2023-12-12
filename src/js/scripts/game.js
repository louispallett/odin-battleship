import { Gameboard } from "./Gameboard";
import { ships } from "./Ship";
import { attack } from "./DOM";
import { checkBoard, checkPosition } from "./helperfunctions";
export { createComputerGrid };


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
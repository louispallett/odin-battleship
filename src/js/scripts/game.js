import { Gameboard, Ship, ships } from "./classes";
import { attack } from "./DOM";
import { checkBoard, checkPosition, checkSquare } from "./helperfunctions";
export { setUp };

const setUp = (playerGB) => {
    createPlayerGrid(playerGB);
    createComputerGrid(playerGB);
}

const createPlayerGrid = (gameboard) => {
    const playGrid = document.getElementById("player-grid");
    const playerTitle = document.querySelector(".title");
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

const createComputerGrid = (playerGB) => {
    const compGB = new Gameboard();
    placeCBShips(compGB);

    const right = document.getElementById("right");
    right.innerHTML = "";
    const compTitle = document.createElement("div");
    compTitle.classList.add("title");
    compTitle.textContent = "Computer's Board";
    right.appendChild(compTitle);

    const compGrid = document.createElement("div");
    compGrid.setAttribute("id", "computer-grid");

    const playGrid = document.getElementById("player-grid");

    for(let i = 0; i < 100; i++) {
        const gridItem = document.createElement("div");
        gridItem.dataset.index = i;
        gridItem.dataset.class = compGB.board[i];

        gridItem.addEventListener("click", () => {
            if(attack.alreadyClicked(gridItem)) return;
            attack.attackResult(compGB, i, gridItem);
            computer.computerAttack(playerGB, playGrid);
        });
        compGrid.appendChild(gridItem);
    }
    right.appendChild(compGrid);
}

// Adds ships randomly
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

const computer = (() => {
    
    const computerAttack = (gameboard, playGrid) => {
        let index = getIndex(gameboard);
        attack.attackResult(gameboard, index, playGrid.children[index]);
    }

    const getIndex = (gameboard) => {
        let index = 0;
        while(!checkSquare(gameboard, index)) {
            index = Math.floor(Math.random() * 100);
        }
        return index;
    }

    return { computerAttack };
})();
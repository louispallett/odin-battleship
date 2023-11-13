import '../../scss/styles.scss';
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";
import { Computer, Human } from "./Player";

const createGrid = (gameboard, gridElement) => {
    gridElement.innerHTLM = "";
    gridElement.setAttribute("id", "gameboard-grid");

    for(let i = 0; i < gameboard.size * gameboard.size; i++) {
        const gridItem = document.createElement("div");
        gridItem.dataset.index = i;
        gridItem.addEventListener("click", () => handleGridClick(gameboard, i, gridItem));
        gridElement.appendChild(gridItem);
        
        if(gameboard.board[i] === 1) {
            // if grid has been hit (just an example here)
            gridItem.style.backgroundColor = "pink";
        } else if (gameboard.board[i] instanceof Ship) {
            gridItem.style.backgroundColor = "green";
        }
    }
}

const handleGridClick = (gameboard, index, gridItem) => {
    const result = gameboard.receiveAttack(gameboard, index);
    if(result) {
        gridItem.style.backgroundColor = "red";
    }
}

const playerGameboard = new Gameboard(10);
const computerGameboard = new Gameboard(10);

const playerGridElement = document.getElementById('player-grid');
const computerGridElement = document.getElementById('computer-grid');

createGrid(playerGameboard, playerGridElement);
createGrid(computerGameboard, computerGridElement); 
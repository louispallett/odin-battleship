import '../../scss/styles.scss';
import { Gameboard } from "./Gameboard";
import { Computer } from './Player';
import { Ship } from "./Ship";
// import { createGrid, attack } from './DOM-helpers';

// Global variables
const playerGridElement = document.getElementById('player-grid');
const computerGridElement = document.getElementById('computer-grid');
let turnCounter = 1;

const playBtn = document.getElementById("playbtn");
playBtn.addEventListener("click", () => {
    game();
});

const computerTurn = (playerGameboard, computer) => {
    if (turnCounter % 2 != 0) {
        // It's the computer's turn
        setTimeout(() => {
            computerAttack(playerGameboard, computer);
        }, 0);
    }
};

const computerAttack = (playerGameboard, computer) => {
    let index = computer.play(playerGameboard);
    attack.attackResult(playerGameboard, index, playerGridElement.children[index]);
};

// The logic which is called when the user presses play.
const game = () => {
    const playerGameboard = new Gameboard(10);
    const computerGameboard = new Gameboard(10);
    const computer = new Computer();

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

    createGrid(playerGameboard, playerGridElement, "computer");
    createGrid(computerGameboard, computerGridElement, "human"); 

    computerGridElement.addEventListener("click", (event) => {
        if (turnCounter % 2 == 0) {
            const index = event.target.dataset.index;
            attack.attackResult(computerGameboard, index, event.target);
            turnCounter++;
            computerTurn(playerGameboard, computer);
        }
    });
};

const createGrid = (gameboard, gridElement, playing = "computer") => {
    gridElement.innerHTLM = "";

    for(let i = 0; i < gameboard.size * gameboard.size; i++) {
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
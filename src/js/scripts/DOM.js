import { Ship } from "./Ship";
import { detail, updateScore } from "./scoreboard";
export { addAttackFunctionality, attack, createGrid };

let turnCounter = 1;

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
            miss(gameboard, index, gridItem);
        }
    };
    
    const success = (gameboard, index, gridItem) => {
        gridItem.dataset.class = 0;
        gridItem.style.backgroundColor = "red";
        gameboard.board[index] = 1;
        updateScore(gameboard);
        if(gameboard.haveLost()) {
            gameOver(gameboard);
            return;
        }
        detail(gameboard, index, "hits");
    };

    const miss = (gameboard, index, gridItem) => {
        gridItem.dataset.class = 1;
        gridItem.style.backgroundColor = "pink";
        detail(gameboard, index, "misses");
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

const computerTurn = (playerGameboard, computer, playGrid) => {
    if (turnCounter % 2 != 0) {
        setTimeout(() => {
            computerAttack(playerGameboard, computer, playGrid);
        }, 1500);
    }
};

const computerAttack = (playerGameboard, computer, playGrid) => {
    let index = computer.play(playerGameboard);
    attack.attackResult(playerGameboard, index, playGrid.children[index]);
};

const addAttackFunctionality = (compGrid, playerGameboard, computerGameboard, computer, playGrid) => {
    compGrid.addEventListener("click", (event) => {
        if (turnCounter % 2 == 0) {
            const index = event.target.dataset.index;
            attack.attackResult(computerGameboard, index, event.target);
            turnCounter++;
            computerTurn(playerGameboard, computer, playGrid);
        }
    });
}
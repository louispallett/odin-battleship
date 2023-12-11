import { place, indexes } from "./placement";
import { detail, updateScore } from "./scoreboard";
export { pre_game, createDoneBtn, attack };

const playWrapper = document.getElementById("play");
// const detail = document.getElementById("detail");

const pre_game = () => {
    // const playerGB = new Gameboard();
    const left = document.createElement("div");
    left.setAttribute("id", "left");
    const playTitle = document.createElement("div");
    const playGrid = document.createElement("div");
    playTitle.classList.add("title");
    playTitle.textContent = "Place your ships";
    playGrid.setAttribute("id", "player-grid");
    createGrid(playGrid);
    left.appendChild(playTitle);
    left.appendChild(playGrid);
    playWrapper.appendChild(left);
}

const createGrid = (gridParent) => {
    for(let i = 0; i < 100; i++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.dataset.index = i;
        gridItem.onclick = function() {place(this)}; // Call function here!
        gridParent.appendChild(gridItem);
    }
}

// POSSIBLY DELETE
const createDoneBtn = () => {
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.setAttribute("id", "doneBtn");
    doneBtn.addEventListener("click", () => {
        // Here we need to call the logic which creates the gameboards!
        console.log("Done");
    });
    playWrapper.appendChild(doneBtn);
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
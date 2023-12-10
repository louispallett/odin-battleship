import { place } from "./placement";
import { Gameboard } from "./Gameboard";
export { pre_game, createDoneBtn };

const playWrapper = document.getElementById("play");

const pre_game = () => {
    const playerGB = new Gameboard();
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

const createDoneBtn = () => {
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.setAttribute("id", "doneBtn");
    doneBtn.addEventListener("click", () => {
        console.log("Done");
    });
    playWrapper.appendChild(doneBtn);
}
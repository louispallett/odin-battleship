export { pre_game };

const playWrapper = document.getElementById("play");

const pre_game = () => {
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
        gridItem.dataset.index = i;
        gridParent.appendChild(gridItem);
    }
}
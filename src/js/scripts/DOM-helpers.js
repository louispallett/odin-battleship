export { createGrid };

const createGrid = (gameboard, gridElement) => {
    gridElement.innerHTLM = "";
    gridElement.setAttribute("id", "gameboard-grid");

    for(let i = 0; i < gameboard.size * gameboard.size; i++) {
        const gridItem = document.createElement("div");
        gridItem.dataset.index = i;
        gridItem.dataset.class = gameboard.board[i];
        gridItem.addEventListener("click", () => handleGridClick(gameboard, i, gridItem));
        gridElement.appendChild(gridItem);
        
        if (gameboard.board[i] instanceof Ship) {
            gridItem.style.backgroundColor = "green";
        }
    }
}

const handleGridClick = (gameboard, index, gridItem) => {

    if(alreadyClicked(gridItem)) return;
    
    console.log(gridItem.dataset.class);
    const result = gameboard.receiveAttack(gameboard, index);
    if(result) {
        gridItem.dataset.class = 0;
        gridItem.style.backgroundColor = "red";
    } else {
        gridItem.dataset.class = 1;
        gridItem.style.backgroundColor = "pink";
    }
    console.log(gridItem.dataset.class);

    console.log(ship.hitNum);
}

const alreadyClicked = (gridItem) => {
    return(gridItem.dataset.class == 1 ||
        gridItem.dataset.class == 0)? true : false;
}
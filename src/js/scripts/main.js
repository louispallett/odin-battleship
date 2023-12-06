import '../../scss/styles.scss';
import { Gameboard } from "./Gameboard";
import { Computer, Human } from './Player';
import { Ship } from "./Ship";
import { addAttackFunctionality, createGrid } from './DOM';

const playWrapper = document.getElementById("play");


const playBtn = document.getElementById("playbtn");
playBtn.addEventListener("click", () => {
    game();
});

const game = () => {
    const playerGameboard = new Gameboard("computer");
    const computerGameboard = new Gameboard("player");
    const computer = new Computer();

    // TEMP
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
    // TEMP

    playBtn.remove();
    playWrapper.classList.add("gameboards");

    const left = document.createElement("div");
    left.setAttribute("id", "left");
    const playTitle = document.createElement("div");
    const playGrid = document.createElement("div");
    playTitle.classList.add("title");
    playTitle.textContent = "Player's Gameboard";
    playGrid.setAttribute("id", "player-grid");
    left.appendChild(playTitle);
    left.appendChild(playGrid);
    playWrapper.appendChild(left);
    
    const right = document.createElement("div");
    right.setAttribute("id", "right");
    const compTitle = document.createElement("div");
    const compGrid = document.createElement("div");
    compTitle.classList.add("title");
    compTitle.textContent = "Computer's Gameboard";
    compGrid.setAttribute("id", "player-grid");
    right.appendChild(compTitle);
    right.appendChild(compGrid);
    playWrapper.appendChild(right);

    createGrid(playerGameboard, playGrid, "computer");
    createGrid(computerGameboard, compGrid, "human"); 

    addAttackFunctionality(compGrid, playerGameboard, computerGameboard, computer, playGrid);
};
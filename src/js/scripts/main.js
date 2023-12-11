import '../../scss/styles.scss';
import { Gameboard } from "./Gameboard";
import { Computer, Human } from './Player';
// import { Ship } from "./Ship";
import { pre_game, createDoneBtn } from './DOM';
import { indexes } from './placement';
// import { addAttackFunctionality, createGrid } from './DOM';

const detail = document.getElementById("detail");

const playBtn = document.getElementById("playbtn");
playBtn.addEventListener("click", () => {
    detail.textContent = "Click on the grid to add a ship!";
    pre_game();
    playBtn.remove();
});
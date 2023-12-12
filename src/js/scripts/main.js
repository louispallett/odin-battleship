import '../../scss/styles.scss';
import { pre_game } from './DOM';
// import { addAttackFunctionality, createGrid } from './DOM';

const detail = document.getElementById("detail");

const playBtn = document.getElementById("playbtn");
playBtn.addEventListener("click", () => {
    detail.textContent = "Click on the grid to add a ship!";
    pre_game();
    playBtn.remove();
});
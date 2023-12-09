import '../../scss/styles.scss';
import { Gameboard } from "./Gameboard";
import { Computer, Human } from './Player';
import { Ship } from "./Ship";
import { pre_game } from './DOM';
// import { addAttackFunctionality, createGrid } from './DOM';

const playBtn = document.getElementById("playbtn");
playBtn.addEventListener("click", () => {pre_game()})
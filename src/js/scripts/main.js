import '../../scss/styles.scss';
import { Gameboard } from "./Gameboard";
import { Ship } from "./Ship";
import { Computer, Human } from "./Player";
import { createGrid } from './DOM-helpers';



const playerGameboard = new Gameboard(10);
const computerGameboard = new Gameboard(10);

const playerGridElement = document.getElementById('player-grid');
const computerGridElement = document.getElementById('computer-grid');

const ship = new Ship(5);
const ship2 = new Ship(3, "vertical");
playerGameboard.placeShip(playerGameboard, 0, ship);
playerGameboard.placeShip(playerGameboard, 55, ship2);
playerGameboard.receiveAttack(playerGameboard, 5);

createGrid(playerGameboard, playerGridElement);
createGrid(computerGameboard, computerGridElement); 
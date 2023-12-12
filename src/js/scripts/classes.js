import { checkBoard, checkPosition, checkSquare } from "./helperfunctions";
export { Gameboard, Ship, ships };

class Gameboard {
    constructor() {
        this.board = this.buildBoard();
        this.hits = [];
        this.missedAttacks = [];
    }

    buildBoard = () => {
        let board = [];
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                board.push(null);
            }
        }
        return board;
    }

    placeShip = (index, ship) => {
        const boardIsFree = checkBoard(this, index, ship);
        const positionIsLegal = checkPosition(ship, index);
        if(boardIsFree && positionIsLegal) {
            // Checks done, can place ship
            for(let i = 0; i < ship.size; i++) {
                if(ship.direction == "horizontal") {
                    this.board[index + i] = ship;                    
                } else if (ship.direction == "vertical") {
                    this.board[index + (i * 10)] = ship;
                }
            }
            return true;
        }
        return false;
    }

    receiveAttack = (index) => {
        if(this.board[index] === null || this.board[index] == 1) { // Attack fails
            this.missedAttacks.push(index);
            this.board[index] = 1;
            return false;
        } else { // Attack succeeds
            const ship = this.board[index];
            this.hits.push(index);
            ship.hit();
            this.board[index] = 0;
            return true;
        }
    }
}

// NOTE: 'gameboard' refers to the OPPONENT gameboard
class Player {
    constructor(gameboard) {
        this.gameboard = gameboard;
    }

    haveLost = () => {
        if(this.gameboard.hits >= 15) {
            return true;
        }
        return false;
    }
}

class Human extends Player {
    constructor(gameboard) {
        super(gameboard);
    }

    play = (index) => {
        return this.gameboard.receiveAttack(index);
    }
}

class Computer extends Player {
    constructor(gameboard) {
        super(gameboard);
    }

    play = () => {
        let index = 0;
        while(!checkSquare(this.gameboard, index)) {
            index = Math.floor(Math.random() * 100);
        }
        return this.gameboard.receiveAttack(index);
    }
}

class Ship {
    constructor(name, size, direction = "horizontal") {
        this.name = name;
        this.size = size;
        this.direction = direction;
        this.sunk = false;
        this.hitNum = 0;
    }

    hit = () => {
        this.hitNum++;
        this.sunk = this.isSunk();
    }

    isSunk = () => {
        if(this.hitNum >= this.size) {
            return true;
        }
        return false;
    }
}

const carrier = new Ship("Carrier", 5)
const battleship = new Ship("Battleship", 4, "vertical");
const destroyer = new Ship("Destroyer", 3, "vertical");
const submarine = new Ship("Submarine", 3);
const patrol_boat = new Ship("Patrol Boat", 2);

const ships = [carrier, battleship, destroyer, submarine, patrol_boat];
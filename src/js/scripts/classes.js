import { checkBoard, checkPosition } from "./helperfunctions";
export { Ship, Gameboard };

class Gameboard {
    constructor(size) {
        this.size = size;
        this.board = this.buildBoard(size);
        this.missedAttacks = [];
    }

    buildBoard = (size) => {
        let board = [];
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                board.push(null);
            }
        }
        return board;
    }

    placeShip = (gameboard, index, ship) => {
        const boardIsFree = checkBoard(gameboard, index, ship);
        const positionIsLegal = checkPosition(ship, index);
        if(boardIsFree && positionIsLegal) {
            // Checks done, can place ship
            for(let i = 0; i < ship.size; i++) {
                if(ship.direction == "horizontal") {
                    gameboard.board[index + i] = ship;                    
                } else if (ship.direction == "vertical") {
                    gameboard.board[index + (i * 10)] = ship;
                }
            }
            return true;
        }
        return false;
    }

    receiveAttack = (gameboard, index) => {
        if(gameboard.board[index] === null || gameboard.board[index] == 1) { // Attack fails
            this.missedAttacks.push(index);
            gameboard.board[index] = 1;
            return false;
        } else { // Attack succeeds
            const ship = gameboard.board[index];
            ship.hit();
            return true;
        }
    }
}

class Ship {
    constructor(size, direction = "horizontal") {
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
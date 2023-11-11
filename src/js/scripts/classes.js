import { checkBoard, checkPosition } from "./helperfunctions";
export { Ship, Gameboard };

class Gameboard {
    constructor(size) {
        this.size = size;
        this.board = this.buildBoard(size);
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
    }

    isSunk = () => {
        if(this.hitNum >= this.size) {
            return true;
        }
        return false;
    }
}
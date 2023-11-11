import { checkBoard, checkPosition } from "./helperfunctions";

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

    placeShip = (board, index, size, direction) => {
        const boardIsFree = checkBoard(board, index, size, direction);
        const positionIsLegal = checkPosition();
        if(boardIsFree && positionIsLegal) {
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

export { Ship, Gameboard };
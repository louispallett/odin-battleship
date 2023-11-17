import { checkBoard, checkPosition } from "./helperfunctions";
export { Gameboard };

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
            ship.hit();
            return true;
        }
    }
}
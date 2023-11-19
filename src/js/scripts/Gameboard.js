import { checkBoard, checkPosition } from "./helperfunctions";
export { Gameboard };

class Gameboard {
    constructor() {
        this.board = this.buildBoard();
        this.missedAttacks = [];
        this.ships = [];
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
            this.ships.push(ship);
            return true;
        }
        return false;
    }

    removeShip = (ship) => {
        const index = this.ships.indexOf(ship);
        this.ships.splice(index, 1);
    }

    receiveAttack = (index) => {
        if(this.board[index] === null || this.board[index] == 1) { // Attack fails
            console.log("miss");
            this.missedAttacks.push(index);
            this.board[index] = 1;
            return false;
        } else { // Attack succeeds
            console.log("hit");
            const ship = this.board[index];
            ship.hit();
            if(ship.isSunk()) {
                // Remove from Ship Array
                const index = this.ships.indexOf(ship);
                this.ships.splice(index, 1);
                if(this.noShips()) {
                    this.endGame();
                }
            }
            return true;
        }
    }

    noShips = () => {
        return (this.ships.length == 0)? true : false;
    }

    endGame = () => {
        alert("End of Game");
    }
}
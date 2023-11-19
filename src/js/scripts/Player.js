export { Human, Computer };
import { checkSquare } from "./helperfunctions";

class Player {
    constructor() {
        this.ships = [];
    }

    addShip = (ship) => {
        this.ships.push(ship);
    }

    removeShip = (ship) => {
        const index = this.ships.indexOf(ship);
        this.ships.splice(index, 1);
    }
}

class Computer extends Player {
    constructor() {
        super();
    };

    play = (gameboard) => {
        let index = 0;
        while(!checkSquare(gameboard, index)) {
            index = Math.floor(Math.random() * 100);
        }
        return index;
    }
}

class Human extends Player {
    constructor() {
        super();
    }

    play = (gameboard, index) => {
        const result = gameboard.receiveAttack(index);
        return result;
    }
}
export { Human, Computer };
import { checkSquare } from "./helperfunctions";

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
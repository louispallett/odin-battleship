export { Human, Computer };
import { checkSquare } from "./helperfunctions";

class Computer {
    constructor() {};

    play = (gameboard) => {
        let index = 0;
        while(!checkSquare(gameboard, index)) {
            index = Math.floor(Math.random() * 100);
        }
        return index;
    }
}

class Human {
    constructor() {}

    play = (gameboard, index) => {
        const result = gameboard.receiveAttack(index);
        return result;
    }
}
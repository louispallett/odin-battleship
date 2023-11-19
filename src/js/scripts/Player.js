import { checkSquare } from "./helperfunctions";
export { Computer };

class Player {
    constructor() {}
};

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
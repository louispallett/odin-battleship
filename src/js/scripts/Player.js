import { checkSquare } from "./helperfunctions";
export { Player, Computer, Human };

class Player {
    constructor() {}
};

class Human extends Player {
    constructor() {
        super();
    };
    
    play = (gameboard, index) => {
        return gameboard.receiveAttack(gameboard, index);
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
        return gameboard.receiveAttack(gameboard, index);
    }
}
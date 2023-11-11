export { Player };
import { Gameboard } from "./Gameboard";

class Player {
    constructor() {
        
    }

    play = (gameboard, index) => {
        return gameboard.receiveAttack(gameboard, index);
    }
}
export { Player };

class Player {
    constructor() {}

    play = (gameboard, index) => {
        return gameboard.receiveAttack(gameboard, index);
    }
};
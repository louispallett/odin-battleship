class Gameboard {
    /*
    ================================================
    Pseudocode
    ================================================
    >>>>Gameboards should be able to place ships at specific coordinates by calling the ship factory function<<<<

        >>>Logic
        >Ingredients:
        A ship (which includes it's size)
        The coordinates (starting coordinate + size to determine final)

        >Checks:
        Is it on the board? Hark back to knight travails
        
        >Testing
            >Place a ship at legal coordinates - does it return coordinates correctly?
            >Place a ship at illegal coordinates - does it return an error?


    Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, 
    or records the coordinates of the missed shot.
    Gameboards should keep track of missed attacks so they can display them properly.
    Gameboards should be able to report whether or not all of their ships have been sunk.
    */
    constructor(size) {
        this.size = size;
        this.board = this.buildBoard(size);
    }

    buildBoard = (size) => {
        let board = [];
        for(let i = 0; i < size; i++) {
            for(let j = 0; j < size; j++) {
                board.push(i, j);
            }
        }
        return board;
    }

}

class Ship {
    /*
    ================================================
    Pseudocode
    ================================================
    Begin your app by creating the Ship class/factory (your choice).

        Your ‘ships’ will be objects that include their length, the number of times they’ve been hit and whether or not they’ve been sunk.

            >>> Represented in a class, constructor with length (parameter), hitNum = 0, and sunk = false.

        REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
        Ships should have a hit() function that increases the number of ‘hits’ in your ship.

            >> A simple increment

        isSunk() should be a function that calculates whether a ship is considered sunk based on its length and the number of hits it has received.

            >> A simple conditional
    */
    constructor(length) {
        this.length = length;
        this.sunk = false;
        this.hitNum = 0;
    }

    hit = () => {
        this.hitNum++;
    }

    isSunk = () => {
        if(this.hitNum >= this.length) {
            return true;
        }
        return false;
    }
}

export { Ship, Gameboard };
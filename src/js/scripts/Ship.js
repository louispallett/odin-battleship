export { ships };

class Ship {
    constructor(size, direction = "horizontal") {
        this.size = size;
        this.direction = direction;
        this.sunk = false;
        this.hitNum = 0;
    }

    hit = () => {
        this.hitNum++;
        this.sunk = this.isSunk();
    }

    isSunk = () => {
        if(this.hitNum >= this.size) {
            return true;
        }
        return false;
    }
}

const carrier = new Ship(5)
const battleship = new Ship(4, "vertical");
const destroyer = new Ship(3, "vertical");
const submarine = new Ship(3);
const patrol_boat = new Ship(2);

const ships = [carrier, battleship, destroyer, submarine, patrol_boat];
export { Ship, ships };

class Ship {
    constructor(name, size, direction = "horizontal") {
        this.name = name;
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

const carrier = new Ship("Carrier", 5)
const battleship = new Ship("Battleship", 4, "vertical");
const destroyer = new Ship("Destroyer", 3, "vertical");
const submarine = new Ship("Submarine", 3);
const patrol_boat = new Ship("Patrol Boat", 2);

const ships = [carrier, battleship, destroyer, submarine, patrol_boat];
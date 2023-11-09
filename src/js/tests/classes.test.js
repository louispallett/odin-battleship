import { Ship, Gameboard } from "../scripts/classes";

test("Returns true if ship is sunk", () => {
    const testShip = new Ship(2);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();
});

test("Returns false if ship is not sunk", () => {
    const testShip = new Ship(2);
    testShip.hit();
    expect(testShip.isSunk()).toBeFalsy();
});


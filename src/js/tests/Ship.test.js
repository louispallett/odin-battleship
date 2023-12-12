import { Ship } from "../scripts/classes";
import { checkPosition } from "../scripts/helperfunctions";

describe("Ship", () => {
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
});

describe("checkPosition", () => {
    test("Returns true if position is on board (horizontal)", () => {
        const ship = new Ship(3);
        expect(checkPosition(ship, 3)).toBeTruthy();
    });

    test("Returns false if position is not on board (horizontal)", () => {
        const ship = new Ship(3);
        expect(checkPosition(ship, 18)).toBeFalsy();
    });

    test("Returns true if position is on board (vertical)", () => {
        const ship = new Ship(3, "vertical");
        expect(checkPosition(ship, 3)).toBeTruthy();
    });
});
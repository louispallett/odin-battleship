import { Ship, Gameboard } from "../scripts/classes";
import { checkBoard, checkPosition } from "../scripts/helperfunctions";

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

describe("checkBoard", () => {
    test("Returns true if squares are empty", () => {
        const gameboard = new Gameboard(10);
        const ship = new Ship(3, "vertical")
        expect(checkBoard(gameboard, 0, ship)).toBeTruthy();
    });

    test("Returns false if squares are not empty", () => {
        const gameboard = new Gameboard(10);
        const ship = new Ship(5);
        gameboard.board[7] = ship;
        expect(checkBoard(gameboard, 5, ship)).toBeFalsy();
    });
});

describe("Place Ship", () => {
    test("Empty slots return null", () => {
        const gameboard = new Gameboard(10);
        expect(gameboard.board[88]).toStrictEqual(null);
    });

    test("Places a ship at legal coordinates", () => {
      const gameboard = new Gameboard(10);
      const ship = new Ship(3);
  
      const result = gameboard.placeShip(gameboard, 23, ship);
  
      // Ensure the ship is placed successfully
      expect(result).toBeTruthy();
      // Ensure the ship is at the correct coordinates
      expect(gameboard.board[23]).toBe(ship); // Change to 'toEqual' if certain error shows
      expect(gameboard.board[24]).toBe(ship); // Change to 'toEqual' if certain error shows
      expect(gameboard.board[25]).toBe(ship); // Change to 'toEqual' if certain error shows 
    });
  
    test("Refuses to place a ship at illegal coordinates", () => {
      const gameboard = new Gameboard(10);
      const ship = new Ship(4, "vertical");
  
      // Trying to place a ship outside the board (10x10)
      const result = gameboard.placeShip(gameboard, 95, ship);
  
      expect(result).toBeFalsy(); // Ensure the ship placement fails
      expect(gameboard.board[95]).toStrictEqual(null);; // Ensure the board remains unchanged
    });

    test("Refuses to place a ship where a ship already exists", () => {
        const gameboard = new Gameboard(10);
        const ship1 = new Ship(3, "vertical");
        // Place ship in empty (valid) spot
        gameboard.placeShip(gameboard, 0, ship1);

        const ship2 = new Ship(2);
        // Attempt to place ship2 in occupied (invalid) space
        const result = gameboard.placeShip(gameboard, 10, ship2);

        // result should return false and gameboard.board[15] should show ship1 (i.e. not )
        expect(result).toBeFalsy();
        expect(gameboard.board[10]).toBe(ship1);
    });

    test("Places multiple ships in valid locations", () => {
        const gameboard = new Gameboard(10);
        const ship1 = new Ship(4);
        const ship2 = new Ship(2, "vertical");
        const result1 = gameboard.placeShip(gameboard, 0, ship1);
        const result2 = gameboard.placeShip(gameboard, 43, ship2);
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
        expect(gameboard.board[0]).toBe(ship1);
        expect(gameboard.board[1]).toBe(ship1);
        expect(gameboard.board[2]).toBe(ship1);
        expect(gameboard.board[3]).toBe(ship1);
        expect(gameboard.board[4]).toStrictEqual(null);
        expect(gameboard.board[5]).toStrictEqual(null);
        expect(gameboard.board[43]).toBe(ship2);
        expect(gameboard.board[53]).toBe(ship2);
        expect(gameboard.board[63]).toStrictEqual(null);
    });
});

describe("Receive Attack", () => {
    test.skip("When hit fail, return false and record position", () => {
        const gameboard = new Gameboard(10);
        const ship = new Ship(4);
        gameboard.placeShip(gameboard, 40, ship);
        const failedAttack = gameboard.receiveAttack(gameboard, 50);
        expect(failedAttack).toBeFalsy();
        expect(gameboard.board[50]).toBe("attacked")
    });

    test.skip("When hit success, returns true and checks if ship is sunk", () => {
        const gameboard = new Gameboard(10);
        const ship = new Ship(4, "vertical");
        gameboard.placeShip(gameboard, 69, ship);
        const attack = gameboard.receiveAttack(gameboard, 79);
        expect(attack).toBeTruthy();
        expect(ship.hitNum).toEqual(1);
        expect(ship.isSunk).toBeFalsy();
    });
});
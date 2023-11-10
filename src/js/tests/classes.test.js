import { Ship, Gameboard } from "../scripts/classes";

const gameboard = new Gameboard(10);

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

describe("Gameboard", () => {
    test("Empty slots return null", () => {
        expect(gameboard.board[88]).toStrictEqual([null, null]);
    })

    test.skip("Places a ship at legal coordinates", () => {
      const gameboard = new Gameboard(10);
      const ship = new Ship(3);
  
      const result = gameboard.placeShip(ship, 23, "horizontal");
  
      // Ensure the ship is placed successfully
      expect(result).toBeTruthy();
      // Ensure the ship is at the correct coordinates
      expect(gameboard.board[23]).toBe(ship); // Change to 'toEqual' if certain error shows
      expect(gameboard.board[33]).toBe(ship); // Change to 'toEqual' if certain error shows
      expect(gameboard.board[43]).toBe(ship); // Change to 'toEqual' if certain error shows 
    });
  
    test.skip("Refuses to place a ship at illegal coordinates", () => {
      const gameboard = new Gameboard(10);
      const ship = new Ship(4);
  
      // Trying to place a ship outside the board (10x10)
      const result = gameboard.placeShip(ship, 95, "vertical");
  
      expect(result).toBeFalsy(); // Ensure the ship placement fails
      expect(gameboard.board[9][10]).toBeUndefined(); // Ensure the board remains unchanged
    });

    test.skip("Refuses to place a ship where a ship already exists", () => {
        const ship1 = new Ship(3);
        // Place ship in empty (valid) spot
        gameboard.placeShip(ship1, 0, "horizontal");

        const ship2 = new Ship(2);
        // Attempt to place ship2 in occupied (invalid) space
        const result = gameboard.placeShip(ship2, 20, "vertical");

        // result should return false and gameboard.board[2][0] should show ship1 (i.e. not )
        expect(result).toBeFalsy();
        expect(gameboard.board[20]).toBe(ship1);
    });

    test.skip("Places multiple ships in valid locations", () => {
        const ship1 = new Ship(4);
        const ship2 = new Ship(2);
        const result1 = gameboard.placeShip(ship1, 0, "horizontal");
        const result2 = gameboard.placeShip(ship2, 43, "vertical");
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
        expect(gameboard.board[0]).toBe(ship1);
        expect(gameboard.board[43]).toBe(ship2);
    });
});
import { Ship, Gameboard } from "../scripts/classes";

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
    test("Places a ship at legal coordinates", () => {
      const gameboard = new Gameboard(10);
      const ship = new Ship(3);
  
      const result = gameboard.placeShip(ship, 2, 3, "horizontal");
  
      // Ensure the ship is placed successfully
      expect(result).toBeTruthy();
      // Ensure the ship is at the correct coordinates
      expect(gameboard.board[2][3]).toEqual(ship);
      expect(gameboard.board[3][3]).toEqual(ship);
      expect(gameboard.board[4][3]).toEqual(ship); 
    });
  
    test.skip("Refuses to place a ship at illegal coordinates", () => {
      const gameboard = new Gameboard(10);
      const ship = new Ship(4);
  
      // Trying to place a ship outside the board (10x10)
      const result = gameboard.placeShip(ship, 9, 10, "vertical");
  
      expect(result).toBeFalsy(); // Ensure the ship placement fails
      expect(gameboard.board[9][10]).toBeUndefined(); // Ensure the board remains unchanged
    });

    test.skip("Refuses to place a ship where a ship already exists", () => {
        const gameboard = new Gameboard(10);
        const ship1 = new Ship(3);
        gameboard.placeShip(ship1, 0, 0, "horizontal");

        const ship2 = new Ship(2);
        const result = gameboard.placeShip(ship2, 2, 0, "vertical");

        expect(result).toBeFalsy();
        expect(gameboard.board[2][0]).toBe(ship1);
    })
  
    // Add more test cases as needed, such as testing for overlapping ships, placing multiple ships, etc.
});
import { Gameboard } from "../scripts/Gameboard";
import { Ship } from "../scripts/Ship";
import { checkBoard } from "../scripts/helperfunctions";

describe("checkBoard", () => {
    test("Returns true if squares are empty", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(3, "vertical")
        expect(checkBoard(gameboard, 0, ship)).toBeTruthy();
    });

    test("Returns false if squares are not empty", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(5);
        gameboard.board[7] = ship;
        expect(checkBoard(gameboard, 5, ship)).toBeFalsy();
    });
});

describe("Place Ship", () => {
    test("Empty slots return null", () => {
        const gameboard = new Gameboard();
        expect(gameboard.board[88]).toBeNull();
    });

    test("Places a ship at legal coordinates", () => {
      const gameboard = new Gameboard();
      const ship = new Ship(3);
  
      const result = gameboard.placeShip(23, ship);
  
      // Ensure the ship is placed successfully
      expect(result).toBeTruthy();
      // Ensure the ship is at the correct coordinates
      expect(gameboard.board[23]).toBe(ship); // Change to 'toEqual' if certain error shows
      expect(gameboard.board[24]).toBe(ship); // Change to 'toEqual' if certain error shows
      expect(gameboard.board[25]).toBe(ship); // Change to 'toEqual' if certain error shows 
    });
  
    test("Refuses to place a ship at illegal coordinates", () => {
      const gameboard = new Gameboard();
      const ship = new Ship(4, "vertical");
  
      // Trying to place a ship outside the board (10x10)
      const result = gameboard.placeShip(95, ship);
  
      expect(result).toBeFalsy(); // Ensure the ship placement fails
      expect(gameboard.board[95]).toBeNull();; // Ensure the board remains unchanged
    });

    test("Refuses to place a ship where a ship already exists", () => {
        const gameboard = new Gameboard();
        const ship1 = new Ship(3, "vertical");
        // Place ship in empty (valid) spot
        gameboard.placeShip(0, ship1);

        const ship2 = new Ship(2);
        // Attempt to place ship2 in occupied (invalid) space
        const result = gameboard.placeShip(10, ship2);

        // result should return false and gameboard.board[15] should show ship1 (i.e. not )
        expect(result).toBeFalsy();
        expect(gameboard.board[10]).toBe(ship1);
    });

    test("Places multiple ships in valid locations", () => {
        const gameboard = new Gameboard();
        const ship1 = new Ship(4);
        const ship2 = new Ship(2, "vertical");
        const result1 = gameboard.placeShip(0, ship1);
        const result2 = gameboard.placeShip(43, ship2);
        expect(result1).toBeTruthy();
        expect(result2).toBeTruthy();
        expect(gameboard.board[0]).toBe(ship1);
        expect(gameboard.board[1]).toBe(ship1);
        expect(gameboard.board[2]).toBe(ship1);
        expect(gameboard.board[3]).toBe(ship1);
        expect(gameboard.board[4]).toBeNull();
        expect(gameboard.board[5]).toBeNull();
        expect(gameboard.board[43]).toBe(ship2);
        expect(gameboard.board[53]).toBe(ship2);
        expect(gameboard.board[63]).toBeNull();
    });
});

describe("Receive Attack", () => {
    test("When hit fail, return false and record position", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(4);
        gameboard.placeShip(40, ship);
        const failedAttack = gameboard.receiveAttack(50);
        expect(failedAttack).toBeFalsy();
        expect(gameboard.board[50]).toBe(1)
    });

    test("When hit success, returns true and checks if ship is sunk", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(4, "vertical");
        gameboard.placeShip(69, ship);
        const attack = gameboard.receiveAttack(79);
        expect(attack).toBeTruthy();
        expect(ship.hitNum).toEqual(1);
        expect(ship.isSunk()).toBeFalsy();
    });

    test("A ship sinks if hitNum == size", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(2);
        gameboard.placeShip(40, ship);
        gameboard.receiveAttack(40);
        gameboard.receiveAttack(41);
        expect(ship.sunk).toBeTruthy(); 
    });

    test("A ship does NOT sink if hitNum != size", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(3);
        gameboard.placeShip(40, ship);
        gameboard.receiveAttack(40);
        gameboard.receiveAttack(41);
        expect(ship.sunk).toBeFalsy(); 
    });

    test("Missed attacks record indexes", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(3);
        gameboard.placeShip(40, ship);
        gameboard.receiveAttack(50);
        gameboard.receiveAttack(60);
        gameboard.receiveAttack(78);
        expect(gameboard.missedAttacks).toEqual(expect.arrayContaining([50, 60, 78]));
    });
});

describe("Hits key", () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(40, ship);
    gameboard.receiveAttack(40);
    gameboard.receiveAttack(41);
    expect(gameboard.hits.length).toEqual(2)
    expect(gameboard.hits).toEqual(expect.arrayContaining([40, 41]));
});
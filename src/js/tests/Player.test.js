import { Gameboard } from "../scripts/Gameboard";
import { Ship } from "../scripts/Ship";
import { Computer, Human } from "../scripts/Player";
import { checkSquare } from "../scripts/helperfunctions";

describe("checksquare", () => {
    test("checksquare() will return true if square is NOT 1 (has not been hit)", () => {
        const gameboard = new Gameboard();
        expect(checkSquare(gameboard, 0)).toBeTruthy();
    });

    test("checksquare() will return false if square is 1 (has already been hit)", () => {
        const gameboard = new Gameboard();
        const ship = new Ship(2);
        gameboard.placeShip(0, ship);
        gameboard.receiveAttack(10);
        expect(checkSquare(gameboard, 10)).toBeFalsy();
    });
});

describe("Player", () => {
    const gameboard = new Gameboard();
    const player = new Human(gameboard);
    const ship = new Ship(5, "vertical");
    gameboard.placeShip(24, ship);
    test("Player can attack successfully", () => {
        expect(player.play(54)).toBeTruthy();
    });
    test("Player can attack unsuccessfully", () => {
        expect(player.play(25)).toBeFalsy();
        expect(gameboard.missedAttacks).toEqual(expect.arrayContaining([25]));
    })
});

describe("Computer", () => {
    const gameboard = new Gameboard();
    const computer = new Computer(gameboard);
    const ship = new Ship(2);
    gameboard.placeShip(0, ship);
    // gameboard.receiveAttack(0);
    test("Computer can attack", () => {
        expect(ship.hitNum).toEqual(1);
    });
    test("Computer does not attack the same place twice", () => {
        // expect(computer.play()).toBeGreaterThan(0);
        expect(gameboard.board[0]).toBe(0);
    })
});
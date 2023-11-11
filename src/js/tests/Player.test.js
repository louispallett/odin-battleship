import { Gameboard } from "../scripts/Gameboard";
import { Ship } from "../scripts/Ship"
import { Player } from "../scripts/Player";

describe("Player", () => {
    test("Player can attack successfully", () => {
        const humanPlayer = new Player();
        const gameboard = new Gameboard(10);
        const ship = new Ship(5, "vertical");
        gameboard.placeShip(gameboard, 24, ship);
        expect(humanPlayer.play(gameboard, 54)).toBeTruthy();
    });

    test("Player can attack unsuccessfully", () => {
        const humanPlayer = new Player();
        const gameboard = new Gameboard(10);
        const ship = new Ship(5, "vertical");
        gameboard.placeShip(gameboard, 24, ship);
        expect(humanPlayer.play(gameboard, 56)).toBeFalsy();   
        expect(gameboard.missedAttacks).toEqual(expect.arrayContaining([56]));
    });
});
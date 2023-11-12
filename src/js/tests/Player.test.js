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

describe("Game", () => {
    const playerGameboard = new Gameboard(10);
    const computerGameboard = new Gameboard(10);
    const player = new Player();
    const computer = new Player();

    const pShip1 = new Ship(4);
    const pShip2 = new Ship(3, "vertical");
    const pShip3 = new Ship(2);
    computerGameboard.placeShip(computerGameboard, 0, pShip1);
    computerGameboard.placeShip(computerGameboard, 25, pShip2);
    computerGameboard.placeShip(computerGameboard, 87, pShip3);

    const cShip1 = new Ship(4);
    const cShip2 = new Ship(3, "vertical");
    const cShip3 = new Ship(2);
    playerGameboard.placeShip(playerGameboard, 10, cShip1);
    playerGameboard.placeShip(playerGameboard, 25, cShip2);
    playerGameboard.placeShip(playerGameboard, 66, cShip3);
    test("Player successfully attacks", () => {
        expect(player.play(playerGameboard, 12)).toBeTruthy();
        expect(cShip1.hitNum).toEqual(1);
    }); 

    test("Computer attacks and sinks ship", () => {
        computer.play(computerGameboard, 87);
        computer.play(computerGameboard, 88);
        expect(pShip3.isSunk()).toBeTruthy();
    });
});
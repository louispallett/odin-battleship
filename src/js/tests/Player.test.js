import { Gameboard } from "../scripts/Gameboard";
import { Ship } from "../scripts/Ship"
import { Player, Computer, Human } from "../scripts/Player";
import { checkSquare } from "../scripts/helperfunctions";

describe("checksquare", () => {
    test("checksquare() will return true if square is NOT 1 (has not been hit)", () => {
        const gameboard = new Gameboard(10);
        expect(checkSquare(gameboard, 0)).toBeTruthy();
    });

    test("checksquare() will return false if square is 1 (has already been hit)", () => {
        const gameboard = new Gameboard(10);
        const ship = new Ship(2);
        gameboard.placeShip(gameboard, 0, ship);
        gameboard.receiveAttack(gameboard, 10);
        expect(checkSquare(gameboard, 10)).toBeFalsy();
    });
});

describe("Player", () => {
    test("Player can attack successfully", () => {
        const humanPlayer = new Human();
        const gameboard = new Gameboard(10);
        const ship = new Ship(5, "vertical");
        gameboard.placeShip(gameboard, 24, ship);
        expect(humanPlayer.play(gameboard, 54)).toBeTruthy();
    });

    test("Player can attack unsuccessfully", () => {
        const humanPlayer = new Human();
        const gameboard = new Gameboard(10);
        const ship = new Ship(5, "vertical");
        gameboard.placeShip(gameboard, 24, ship);
        expect(humanPlayer.play(gameboard, 56)).toBeFalsy();   
        expect(gameboard.missedAttacks).toEqual(expect.arrayContaining([56]));
    });
});

describe("Game", () => {
    // Variables are named after ones OWN gameboard - i.e. player places their ship on THEIR gameboard
    // and attacks the COMPUTER gameboard
    const playerGameboard = new Gameboard(10);
    const computerGameboard = new Gameboard(10);
    const player = new Human();
    const computer = new Computer();

    const pShip1 = new Ship(4);
    const pShip2 = new Ship(3, "vertical");
    const pShip3 = new Ship(2);
    playerGameboard.placeShip(playerGameboard, 10, pShip1);
    playerGameboard.placeShip(playerGameboard, 25, pShip2);
    playerGameboard.placeShip(playerGameboard, 87, pShip3);

    const cShip1 = new Ship(4);
    const cShip2 = new Ship(3, "vertical");
    const cShip3 = new Ship(2);
    computerGameboard.placeShip(computerGameboard, 10, cShip1);
    computerGameboard.placeShip(computerGameboard, 25, cShip2);
    computerGameboard.placeShip(computerGameboard, 66, cShip3);
    test("Human successfully attacks", () => {
        expect(player.play(computerGameboard, 13)).toBeTruthy();
        expect(cShip1.hitNum).toEqual(1);
    }); 

    // To test this, we have to return the index on this function
    test.skip("Computer does not attack same position twice", () => {
        playerGameboard.receiveAttack(playerGameboard, 0);
        expect(computer.play(playerGameboard)).toBeGreaterThan(0);
    });
});
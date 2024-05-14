let { Ship, Gameboard, Player } = require("../src/props.js");

describe("Ship Test Cases:", () => {
  let ship;
  beforeEach(() => {
    ship = Ship();
  });
  it("Shows correct length", () => {
    ship.setLength(7);
    expect(ship.getLength()).toBe(7);
  });
  it("Increases hits when hit", () => {
    let beforeHit = ship.getTimesHit();
    ship.hit();
    let afterHits = ship.getTimesHit();
    expect(afterHits).toBe(beforeHit + 1);
  });
  it("Isn't sunk since it's length is NOT EQUAL TO the hits", () => {
    ship.setLength(6);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
  it("Isn't sunk since it's length is EQUAL TO the hits", () => {
    ship.setLength(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("Gameboard Test Cases:", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = Gameboard();
  });
  it("Is a 10x10 game board, with 10 rows", () => {
    expect(gameboard.getBoard().length).toBe(10);
  });
  it("Is a 10x10 game board, with 10 columns", () => {
    expect(gameboard.getBoard()[0].length).toBe(10);
  });
  it("Board receives an attack after passing coordinates", () => {
    gameboard.receiveAttack(2, 3);
    expect(gameboard.getAttackedAreas()[2][3]).toBe(true);
  });
  it("A coordinate doesn't get attacked after an attack was done to a different coordinate", () => {
    gameboard.receiveAttack(4, 5);
    expect(gameboard.getBoard()[2][3]).toBe(false);
  });
  it("Places ship type #1 from a coordinate, from an axis, placed correctly on the board, and indicates it's placed successfully by returning true", () => {
    expect(gameboard.placeShip(2, 3, "x", 1)).toBe(true);
    for (let i = 2; i < 7; i++) {
      expect(gameboard.getBoard()[i][3]).toBe(true);
    }
  });
  it("Fails to place ship type #1 from a coordinate, from an axis, since it goes out of bounds", () => {
    expect(gameboard.placeShip(7, 9, "x", 1)).toBe(false);
    for (let i = 7; i < 10; i++) {
      expect(gameboard.getBoard()[i][9]).toBe(false);
    }
  });
  it("The type of ship type 2 returns 2.", () => {
    gameboard.placeShip(4, 5, "x", 2);
    expect(gameboard.getShips()[0].getType()).toBe(2);
  });
});

describe("Player Test Cases:", () => {
  let player;
  beforeEach(() => {
    player = Player();
  });
  it("A player has their own 10x10 gameboard with 10 rows and 10 columns", () => {
    expect(player.getBoard().getBoard().length).toBe(10);
    expect(player.getBoard().getBoard()[0].length).toBe(10);
  });
});

describe("Player/Computer Player Test Cases:", () => {
  let player;
  let computer;
  beforeEach(() => {
    player = Player();
    computer = Player();
  });
  it("A player can attack a computer's ship (x axis)", () => {
    let computerBoard = computer.getBoard();
    computerBoard.placeShip(2, 3, "x", 1); // The computer places its carrier ship at (2,3)
    let ships = computerBoard.getShips(); // This should have 1 ship in the array.
    let beforeHit = ships[0].getTimesHit();
    computerBoard.receiveAttack(3, 3); // The player attacks it at (3,3)
    let afterHit = ships[0].getTimesHit();
    expect(afterHit).toBe(beforeHit + 1);
  });
  it("A player can attack a computer's ship multiple times, missing the last one (x axis), but it won't sink.", () => {
    let computerBoard = computer.getBoard();
    computerBoard.placeShip(2, 3, "x", 1); // The computer places its carrier ship at (2,3)
    let ships = computerBoard.getShips(); // This should have 1 ship in the array.
    let beforeHit = ships[0].getTimesHit();
    computerBoard.receiveAttack(5, 3);
    computerBoard.receiveAttack(6, 3);
    computerBoard.receiveAttack(7, 3);
    let afterHits = ships[0].getTimesHit();
    expect(afterHits).toBe(beforeHit + 2);
    expect(ships[0].isSunk()).toBe(false);
  });
  it("A player can attack a computer's ship (y axis)", () => {
    let computerBoard = computer.getBoard();
    computerBoard.placeShip(4, 5, "y", 1);
    let ships = computerBoard.getShips();
    let beforeHit = ships[0].getTimesHit();
    computerBoard.receiveAttack(4, 9);
    let afterHit = ships[0].getTimesHit();
    expect(afterHit).toBe(beforeHit + 1);
  });
  it("A player can attack a computer's ship multiple times, missing the last one (y axis), and sinking it!", () => {
    let computerBoard = computer.getBoard();
    computerBoard.placeShip(4, 5, "y", 1);
    let ships = computerBoard.getShips();
    let beforeHit = ships[0].getTimesHit();
    computerBoard.receiveAttack(4, 5);
    computerBoard.receiveAttack(4, 6);
    computerBoard.receiveAttack(4, 7);
    computerBoard.receiveAttack(4, 8);
    computerBoard.receiveAttack(4, 9);
    computerBoard.receiveAttack(4, 10);
    let afterHits = ships[0].getTimesHit();
    expect(afterHits).toBe(beforeHit + 5);
    expect(ships[0].isSunk()).toBe(true);
  });
  it("receiveAttack() returns false when a player fails to catch any ship from the computer's board.", () => {
    let computerBoard = computer.getBoard();
    computerBoard.placeShip(4, 5, "y", 1);
    expect(computerBoard.receiveAttack(3, 5)).toBe(false);
  });
  it("receiveAttack() returns true when a player fails to catch any ship from the computer's board.", () => {
    let computerBoard = computer.getBoard();
    computerBoard.placeShip(4, 5, "y", 1);
    expect(computerBoard.receiveAttack(4, 7)).toBe(true);
  });
  it("Computer's ships are all sunk.", () => {
    let computerBoard = computer.getBoard();
    computerBoard.placeShip(4, 5, "y", 1);
    computerBoard.placeShip(3, 4, "x", 2);

    computerBoard.receiveAttack(4, 5);
    computerBoard.receiveAttack(4, 6);
    computerBoard.receiveAttack(4, 7);
    computerBoard.receiveAttack(4, 8);
    computerBoard.receiveAttack(4, 9);

    computerBoard.receiveAttack(3, 4);
    computerBoard.receiveAttack(4, 4);
    computerBoard.receiveAttack(5, 4);
    computerBoard.receiveAttack(6, 4);

    expect(computerBoard.allSunk()).toBe(true);
  });
});

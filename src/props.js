function Ship() {
  let length = 0;
  let axis = "";
  let coordinates = Array(2);
  let timesHit = 0;
  let type = -1;
  const getType = () => type;
  const setType = (t) => (type = t);
  const getLength = () => length;
  const setLength = (len) => (length = len);
  const getAxis = () => axis;
  const setAxis = (ax) => (axis = ax);
  const getCoordinates = () => coordinates;
  const setCoordinates = (x, y) => (coordinates = [x, y]);
  const getTimesHit = () => timesHit;
  const hit = () => timesHit++;
  const isSunk = () => {
    if (length - getTimesHit() != 0) {
      return false;
    } else {
      return true;
    }
  };
  return {
    getType,
    setType,
    getLength,
    setLength,
    getAxis,
    setAxis,
    getCoordinates,
    setCoordinates,
    getTimesHit,
    hit,
    isSunk,
  };
}

function Gameboard() {
  let ships = [];
  let board = new Array(10);
  for (let i = 0; i < board.length; i++) {
    board[i] = [];
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board[i][j] = false;
    }
  }
  let attackedAreas = new Array(10);
  for (let i = 0; i < attackedAreas.length; i++) {
    attackedAreas[i] = [];
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      attackedAreas[i][j] = false;
    }
  }
  const getShips = () => ships;
  const setShips = (myShips) => (ships = myShips);
  const getBoard = () => board;
  const getAttackedAreas = () => attackedAreas;
  const placeShip = (x, y, axis, type) => {
    // Ships when placed on x axis are going to the RIGHT of the origin.
    // Ships when placed on y axis are going to the BOTTOM of the origin.
    let ship = Ship();
    ship.setCoordinates(x, y);
    let len = 0;
    if (type === 1) {
      ship.setLength(5);
      ship.setType(1);
      len = 5;
    } else if (type === 2) {
      ship.setLength(4);
      ship.setType(2);
      len = 4;
    } else if (type === 3) {
      ship.setLength(3);
      ship.setType(3);
      len = 3;
    } else if (type === 4) {
      ship.setLength(3);
      ship.setType(4);
      len = 3;
    } else if (type === 5) {
      ship.setLength(2);
      ship.setType(5);
      len = 2;
    }
    if (axis === "x") {
      ship.setAxis("x");
      if (x + len > 10) {
        return false;
      }
      for (let i = x; i < x + len; i++) {
        if (board[i][y] === true) {
          return false;
        }
      }
      for (let i = x; i < x + len; i++) {
        board[i][y] = true;
      }
    } else if (axis === "y") {
      ship.setAxis("y");
      if (y + len > 10) {
        return false;
      }
      for (let i = y; i < y + len; i++) {
        if (board[x][i] === true) {
          return false;
        }
      }
      for (let i = y; i < y + len; i++) {
        board[x][i] = true;
      }
    }
    ships.push(ship);
    setShips(ships);
    return true;
  };
  const receiveAttack = (x, y) => {
    // returns true if the attack got a ship, returns false if it didn't.
    if (attackedAreas[x][y] === false) {
      attackedAreas[x][y] = true;
      for (let i = 0; i < ships.length; i++) {
        let len = ships[i].getLength();
        let ax = ships[i].getAxis();
        let origin = ships[i].getCoordinates();
        if (ax === "x") {
          if (y === origin[1] && x >= origin[0] && x < origin[0] + len) {
            ships[i].hit();
            return true;
          }
        } else if (ax === "y") {
          if (x === origin[0] && y >= origin[1] && y < origin[1] + len) {
            ships[i].hit();
            return true;
          }
        }
      }
    }
    return false;
  };
  const printAnySunk = () => {
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].isSunk() === true) {
        console.log("ship " + i + " has sunk!");
      }
    }
  };
  const allSunk = () => {
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].isSunk() === false) {
        return false;
      }
    }
    return true;
  };
  return {
    getShips,
    setShips,
    receiveAttack,
    getBoard,
    getAttackedAreas,
    placeShip,
    printAnySunk,
    allSunk,
  };
}

function Player() {
  let board;
  const getBoard = () => (board = Gameboard());
  return {
    getBoard,
  };
}

module.exports = { Ship, Gameboard, Player };

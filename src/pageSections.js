let { Ship, Gameboard, Player } = require("./props.js");

export function getFont() {
  const s = document.createElement("style");
  s.textContent =
    "@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');";
  return s;
}

export function bg() {
  const bg = document.createElement("img");
  // Image by Kym MacKinnon on Unsplash
  bg.src =
    "https://images.unsplash.com/photo-1599239663833-4c1cdc22892a?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  bg.style.height = "auto";
  bg.style.width = "100vw";
  bg.style.position = "fixed";
  return bg;
}

export function title() {
  const title = document.createElement("div");
  title.textContent = "Battleship";
  title.style.position = "absolute";
  title.style.left = "45vw";
  title.style.top = "5vh";
  title.style.fontFamily = "'Poppins', sans-serif";
  title.style.fontWeight = "200";
  title.style.fontStyle = "normal";
  title.style.fontSize = "30px";
  return title;
}

export function axis() {
  const axis = document.createElement("button");
  axis.classList.add("axis");
  axis.textContent = "Axis: Y"; // This is how it's actually on screen
  let onYAxis = true;
  axis.addEventListener("click", function () {
    if (onYAxis) {
      axis.textContent = "Axis: X";
      onYAxis = false;
    } else {
      axis.textContent = "Axis: Y";
      onYAxis = true;
    }
  });
  axis.style.position = "absolute";
  axis.style.left = "45.5vw";
  axis.style.top = "12vh";
  axis.style.background = "transparent";
  axis.style.border = "1px solid black";
  axis.style.borderRadius = "10px";
  axis.style.height = "25px";
  return axis;
}

let numberOfPlayerShips = 0;
let battleIsOn = false;
let isYourTurn = true;

export function playGame() {
  const playButton = document.createElement("button");
  playButton.classList.add("play");
  playButton.textContent = "Battle!";
  playButton.addEventListener("click", function () {
    if (numberOfPlayerShips === 5) {
      battleIsOn = true;
      let player = document.querySelector(".player-indicator");
      console.log("isYourTurn:", isYourTurn);
      if (isYourTurn) {
        player.textContent = "Your turn.";
      } else {
        player.textContent = "Computer's turn.";
      }
    } else {
      alert("All of your ships haven't been placed yet. Please place them.");
    }
  });
  playButton.style.position = "absolute";
  playButton.style.left = "50.5vw";
  playButton.style.top = "12vh";
  playButton.style.fontFamily = "'Poppins', sans-serif";
  playButton.style.background = "transparent";
  playButton.style.border = "1px solid black";
  playButton.style.borderRadius = "10px";
  playButton.style.height = "25px";
  return playButton;
}

export function playerIndicator() {
  const player = document.createElement("div");
  player.classList.add("player-indicator");
  player.textContent = "";
  player.style.fontFamily = "'Poppins', sans-serif";
  player.style.position = "absolute";
  player.style.left = "47.5vw";
  player.style.top = "16.5vh";
  return player;
}

const playerGameboard = Gameboard();

export function renderPlayerGameboard() {
  const board = document.createElement("div");
  board.classList.add("player-board");
  board.style.display = "inline-grid";
  board.style.gridTemplate = "repeat(10, 50px) / repeat(10, 50px)";
  board.style.border = "1px solid black";
  board.style.position = "absolute";
  board.style.bottom = "10vh";
  board.style.left = "10vw";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const piece = document.createElement("div");
      piece.classList.add("player-piece");
      piece.style.height = "50px";
      piece.style.width = "50px";
      piece.style.border = "1px solid black";
      piece.addEventListener("click", function () {
        // Only do this when the number of player ships hasn't reached 5...
        // otherwise, you're making unnecessary divs.
        if (!battleIsOn) {
          if (numberOfPlayerShips < 5) {
            const shipSpace = document.createElement("div");
            let axis = document.querySelector(".axis");
            if (numberOfPlayerShips === 0) {
              console.log("you clicked " + i + "," + j);
              console.log("axis:", axis);
              if (axis.textContent === "Axis: Y") {
                if (playerGameboard.placeShip(i, j, "x", 1)) {
                  // actually the y axis on the screen!
                  shipSpace.style.height = "250px";
                  shipSpace.style.width = "50px";
                } else return;
              } else if (axis.textContent === "Axis: X") {
                if (playerGameboard.placeShip(i, j, "y", 1)) {
                  // actually the x axis on the screen!
                  shipSpace.style.height = "50px";
                  shipSpace.style.width = "250px";
                } else return;
              }
              shipSpace.style.background = "#ff6961"; // pastel red
            } else if (numberOfPlayerShips === 1) {
              console.log("axis:", axis);
              if (axis.textContent === "Axis: Y") {
                if (playerGameboard.placeShip(i, j, "x", 2)) {
                  // actually the y axis on the screen!
                  shipSpace.style.height = "200px";
                  shipSpace.style.width = "50px";
                } else return;
              } else if (axis.textContent === "Axis: X") {
                if (playerGameboard.placeShip(i, j, "y", 2)) {
                  // actually the x axis on the screen!
                  shipSpace.style.height = "50px";
                  shipSpace.style.width = "200px";
                } else return;
              }
              shipSpace.style.background = "#ff964f"; // pastel orange
            } else if (numberOfPlayerShips === 2) {
              if (axis.textContent === "Axis: Y") {
                if (playerGameboard.placeShip(i, j, "x", 3)) {
                  // actually the y axis on the screen!
                  shipSpace.style.height = "150px";
                  shipSpace.style.width = "50px";
                } else return;
              } else if (axis.textContent === "Axis: X") {
                if (playerGameboard.placeShip(i, j, "y", 3)) {
                  // actually the x axis on the screen!
                  shipSpace.style.height = "50px";
                  shipSpace.style.width = "150px";
                } else return;
              }
              shipSpace.style.background = "#fdfd96"; // pastel yellow
            } else if (numberOfPlayerShips === 3) {
              if (axis.textContent === "Axis: Y") {
                if (playerGameboard.placeShip(i, j, "x", 4)) {
                  // actually the y axis on the screen!
                  shipSpace.style.height = "150px";
                  shipSpace.style.width = "50px";
                } else return;
              } else if (axis.textContent === "Axis: X") {
                if (playerGameboard.placeShip(i, j, "y", 4)) {
                  // actually the x axis on the screen!
                  shipSpace.style.height = "50px";
                  shipSpace.style.width = "150px";
                } else return;
              }
              shipSpace.style.background = "#77dd77"; // pastel green
            } else if (numberOfPlayerShips === 4) {
              if (axis.textContent === "Axis: Y") {
                if (playerGameboard.placeShip(i, j, "x", 5)) {
                  // actually the y axis on the screen!
                  shipSpace.style.height = "100px";
                  shipSpace.style.width = "50px";
                } else return;
              } else if (axis.textContent === "Axis: X") {
                if (playerGameboard.placeShip(i, j, "y", 5)) {
                  // actually the x axis on the screen!
                  shipSpace.style.height = "50px";
                  shipSpace.style.width = "100px";
                } else return;
              }
              shipSpace.style.background = "#8cd3db"; // pastel blue
            }
            shipSpace.style.borderRadius = "25px";
            piece.appendChild(shipSpace);
            numberOfPlayerShips++;
          }
        }
      });
      board.appendChild(piece);
    }
  }
  return board;
}

export function renderComputerGameboard() {
  const gameboard = Gameboard();
  for (let i = 1; i <= 5; i++) {
    while (true) {
      let randomX = Math.floor(Math.random() * 10);
      let randomY = Math.floor(Math.random() * 10);
      let xOrYAxis = Math.floor(Math.random() * 2);
      let axis = "";
      console.log("trying " + randomX + "," + randomY + " on " + xOrYAxis);
      if (xOrYAxis === 0) axis = "x";
      if (xOrYAxis === 1) axis = "y";
      if (gameboard.placeShip(randomX, randomY, axis, i) === true) {
        console.log("painting " + randomX + "," + randomY);
        break;
      }
    }
  }

  const board = document.createElement("div");
  board.style.display = "inline-grid";
  board.style.gridTemplate = "repeat(10, 50px) / repeat(10, 50px)";
  board.style.border = "1px solid black";
  board.style.position = "absolute";
  board.style.bottom = "10vh";
  board.style.right = "10vw";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const piece = document.createElement("div");
      piece.style.height = "50px";
      piece.style.width = "50px";
      piece.style.border = "1px solid black";
      piece.addEventListener("click", function () {
        console.log("clicked!");
        if (battleIsOn) {
          if (gameboard.getAttackedAreas()[i][j] === false) {
            console.log("shot!");
            const shot = document.createElement("div");
            //shot.style.zIndex = "2";
            shot.style.height = "50px";
            shot.style.width = "50px";

            shot.style.borderRadius = "25px";
            shot.style.position = "absolute";
            shot.style.bottom = "calc(61.8vh - calc(50px * " + i + "))";
            shot.style.right = "calc(31.25vw - calc(50px * " + j + "))";
            if (gameboard.receiveAttack(i, j)) {
              console.log("hit at " + i + "," + j + "!");
              shot.style.background = "lightgreen";
              shot.style.transform = "scale(0.5)";
              gameboard.printAnySunk();
            } else {
              console.log("no hit at " + i + "," + j);
              shot.style.background = "black";
              shot.style.transform = "scale(0.5)";
            }
            if (gameboard.allSunk()) {
              alert("You won! Refresh the game to restart.");
            }
            piece.appendChild(shot);

            let player = document.querySelector(".player-indicator");
            if (isYourTurn) {
              isYourTurn = false;
            }
            console.log("isYourTurn:", isYourTurn);
            if (!isYourTurn) {
              player.textContent = "CP's turn.";
              setTimeout(function () {
                // setTimeout executes your function AFTER the timer.
                console.log("shot!");
                let playerPiece = document.querySelector(".player-piece");
                const shot = document.createElement("div");
                shot.style.height = "50px";
                shot.style.width = "50px";
                shot.style.borderRadius = "25px";
                shot.style.position = "absolute";
                let spotFound = false;
                while (!spotFound) {
                  let randomX = Math.floor(Math.random() * 10);
                  let randomY = Math.floor(Math.random() * 10);
                  if (
                    playerGameboard.getAttackedAreas()[randomX][randomY] ===
                    false
                  ) {
                    spotFound = true;
                    if (playerGameboard.receiveAttack(randomX, randomY)) {
                      console.log("hit a ship at " + randomX + "," + randomY);
                      shot.style.background = "lightgreen";
                      shot.style.transform = "scale(0.5)";
                    } else {
                      console.log("not hit at " + randomX + "," + randomY);
                      shot.style.background = "black";
                      shot.style.transform = "scale(0.5)";
                    }
                    if (playerGameboard.allSunk()) {
                      alert("You lose! Refresh the game to restart.");
                    }
                    shot.style.bottom =
                      "calc(61.8vh - calc(50px * " + randomX + "))";
                    shot.style.left = "calc(50px * " + randomY + ")";
                  }
                }
                playerPiece.append(shot);
                isYourTurn = true;
                player.textContent = "Your turn.";
              }, 250);
            }
          } else {
            alert("This area is already attacked. Choose a different one.");
          }
        }
      });
      if (gameboard.getBoard()[i][j] === true) {
        console.log("get ships length:", gameboard.getShips().length);
        for (let k = 0; k < gameboard.getShips().length; k++) {
          const ship = gameboard.getShips()[k];
          console.log("ship:", ship);
          const currentCoordinate = [i, j];
          console.log(
            "ship.getCoordinates():",
            ship.getCoordinates(),
            "currentCoordinate:",
            currentCoordinate
          );
          const shipSpot = document.createElement("div");
          //shipSpot.style.zIndex = "1";
          //shipSpot.style.position = "relative";
          let arraysAreEqual = true;
          for (let i = 0; i < ship.getCoordinates().length; i++) {
            if (ship.getCoordinates()[i] != currentCoordinate[i]) {
              arraysAreEqual = false;
            }
          }
          if (arraysAreEqual) {
            console.log("they're equal");
            if (ship.getType() === 1) {
              if (ship.getAxis() === "x") {
                // On the screen, it's actually the y axis.
                shipSpot.style.height = "250px";
                shipSpot.style.width = "50px";
              } else if (ship.getAxis() === "y") {
                shipSpot.style.height = "50px";
                shipSpot.style.width = "250px";
              }
              shipSpot.style.background = "transparent";
            } else if (ship.getType() === 2) {
              if (ship.getAxis() === "x") {
                // On the screen, it's actually the y axis.
                shipSpot.style.height = "200px";
                shipSpot.style.width = "50px";
              } else if (ship.getAxis() === "y") {
                shipSpot.style.height = "50px";
                shipSpot.style.width = "200px";
              }
              shipSpot.style.background = "transparent";
            } else if (ship.getType() === 3 || ship.getType() === 4) {
              if (ship.getAxis() === "x") {
                // On the screen, it's actually the y axis.
                shipSpot.style.height = "150px";
                shipSpot.style.width = "50px";
              } else if (ship.getAxis() === "y") {
                shipSpot.style.height = "50px";
                shipSpot.style.width = "150px";
              }
              if (ship.getType() === 3) {
                shipSpot.style.background = "transparent";
              } else if (ship.getType() === 4) {
                shipSpot.style.background = "transparent";
              }
            } else if (ship.getType() === 5) {
              if (ship.getAxis() === "x") {
                // On the screen, it's actually the y axis.
                shipSpot.style.height = "100px";
                shipSpot.style.width = "50px";
              } else if (ship.getAxis() === "y") {
                shipSpot.style.height = "50px";
                shipSpot.style.width = "100px";
              }
              shipSpot.style.background = "transparent";
            }
            shipSpot.style.borderRadius = "25px";
            piece.appendChild(shipSpot);
          }
        }
      }
      board.appendChild(piece);
    }
  }
  return board;
}

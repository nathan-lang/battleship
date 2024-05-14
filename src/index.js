let {
  getFont,
  bg,
  title,
  axis,
  playGame,
  playerIndicator,
  renderPlayerGameboard,
  renderComputerGameboard,
} = require("./pageSections.js");

document.body.style.margin = "0px";
document.body.appendChild(getFont());
document.body.appendChild(bg());
document.body.appendChild(title());
document.body.appendChild(axis());
document.body.appendChild(playGame());
document.body.appendChild(playerIndicator());
document.body.appendChild(renderPlayerGameboard());
document.body.appendChild(renderComputerGameboard());

import createGameboard from "./Gameboard.js";
import createGameFlow from "./Gameflow.js";

const createPlayer = (num, marker) => ({
  player: num,
  marker,
});

const gameController = (function () {
  const { insertInGameboard, clearGameboard, showBoard } = createGameboard;
  const { appendFlow, getLastPlay } = createGameFlow;

  const players = [createPlayer(1, "X"), createPlayer(2, "O")];
  let playerTurn = players[0];

  const switchPlayerTurn = () => {
    playerTurn = getLastPlay().turn === 1 ? players[1] : players[0];
  };

  const startRound = () => {
    clearGameboard();
    // eslint-disable-next-line prefer-destructuring
    playerTurn = players[0];
  };

  const playTurn = (row, col) => {
    const inSerted = insertInGameboard(playerTurn.player, row, col);
    if (inSerted) {
      appendFlow(playerTurn.player, row, col);
      switchPlayerTurn();
    }
    showBoard();
  };

  return { startRound, playTurn };
})();

export default gameController;

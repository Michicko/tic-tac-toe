import createGameboard from "./Gameboard.js";
import createGameFlow from "./Gameflow.js";

const createPlayer = (num, marker) => ({
  player: num,
  marker,
});

const gameController = (function () {
  const {
    insertInGameboard,
    clearGameboard,
    showBoard,
    isGameboardFull,
    getWinner,
  } = createGameboard;
  const { appendFlow, getLastPlay, clearFlow } = createGameFlow;

  const players = [createPlayer(1, "X"), createPlayer(2, "O")];
  let playerTurn = players[0];

  const switchPlayerTurn = () => {
    playerTurn = getLastPlay().turn === 1 ? players[1] : players[0];
  };

  const startRound = () => {
    clearGameboard();
    // eslint-disable-next-line prefer-destructuring
    playerTurn = players[0];
    clearFlow();
  };

  const startNewRound = () => {
    startRound();

  }

  const printMessage = (message) => {
    console.log(message);
  };

  const playTurn = (row, col) => {
    let winner = getWinner();
    let gameboardIsFull = isGameboardFull();

    if (gameboardIsFull || winner) {
      if (gameboardIsFull && !winner) {
        printMessage("Game drawn!");
        return;
      }

      if (winner) {
        printMessage(
          `Player ${winner} wins!!, You can't play gain, restart game`
        );
        return;
      }
    }

    const inSerted = insertInGameboard(playerTurn.player, row, col);

    if (inSerted) {
      appendFlow(playerTurn.player, row, col);
      switchPlayerTurn();
    }

    gameboardIsFull = isGameboardFull();
    winner = getWinner();

    if (winner) {
      printMessage(`Player ${winner} wins!!`);
    }

    if (gameboardIsFull) {
      printMessage("Draw game!");
    }

    showBoard();
  };

  playTurn(0, 0);
  playTurn(0, 2);
  playTurn(1, 1);
  playTurn(0, 1);
  playTurn(2, 2);
  playTurn(2, 0);
  playTurn(1, 0);

  return { startRound, playTurn };
})();

export default gameController;

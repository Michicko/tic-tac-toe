import displayController from "./DisplayController.js";
import createGameboard from "./Gameboard.js";
import createGameFlow from "./Gameflow.js";

const gameController = (function () {
  const {
    insertInGameboard,
    clearGameboard,
    showBoard,
    isGameboardFull,
    getWinner,
  } = createGameboard;
  const { appendFlow, getLastPlay, clearFlow } = createGameFlow;
  const { setPlayerTurnUI, showAlert } = displayController;

  const players = [];
  let playerTurn = players[0];

  const createPlayer = (name, num, marker) => ({
    name,
    player: num,
    marker,
  });

  const createPlayers = (name, playerNum, marker) => {
    const newPlayer = createPlayer(name, playerNum, marker);
    if (players.length < 2) {
      players.push(newPlayer);
    }
  };

  const switchPlayerTurn = () => {
    playerTurn = getLastPlay().turn === 1 ? players[1] : players[0];
  };

  const startRound = () => {
    clearGameboard();
    // eslint-disable-next-line prefer-destructuring
    playerTurn = players[0];
    setPlayerTurnUI(playerTurn.player);
    clearFlow();
    showBoard();
  };

  const playTurn = (row, col) => {
    const inSerted = insertInGameboard(playerTurn.player, row, col);

    if (inSerted) {
      appendFlow(playerTurn.player, row, col);
      switchPlayerTurn();
      setPlayerTurnUI(playerTurn.player);
    }

    const winner = getWinner();
    const gameIsFull = isGameboardFull();

    if (winner) {
      showAlert(`Player ${getWinner()} Wins!!`);
    }

    if (gameIsFull && !winner) {
      showAlert(`Tie Game!!`);
    }

    showBoard();
  };

  return { startRound, playTurn, createPlayers };
})();

export default gameController;

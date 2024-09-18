const createGameboard = (function () {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const printBoard = () => {
    console.log(board);
  };

  const printBoardToString = () => {
    let str = "";
    for (let row = 0; row < 3; row++) {
      const rowSTring = `(${board[row].join(" ")}),`;
      str += rowSTring;
    }
    return str;
  };

  const isCellFree = (row, col) => {
    return board[row][col] === 0;
  };

  const isBoardFull = () => {
    for (let row = 0; row < 3; row++) {
      for (col = 0; col < 3; col++) {
        if (isCellFree(row, col)) return false;
      }
    }
    return true;
  };

  const placePlayerValueOnBoard = (value, row, col) => {
    if (row > board.length || col > board.length) return;
    if (!isCellFree(row, col)) return;
    board[row][col] = value;
  };

  const getDiagonalAxis = (direction) => {
    // get filled items on the diagonal axis
    let filledAxis = board
      .map((el, i) => {
        if (direction === "right") {
          return el[board.length - 1 - i];
        } else {
          return el[i];
        }
      })
      .filter((el) => el !== 0);

    return filledAxis;
  };

  const isMatchingDiagonalAxis = () => {
    // check for matching 3s on the left diagonal axis
    let leftDiagonalAxis = getDiagonalAxis("left");

    if (leftDiagonalAxis.length > 2) {
      return leftDiagonalAxis.every((el) => el === leftDiagonalAxis[0]);
    }

    // check for matching 3s on the right diagonal axis
    let rightDiagonalAxis = getDiagonalAxis("right");

    if (rightDiagonalAxis.length > 2) {
      return rightDiagonalAxis.every((el) => el === rightDiagonalAxis[0]);
    }
  };

  const isMatchingHorizontalAxis = () => {
    // check for matching 3s on horizontal axis
    for (let row = 0; row < 3; row++) {
      if (!isCellFree(row, 0) && !isCellFree(row, 1) && !isCellFree(row, 2)) {
        return (
          board[row][0] === board[row][1] &&
          board[row][0] === board[row][2] &&
          board[row][1] === board[row][2]
        );
      }
    }
  };

  const isMatchingVerticalAxis = () => {
    // check for matching 3s on vertical axis
    for (let row = 0; row < 3; row++) {
      if (!isCellFree(0, row) && !isCellFree(1, row) && !isCellFree(2, row)) {
        return (
          board[0][row] === board[1][row] &&
          board[0][row] === board[2][row] &&
          board[1][row] === board[2][row]
        );
      }
    }
  };

  const clearBoard = () => {
    for (let row = 0; row < 3; row++) {
      for (col = 0; col < 3; col++) {
        board[row][col].push(0);
      }
    }
  };

  return {
    printBoard,
    placePlayerValueOnBoard,
    isBoardFull,
    clearBoard,
    printBoardToString,
    isMatchingDiagonalAxis,
    isMatchingHorizontalAxis,
    isMatchingVerticalAxis,
  };
})();

function createPlayer(value, marker) {
  return {
    value,
    marker,
  };
}

const gameController = (function () {
  const game = createGameboard;
  game.printBoard();
  const players = [createPlayer(1, "X"), createPlayer(2, "O")];

  let currentPlayer = players[0];

  const switchPlayerTurn = () =>
    currentPlayer === players[0] ? players[1] : players[0];

  let player1Pos = "";
  let player2Pos = "";

  const playRound = () => {
    let row;
    let col;
    let pos;

    do {
      console.log(
        `Player ${currentPlayer.value} Turn: ${currentPlayer.marker}`
      );
      if (currentPlayer.value === 1) {
        player1Pos = prompt(
          `${game.printBoardToString()} Player ${
            currentPlayer.value
          } turn => row,col: `
        );
        player2Pos = null;
        pos = player1Pos.split(",");
        row = +pos[0];
        col = +pos[1];
      } else {
        player2Pos = prompt(
          `${game.printBoardToString()} Player ${
            currentPlayer.value
          } turn => row,col: `
        );
        player1Pos = null;
        pos = player2Pos.split(",");
        row = +pos[0];
        col = +pos[1];
      }

      game.placePlayerValueOnBoard(currentPlayer.value, row, col);
      currentPlayer = switchPlayerTurn();
      game.printBoard();
    } while (
      !game.isBoardFull() &&
      !game.isMatchingDiagonalAxis() &&
      !game.isMatchingHorizontalAxis() &&
      !game.isMatchingVerticalAxis()
    );

    if (
      game.isMatchingDiagonalAxis() ||
      game.isMatchingHorizontalAxis() ||
      game.isMatchingVerticalAxis()
    ) {
      console.log(`Player ${currentPlayer.value} Wins!`);
    }

    if (game.isBoardFull()) {
      console.log(`Draw! Play again`);
    }
  };

  playRound();
})();

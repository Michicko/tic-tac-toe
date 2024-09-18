const createGameboard = (function () {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

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

  const getHorizontalVerticalAxis = (direction) => {
    board.forEach((_el, row) => {
      if (
        direction === "horizontal" &&
        !isCellFree(row, 0) &&
        !isCellFree(row, 1) &&
        !isCellFree(row, 2)
      ) {
        return (
          board[row][0] === board[row][1] &&
          board[row][0] === board[row][2] &&
          board[row][1] === board[row][2]
        );
      } else if (
        direction === "vertical" &&
        !isCellFree(0, row) &&
        !isCellFree(1, row) &&
        !isCellFree(2, row)
      ) {
        return (
          board[0][row] === board[1][row] &&
          board[0][row] === board[2][row] &&
          board[1][row] === board[2][row]
        );
      }
    });
  };

  const isMatchingHorizontalAxis = () => {
    return getHorizontalVerticalAxis("horizontal");
  };

  const isMatchingVerticalAxis = () => {
    return getHorizontalVerticalAxis("vertical");
  };

  const isMatchingDiagonalAxis = () => {
    const isEqualThrees = (axis) => {
      return axis.every((el) => el === axis[0]);
    };

    // check for matching 3s on the left diagonal axis
    let leftDiagonalAxis = getDiagonalAxis("left");

    if (leftDiagonalAxis.length > 2) {
      return isEqualThrees(leftDiagonalAxis);
    }

    // check for matching 3s on the right diagonal axis
    let rightDiagonalAxis = getDiagonalAxis("right");

    if (rightDiagonalAxis.length > 2) {
      return isEqualThrees(rightDiagonalAxis);
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
    placePlayerValueOnBoard,
    isBoardFull,
    clearBoard,
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

const gameController = function () {
  const game = createGameboard;

  const players = [createPlayer(1, "X"), createPlayer(2, "O")];

  let currentPlayer = players[0];

  const switchPlayerTurn = () =>
    currentPlayer === players[0] ? players[1] : players[0];
};

const displayController = (function () {
  const playerFormDialog = document.querySelector("#player-form-dialog");
  const openPlayerFormDialogBtn = document.querySelector(".rename-player-btn");
  const closePlayerFormDialogBtn = document.querySelector(".cancel-btn");

  openPlayerFormDialogBtn.addEventListener("click", () => {
    playerFormDialog.showModal();
  });

  closePlayerFormDialogBtn.addEventListener("click", () => {
    playerFormDialog.close();
  });

  playerFormDialog.showModal();
})();

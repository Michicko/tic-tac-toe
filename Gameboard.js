const createGameboard = (function () {
  let gameboard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const insertInGameboard = (value, row, col) => {
    let inSerted = false;
    if (gameboard[row][col]) return inSerted;
    gameboard[row][col] = value;
    inSerted = true;
    return inSerted;
  };

  const clearGameboard = () => {
    gameboard = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  };

  const isGameboardFull = () => {
    let isFull = false;
    gameboard.forEach((row) => {
      isFull = row.every((col) => col > 0);
    });
    return isFull;
  };

  const isEqual3s = (row) => {
    if (row[0] < 1 || row[1] < 1 || row[2] < 1) return false;
    return row[0] === row[1] && row[1] === row[2];
  };

  const getWinner = (board = gameboard) => {
    let winner;

    // check horizontal
    board.forEach((row) => {
      if (isEqual3s(row)) {
        // eslint-disable-next-line prefer-destructuring
        winner = row[0];
      }
    });

    // check vertical
    for (let i = 0; i < board.length; i += 1) {
      const row = [board[0][i], board[1][i], board[2][i]];
      if (isEqual3s(row)) {
        // eslint-disable-next-line prefer-destructuring
        winner = row[0];
      }
    }

    // check left diagonal
    const leftDiagonal = [board[0][0], board[1][1], board[2][2]];
    if (isEqual3s(leftDiagonal)) {
      // eslint-disable-next-line prefer-destructuring
      winner = leftDiagonal[0];
    }

    // check right diagonal
    const rightDiagonal = [board[0][2], board[1][1], board[2][0]];
    if (isEqual3s(rightDiagonal)) {
      // eslint-disable-next-line prefer-destructuring
      winner = rightDiagonal[0];
    }

    return winner;
  };

  const showBoard = () => {
    console.log(gameboard);
  };

  return {
    insertInGameboard,
    clearGameboard,
    showBoard,
    isGameboardFull,
    getWinner,
  };
})();

export default createGameboard;

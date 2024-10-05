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

  const showBoard = () => {
    console.log(gameboard);
  };

  return {
    insertInGameboard,
    clearGameboard,
    showBoard,
    isGameboardFull,
  };
})();

export default createGameboard;

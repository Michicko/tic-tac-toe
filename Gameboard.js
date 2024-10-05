const createGameboard = (function () {
  const gameboard = [
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
    gameboard.forEach((el) => {
      let i = 0;
      while (i < el.length) {
        el[i] = 0;
        i += 1;
      }
    });
  };

  const showBoard = () => {
    console.log(gameboard);
  };

  return { gameboard, insertInGameboard, clearGameboard, showBoard };
})();

export default createGameboard;

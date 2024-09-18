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
    for (let row = 0; row < board.length; row++) {
      for (col = 0; col < board[row].length; col++) {
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

  const getBoard = () => {
    return Array.from(board);
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
    for (let row = 0; row < board.length; row++) {
      for (col = 0; col < board[row].length; col++) {
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
    getBoard,
  };
})();

function createPlayer(name, playerNumber, marker) {
  return {
    name,
    playerNumber,
    marker,
  };
}

const gameController = (function () {
  const game = createGameboard;
  const player1 = createPlayer("player 1", 1, "X");
  const player2 = createPlayer("player 2", 2, "O");
  const players = [player1, player2];

  let currentPlayer = players[0];

  const setPlayerName = (name, playerNumber) => {
    const playerObj = players[playerNumber - 1];
    playerObj.name = name || `player ${playerNumber}`;
  };

  const getCurrentPlayerTurn = () => currentPlayer;

  const switchPlayerTurn = () =>
    currentPlayer === players[0] ? players[1] : players[0];

  const playRound = () => {};

  const getPlayerNames = () => {
    const playerNames = players.map((player) => {
      return player.name;
    });
    return playerNames;
  };

  const getBoard = () => {
    return game.getBoard();
  };

  return {
    getCurrentPlayerTurn,
    setPlayerName,
    getPlayerNames,
    getBoard,
  };
})();

const displayController = (function () {
  const playerFormDialog = document.querySelector("#player-form-dialog");
  const openPlayerFormDialogBtn = document.querySelector(".rename-player-btn");
  const closePlayerFormDialogBtn = document.querySelector(".cancel-btn");
  const player1Input = document.querySelector("#player-1");
  const player2Input = document.querySelector("#player-2");
  const player1Element = document.querySelector(".player-name-1");
  const player2Element = document.querySelector(".player-name-2");
  const playerForm = document.querySelector(".player-form");
  const gameboardElement = document.querySelector(".gameboard");

  const game = gameController;

  const playerTurn = game.getCurrentPlayerTurn();

  openPlayerFormDialogBtn.addEventListener("click", () => {
    playerFormDialog.showModal();
  });

  closePlayerFormDialogBtn.addEventListener("click", () => {
    playerFormDialog.close();
  });

  const updatePlayerNamesOnDom = () => {
    player1Element.textContent = game.getPlayerNames()[0];
    player2Element.textContent = game.getPlayerNames()[1];
  };

  // Change the player name
  playerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    game.setPlayerName(player1Input.value, 1);
    game.setPlayerName(player2Input.value, 2);

    player1Input.value = "";
    player2Input.value = "";
    updatePlayerNamesOnDom();
    playerFormDialog.close();
  });

  const displayBoard = () => {
    gameboardElement.innerHTML = "";
    const board = Array.from(game.getBoard());
    const trs = [];
    
    const createTd = (content) => {
      const td = document.createElement('td');
      td.textContent = content;
      return td;
    }

    for (let row = 0; row < board.length; row++) {
      const tr = document.createElement('tr');
      const col_array = [];
      for (col = 0; col < board[row].length; col++) {
        const el = board[row][col];
        const td = el === 1 ? createTd('X') : el === 2 ? createTd('O') : createTd('');
        col_array.push(td);
      }
      tr.append(...col_array);
      trs.push(tr);
    }
    
    gameboardElement.append(...trs);
  };

  displayBoard();
  playerFormDialog.showModal();
})();

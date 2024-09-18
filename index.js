const createGameboard = (function () {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const isCellFree = (row, col) => {
    return board[row][col] === 0;
  };

  const printBoard = () => {
    console.log(board);
  };

  const isBoardFull = () => {
    for (let row = 0; row < board.length; row++) {
      for (col = 0; col < board[row].length; col++) {
        if (isCellFree(row, col)) return false;
      }
    }
    return true;
  };

  const placePlayerNumberOnBoard = (value, row, col) => {
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

  const checkMatchingRow = (array) => {
    const matchingRow = array.find((el) => !el.includes(0));
    if (matchingRow && matchingRow.length > 2) {
      return matchingRow.every((el) => el === matchingRow[0]);
    }
  };

  const isMatchingHorizontalAxis = () => {
    return checkMatchingRow(board);
  };

  const isMatchingVerticalAxis = () => {
    let horizontalAxis = [];
    // convert vertical to horizontal
    for (let row = 0; row < board.length; row++) {
      let rw = [];
      rw.push(board[0][row], board[1][row], board[2][row]);
      horizontalAxis.push(rw);
    }
    return checkMatchingRow(horizontalAxis);
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
    placePlayerNumberOnBoard,
    isBoardFull,
    clearBoard,
    isMatchingDiagonalAxis,
    isMatchingHorizontalAxis,
    isMatchingVerticalAxis,
    getBoard,
    printBoard,
  };
})();

function createPlayer(name, playerNumber, marker) {
  return {
    name,
    playerNumber,
    marker,
  };
}

const createGameFlow = (function () {
  const gameFlow = [];

  const addFlow = (player, row, col) => {
    gameFlow.push({
      player,
      row,
      col,
    });
  };

  const getGameFLow = () => gameFlow;

  const getLastPlay = () => gameFlow[gameFlow.length - 1];

  const clearFlow = () => {
    gameFlow.length = 0;
  };

  return {
    addFlow,
    clearFlow,
    getGameFLow,
    getLastPlay,
  };
})();

const gameController = (function () {
  const game = createGameboard;
  const gameFlow = createGameFlow;

  const players = [
    createPlayer("player 1", 1, "X"),
    createPlayer("player 2", 2, "O"),
  ];

  const setPlayerName = (name, playerNumber) => {
    const playerObj = players[playerNumber - 1];
    playerObj.name = name || `player ${playerNumber}`;
  };

  const getPlayerNames = () => {
    const playerNames = players.map((player) => {
      return player.name;
    });
    return playerNames;
  };

  let currentPlayer = players[0];

  const switchPlayerTurn = (prevPlayer) =>
    (currentPlayer = prevPlayer.playerNumber === 1 ? players[1] : players[0]);

  const playTurn = (row, col) => {
    game.placePlayerNumberOnBoard(currentPlayer.playerNumber, row, col);
    gameFlow.addFlow(currentPlayer, row, col);
    playRound();
  };

  const playRound = () => {
    const lastPlay = gameFlow.getLastPlay();
    game.printBoard();

    if (
      !game.isBoardFull() &&
      !game.isMatchingDiagonalAxis() &&
      !game.isMatchingHorizontalAxis() &&
      !game.isMatchingVerticalAxis()
    ) {
      if (lastPlay) {
        switchPlayerTurn(lastPlay.player);
      }
    }

    if (
      game.isMatchingDiagonalAxis() ||
      game.isMatchingHorizontalAxis() ||
      game.isMatchingVerticalAxis()
    ) {
      console.log(`Player ${lastPlay.player.playerNumber} win!`);
    }

    if (
      game.isBoardFull() &&
      !(
        game.isMatchingDiagonalAxis() ||
        game.isMatchingHorizontalAxis() ||
        game.isMatchingVerticalAxis()
      )
    ) {
      console.log("Draw game. Play again!");
    }
  };

  const getCurrentPlayer = () => currentPlayer;

  playRound();

  return {
    setPlayerName,
    getPlayerNames,
    playTurn,
    getCurrentPlayer,
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
  const gameboard = createGameboard;

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

  const isGameOver = () => {
    return (
      gameboard.isMatchingDiagonalAxis() ||
      gameboard.isMatchingHorizontalAxis() ||
      gameboard.isMatchingVerticalAxis() ||
      gameboard.isBoardFull()
    );
  };

  const updatePlayerTurnIndicator = () => {
    const signals = document.querySelectorAll(".turn-signal");
    signals.forEach((el) => el.classList.remove("show"));
    const player = gameController.getCurrentPlayer();
    signals[player.playerNumber - 1].classList.add("show");
  };

  const handleTdOnclick = (row, col) => {
    if (isGameOver()) return;
    game.playTurn(row, col);

    displayBoard();
    updatePlayerTurnIndicator();
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
    const board = gameboard.getBoard();
    const trs = [];

    const createTd = (content) => {
      const td = document.createElement("td");
      td.textContent = content;
      return td;
    };

    for (let row = 0; row < board.length; row++) {
      const tr = document.createElement("tr");
      const col_array = [];
      for (col = 0; col < board[row].length; col++) {
        const el = board[row][col];
        let i = col;
        const td =
          el === 1 ? createTd("X") : el === 2 ? createTd("O") : createTd("");
        td.addEventListener("click", () => {
          handleTdOnclick(row, i);
        });
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

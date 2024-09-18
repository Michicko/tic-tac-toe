
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
      const td = document.createElement("td");
      td.textContent = content;
      return td;
    };

    const handleTdOnclick = (row, col) => {
      game.playRound(row, col);
      // console.log(game.getCurrentPlayerTurn());
      displayBoard();
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
})

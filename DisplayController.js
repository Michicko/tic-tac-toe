const displayController = (function () {
  const createTd = (content) => {
    const td = document.createElement("td");
    if (content) {
      td.textContent = content;
    }

    return td;
  };

  const displayGameboardUI = (gameboard) => {
    const gameboardUI = document.querySelector("#gameboard");
    gameboardUI.innerHTML = "";

    const board = gameboard.map((row) => {
      const trsArray = row.map((col) => {
        let marker = "";
        if (col === 1) marker = "X";
        if (col === 2) marker = "O";
        const td = createTd(marker);
        return td;
      });
      const tr = document.createElement("tr");
      tr.append(...trsArray);
      return tr;
    });

    gameboardUI.append(...board);
  };

  const setPlayerTurnUI = (playerTurn) => {
    const turns = document.querySelectorAll(".turn");
    turns.forEach((el) => {
      el.classList.remove("current");
    });
    turns[playerTurn - 1].classList.add("current");
  };

  const showAlert = (message) => {
    const alertDialog = document.querySelector("#alert-dialog");
    const text = document.querySelector(".text");
    text.textContent = message;
    alertDialog.showModal();
  };

  return { displayGameboardUI, setPlayerTurnUI, showAlert };
})();

export default displayController;

import gameController from "./GameController.js";

const { startRound, createPlayers, playTurn } = gameController;

const restartBtns = document.querySelectorAll(".restart-btn");
const resetGameBtn = document.querySelector(".reset-game-btn");
const gameDialog = document.querySelector("#game-dialog");
const gameForm = document.querySelector("#game-form");
const container = document.querySelector(".container");
const gameboardUI = document.querySelector("#gameboard");

const startGame = (e) => {
  e.preventDefault();
  const player1Name = document.querySelector(".player-name.p1");
  const player2Name = document.querySelector(".player-name.p2");
  const p1 = document.querySelector("#player1");
  const p2 = document.querySelector("#player2");
  const p1Name = p1.value || "player 1";
  const p2Name = p2.value || "player 2";
  createPlayers(p1Name, 1, "X");
  createPlayers(p2Name, 2, "O");
  player1Name.textContent = p1Name;
  player2Name.textContent = p2Name;
  startRound();
  gameDialog.close();
  container.classList.add("start");
  p1.value = "";
  p2.value = "";
};

const gameboardClickHandler = (e) => {
  if (e.target.tagName.toLowerCase() === "td") {
    const td = e.target;
    const tr = td.parentElement;
    const board = tr.parentElement;
    const boardTrs = [...board.children];
    const tds = [...tr.children];
    const row = boardTrs.indexOf(tr);
    const col = tds.indexOf(td);
    playTurn(row, col);
  }
};

gameDialog.showModal();
gameboardUI.addEventListener("click", gameboardClickHandler);
restartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const alertDialog = document.querySelector("#alert-dialog");
    startRound();
    alertDialog.close();
  });
});
gameForm.addEventListener("submit", startGame);
resetGameBtn.addEventListener("click", startRound);

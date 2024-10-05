const createGameFlow = (function () {
  let gameFlow = [];

  const appendFlow = (turn, row, col) => {
    gameFlow.push({ turn, row, col });
  };

  const getLastPlay = () => gameFlow[gameFlow.length - 1];

  const clearFlow = () => {
    gameFlow = [];
  };

  return { appendFlow, clearFlow, getLastPlay };
})();

export default createGameFlow;

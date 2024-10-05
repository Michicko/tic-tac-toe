import createGameboard from "./Gameboard.js";

const { isGameboardFull } = createGameboard;

test("should return false when passed array with row and cols containing only 0", () => {
  expect(
    isGameboardFull([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ])
  ).toBe(false);
});

test("should return true when passed array filled row and cols containing numbers greater than 0", () => {
  expect(
    isGameboardFull([
      [1, 2, 2],
      [2, 1, 1],
      [2, 1, 1],
    ])
  ).toBe(false);
});

test("should return false when passed array with row and cols containing numbers  0, 1, 2", () => {
  expect(
    isGameboardFull([
      [0, 2, 0],
      [2, 0, 1],
      [0, 1, 1],
    ])
  ).toBe(false);
});

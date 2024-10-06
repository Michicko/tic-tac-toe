import createGameboard from "./Gameboard.js";

const { isGameboardFull, getWinner } = createGameboard;

test("should return false when passed array with row and cols containing only 0", () => {
  expect(
    isGameboardFull([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ])
  ).toBeFalsy();
});

test("should return true when passed array filled row and cols containing numbers greater than 0", () => {
  expect(
    isGameboardFull([
      [1, 2, 2],
      [2, 1, 1],
      [2, 1, 1],
    ])
  ).toBeFalsy();
});

test("should return false when passed array with row and cols containing numbers  0, 1, 2", () => {
  expect(
    isGameboardFull([
      [0, 2, 0],
      [2, 0, 1],
      [0, 1, 1],
    ])
  ).toBeFalsy();
});

test("should return false when passed array not filled row and cols containing numbers greater 0", () => {
  expect(
    isGameboardFull([
      [1, 0, 0],
      [2, 1, 1],
      [2, 1, 2],
    ])
  ).toBeFalsy();
});

test("should return 1 when passed gameboard with first row filled with 1", () => {
  expect(
    getWinner([
      [1, 1, 1],
      [2, 0, 2],
      [0, 2, 1],
    ])
  ).toBe(1);
});

test("should return 2 when passed gameboard with first row filled with 2", () => {
  expect(
    getWinner([
      [2, 2, 2],
      [1, 0, 1],
      [0, 2, 1],
    ])
  ).toBe(2);
});

test("should return 1 when passed gameboard with second row filled with 1", () => {
  expect(
    getWinner([
      [0, 2, 0],
      [1, 1, 1],
      [0, 2, 1],
    ])
  ).toBe(1);
});

test("should return 2 when passed gameboard with third row filled with 2", () => {
  expect(
    getWinner([
      [0, 1, 0],
      [1, 0, 1],
      [2, 2, 2],
    ])
  ).toBe(2);
});

test("should return 1 when passed gameboard with left diagonal filled with 1", () => {
  expect(
    getWinner([
      [1, 2, 0],
      [0, 1, 1],
      [0, 2, 1],
    ])
  ).toBe(1);
});

test("should return 2 when passed gameboard with rigt diagonal filled with 2", () => {
  expect(
    getWinner([
      [0, 1, 2],
      [1, 2, 1],
      [2, 0, 2],
    ])
  ).toBe(2);
});

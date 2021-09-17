const getArr = (arr) => {
  try {
    solve(arr);
    function returnRow(cell) {
      return Math.floor(cell / 9);
    }

    function returnCol(cell) {
      return cell % 9;
    }

    function returnBlock(cell) {
      return (
        Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3)
      );
    }

    function isPossibleRow(number, row, sudoku) {
      for (let i = 0; i <= 8; i++) {
        if (sudoku[row * 9 + i] === number) {
          return false;
        }
      }
      return true;
    }

    function isPossibleCol(number, col, sudoku) {
      for (let i = 0; i <= 8; i++) {
        if (sudoku[col + 9 * i] === number) {
          return false;
        }
      }
      return true;
    }

    function isPossibleBlock(number, block, sudoku) {
      for (let i = 0; i <= 8; i++) {
        if (
          sudoku[
            Math.floor(block / 3) * 27 +
              (i % 3) +
              9 * Math.floor(i / 3) +
              3 * (block % 3)
          ] === number
        ) {
          return false;
        }
      }
      return true;
    }

    function isPossibleNumber(cell, number, sudoku) {
      let row = returnRow(cell);
      let col = returnCol(cell);
      let block = returnBlock(cell);
      return (
        isPossibleRow(number, row, sudoku) &&
        isPossibleCol(number, col, sudoku) &&
        isPossibleBlock(number, block, sudoku)
      );
    }

    function isCorrectRow(row, sudoku) {
      let rightSequence = new Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      let rowTemp = [];
      for (let i = 0; i <= 8; i++) {
        rowTemp[i] = sudoku[row * 9 + i];
      }
      rowTemp.sort();
      return rowTemp.join() === rightSequence.join();
    }

    function isCorrectCol(col, sudoku) {
      let rightSequence = new Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      let colTemp = [];
      for (let i = 0; i <= 8; i++) {
        colTemp[i] = sudoku[col + i * 9];
      }
      colTemp.sort();
      return colTemp.join() === rightSequence.join();
    }

    function isCorrectBlock(block, sudoku) {
      let rightSequence = new Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      let blockTemp = [];
      for (let i = 0; i <= 8; i++) {
        blockTemp[i] =
          sudoku[
            Math.floor(block / 3) * 27 +
              (i % 3) +
              9 * Math.floor(i / 3) +
              3 * (block % 3)
          ];
      }
      blockTemp.sort();
      return blockTemp.join() === rightSequence.join();
    }

    function isSolvedSudoku(sudoku) {
      for (let i = 0; i <= 8; i++) {
        if (
          !isCorrectBlock(i, sudoku) ||
          !isCorrectRow(i, sudoku) ||
          !isCorrectCol(i, sudoku)
        ) {
          return false;
        }
      }
      return true;
    }

    function determinePossibleValues(cell, sudoku) {
      let possible = [];
      for (let i = 1; i <= 9; i++) {
        if (isPossibleNumber(cell, i, sudoku)) {
          possible.unshift(i);
        }
      }
      return possible;
    }

    function determineRandomPossibleValue(possible, cell) {
      let randomPicked = Math.floor(Math.random() * possible[cell].length);
      return possible[cell][randomPicked];
    }

    function scanSudokuForUnique(sudoku) {
      let possible = [];
      for (let i = 0; i <= 80; i++) {
        if (sudoku[i] === 0) {
          possible[i] = [];
          possible[i] = determinePossibleValues(i, sudoku);
          if (possible[i].length === 0) {
            return false;
          }
        }
      }
      return possible;
    }

    function removeAttempt(attemptArray, number) {
      let newArray = [];
      for (let i = 0; i < attemptArray.length; i++) {
        if (attemptArray[i] !== number) {
          newArray.unshift(attemptArray[i]);
        }
      }
      return newArray;
    }

    function nextRandom(possible) {
      let max = 9;
      let minChoices = 0;
      if (possible === undefined) {
        return minChoices;
      }
      for (let i = 0; i <= 80; i++) {
        if (possible[i] !== undefined) {
          if (possible[i].length <= max && possible[i].length > 0) {
            max = possible[i].length;
            minChoices = i;
          }
        }
      }
      return minChoices;
    }

    function solve(sudoku) {
      let saved = [];
      let savedSudoku = [];
      let nextMove;
      let whatToTry;
      let attempt;
      let conditions = true;
      while (!isSolvedSudoku(sudoku)) {
        //   if (!conditions) {
        // }
        nextMove = scanSudokuForUnique(sudoku);

        if (nextMove.length === 1) {
          // conditions = false;
          // break;
        }
        if (nextMove === false) {
          nextMove = saved.pop();
          sudoku = savedSudoku.pop();
        }
        whatToTry = nextRandom(nextMove);
        attempt = determineRandomPossibleValue(nextMove, whatToTry);
        if (nextMove[whatToTry].length > 1) {
          nextMove[whatToTry] = removeAttempt(nextMove[whatToTry], attempt);
          saved.push(nextMove.slice());
          savedSudoku.push(sudoku.slice());
        }
        sudoku[whatToTry] = attempt;
      }

      arr = sudoku;
    }

    return arr;
  } catch (e) {
    const newArr = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0,
    ];
    return getArr(newArr);
  }
};

module.exports = { getArr };

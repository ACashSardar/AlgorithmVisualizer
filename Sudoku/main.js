let gridContainer = document.getElementById("gridContainer");
let msg = document.getElementById("message");
let moves = 0;
let isSolved = false;

let chArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

for (let i = 0; i < 81; i++) {
  gridContainer.innerHTML += `<span class="gridItem" id='c${i}'>
  </span>`;
}

let index = 0;

let samples = [
  [
    ["5", "3", " ", " ", "7", " ", " ", " ", " "],
    ["6", " ", " ", "1", "9", "5", " ", " ", " "],
    [" ", "9", "8", " ", " ", " ", " ", "6", " "],
    ["8", " ", " ", " ", "6", " ", " ", " ", "3"],
    ["4", " ", " ", "8", " ", "3", " ", " ", "1"],
    ["7", " ", " ", " ", "2", " ", " ", " ", "6"],
    [" ", "6", " ", " ", " ", " ", "2", "8", " "],
    [" ", " ", " ", "4", "1", "9", " ", " ", "5"],
    [" ", " ", " ", " ", "8", " ", " ", "7", "9"],
  ],
  [
    [" ", "2", " ", "5", " ", "1", " ", "9", " "],
    ["8", " ", " ", "2", " ", "3", " ", " ", "6"],
    [" ", "3", " ", " ", "6", " ", " ", "7", " "],
    [" ", " ", "1", " ", " ", " ", "6", " ", " "],
    ["5", "4", " ", " ", " ", " ", " ", "1", "9"],
    [" ", " ", "2", " ", " ", " ", "7", " ", " "],
    [" ", "9", " ", " ", "3", " ", " ", "8", " "],
    ["2", " ", " ", "8", " ", "4", " ", " ", "7"],
    [" ", "1", " ", "9", " ", "7", " ", "6", " "],
  ],
];

const colors = [
  "lavender",
  "white",
  "lavender",
  "white",
  "lavender",
  "white",
  "lavender",
  "white",
  "lavender",
];

const displayBoard = async (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let cell = document.getElementById(`c${9 * i + j}`);
      cell.innerHTML = `${board[i][j]}`;
      let subRow = Math.floor(i / 3);
      let subCol = Math.floor(j / 3);
      cell.style.backgroundColor = colors[subRow * 3 + subCol];
    }
  }
};

const isDigit = (ch) => {
  return ch >= "1" && ch <= "9";
};

const canPlace = (num, row, col, board) => {
  for (let c = 0; c < 9; c++) {
    if (isDigit(board[row][c]) == true && board[row][c] - "0" == num) {
      return false;
    }
  }
  for (let r = 0; r < 9; r++) {
    if (isDigit(board[r][col]) == true && board[r][col] - "0" == num) {
      return false;
    }
  }
  let subRow = Math.floor(row / 3);
  let subCol = Math.floor(col / 3);

  for (let r = subRow * 3; r < (subRow + 1) * 3; r++) {
    for (let c = subCol * 3; c < (subCol + 1) * 3; c++) {
      if (isDigit(board[r][c]) == true && board[r][c] - "0" == num) {
        return false;
      }
    }
  }
  return true;
};

const backtrack = async (r, c, board, ans) => {
  moves++;
  if (r == 9) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        ans[i][j] = board[i][j];
      }
    }
    return;
  }
  await sleep(0);
  if (board[r][c] == " ") {
    for (let num = 1; num <= 9; num++) {
      if (canPlace(num, r, c, board)) {
        let cell = document.getElementById(`c${9 * r + c}`);
        board[r][c] = chArr[num];
        cell.innerHTML = `${chArr[num]}`;
        if (c + 1 < 9) await backtrack(r, c + 1, board, ans);
        else await backtrack(r + 1, 0, board, ans);
        board[r][c] = " ";
        cell.innerHTML = ` `;
      }
    }
  } else {
    if (c + 1 < 9) await backtrack(r, c + 1, board, ans);
    else await backtrack(r + 1, 0, board, ans);
  }
};

const solveSudoku = async (board) => {
  if (isSolved === true) return;
  let startTime = new Date();
  msg.innerHTML = "Solving Sudoku..please wait🙂";
  let ans = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  ];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      ans[i][j] = samples[index % samples.length][i][j];
    }
  }

  await backtrack(0, 0, board, ans);
  let endTime = new Date();
  await displayBoard(ans);
  msg.innerHTML =
    "Sudoku solved in " +
    moves +
    " moves. Time taken=" +
    getSolvingTime(startTime, endTime);
  isSolved = true;
};

let board = samples[index];

displayBoard(board);

const reset = () => {
  displayBoard(board);
  isSolved = false;
};

const change = () => {
  index++;
  board = samples[index % samples.length];
  displayBoard(board);
};

document.getElementById("solve-btn").addEventListener("click", () => {
  solveSudoku(board);
});

const getSolvingTime = (st, et) => {
  let timeDiff =
    (et.getHours() - st.getHours()) * 3600 +
    (et.getMinutes() - st.getMinutes()) * 60 +
    et.getSeconds() -
    st.getSeconds();
  let timeStr = "";
  if (Math.floor(timeDiff / 60) > 0) {
    timeStr += Math.floor(timeDiff / 60) + " minutes";
  }
  timeStr += (timeDiff % 60) + " seconds";
  return timeStr;
};

const myBoard = document.getElementById("my-board");
const message = document.getElementById("message");
const indicators = document.getElementById("indicators");
let bars = [];

const L = 8;
const B = 8;
const visited = Array(B)
  .fill()
  .map(() => Array(L).fill(false));

const patterns = [
  [
    [1, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 1, 1, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 1, 0],
    [0, 1, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1],
  ],
  [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
  [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 1, 0, 1, 0, 1, 1],
    [0, 0, 1, 1, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
  ],
  [
    [1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 1],
  ],
];

let indx = 0;

let maze = patterns[0];

const timer = (ms) => new Promise((res) => setTimeout(res, ms));
let success = false;

const createBoard = (L, B) => {
  for (let r = 0; r < B; r++) {
    for (let c = 0; c < L; c++) {
      myBoard.innerHTML += `<canvas id=${
        "sq" + (r * L + c)
      } class="sq-element"></canvas>`;
    }
    myBoard.innerHTML += `<br>`;
  }
  for (let i = 0; i < patterns.length; i++) {
    indicators.innerHTML += `<canvas class="bar"></canvas>`;
  }
  bars = document.getElementsByClassName("bar");
  bars[0].style.background = "greenyellow";
};

const populateBoard = (arr, l, b) => {
  const sqList = document.getElementsByClassName("sq-element");

  for (let i = 0; i < l; i++) {
    for (let j = 0; j < b; j++) {
      if (arr[i][j] == 1) sqList[L * i + j].style.background = "greenyellow";
      else sqList[L * i + j].style.background = "black";
    }
  }
};

const ratInMaze = async (x, y, arr, l, b, path, visited) => {
  if (x < 0 || y < 0 || success == true) return;
  if (x == 0 && y == 0) {
    console.log(path);
    message.innerHTML = `Success!!, steps: ${path}`;
    success = true;
  }

  document.getElementById("sq" + (L * x + y)).style.background = "lime";

  if (y > 0 && visited[x][y - 1] == false && arr[x][y - 1] == 1) {
    visited[x][y] = true;
    await timer(250);
    await ratInMaze(x, y - 1, arr, l, b, path + "L", visited);
    visited[x][y] = false;
  }

  if (x < l - 1 && visited[x + 1][y] == false && arr[x + 1][y] == 1) {
    visited[x][y] = true;
    await timer(250);
    await ratInMaze(x + 1, y, arr, l, b, path + "D", visited);
    visited[x][y] = false;
  }

  if (x > 0 && visited[x - 1][y] == false && arr[x - 1][y] == 1) {
    visited[x][y] = true;
    await timer(250);
    await ratInMaze(x - 1, y, arr, l, b, path + "U", visited);
    visited[x][y] = false;
  }

  if (y < b - 1 && visited[x][y + 1] == false && arr[x][y + 1] == 1) {
    visited[x][y] = true;
    await timer(250);
    await ratInMaze(x, y + 1, arr, l, b, path + "R", visited);
    visited[x][y] = false;
  }

  if (success == false)
    document.getElementById("sq" + (L * x + y)).style.background = "grey";
};

createBoard(L, B);
populateBoard(maze, L, B);

async function solve() {
  await ratInMaze(L - 1, B - 1, maze, L, B, "", visited);
  if (success == false) message.innerHTML = "No Valid Path Was Found";
}

function reset() {
  success = false;
  myBoard.innerHTML = "";
  indicators.innerHTML = "";
  message.innerHTML = "Backtracking demo-Rat in a Maze";
  createBoard(L, B);
  populateBoard(maze, L, B);
}

function changePattern(val) {
  if (indx + val >= 0 && indx + val < patterns.length) indx += val;
  maze = patterns[indx];
  reset();
  Array.from(bars).forEach((bar, i) => {
    if (i == indx) bar.style.background = "greenyellow";
    else bar.style.background = "white";
    console.log(bar.style);
  });
}

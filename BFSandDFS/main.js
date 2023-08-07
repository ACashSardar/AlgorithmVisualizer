let gridContainer = document.getElementById("gridContainer");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let colors = [
  "rgb(250, 100, 0)",
  "rgb(250, 110, 0)",
  "rgb(250, 120, 0)",
  "rgb(250, 130, 0)",
  "rgb(250, 140, 0)",
  "rgb(250, 150, 0)",
  "rgb(250, 160, 0)",
  "rgb(250, 170, 0)",
  "rgb(250, 180, 0)",
  "rgb(250, 190, 0)",
  "rgb(250, 200, 0)",
  "rgb(250, 210, 0)",
  "rgb(250, 220, 0)",
  "rgb(250, 230, 0)",
  "rgb(250, 240, 0)",
  "rgb(250, 250, 0)",
  "rgb(240, 250, 0)",
  "rgb(230, 250, 0)",
  "rgb(220, 250, 0)",
  "rgb(210, 250, 0)",
  "rgb(200, 250, 0)",
  "rgb(190, 250, 0)",
  "rgb(180, 250, 0)",
  "rgb(170, 250, 0)",
  "rgb(160, 250, 0)",
  "rgb(150, 250, 0)",
  "rgb(140, 250, 0)",
  "rgb(130, 250, 0)",
  "rgb(120, 250, 0)",
  "rgb(110, 250, 0)",
  "rgb(100, 250, 0)",
  "rgb(90, 250, 0)",
  "rgb(80, 250, 0)",
  "rgb(70, 250, 0)",
  "rgb(60, 250, 0)",
  "rgb(50, 250, 0)",
  "rgb(40, 250, 0)",
  "rgb(30, 250, 0)",
  "rgb(20, 250, 0)",
  "rgb(10, 250, 0)",
  "rgb(0, 250, 0)",
  "rgb(0, 250, 10)",
  "rgb(0, 250, 20)",
  "rgb(0, 250, 30)",
  "rgb(0, 250, 40)",
  "rgb(0, 250, 50)",
];
let M = 20;
let N = 20;
let arr = [];
let animationTime = 1;
let isRunning = false;
let blockColor = "black";

for (let i = 0; i < M; i++) {
  let row = [];
  for (let j = 0; j < N; j++) {
    row.push(M * i + j);
    gridContainer.innerHTML += `<span class="gridItem" id='c${M * i + j}'>${
      M * i + j
    }</span>`;
  }
  arr.push(row);
}

let createBlock = (event) => {
  event.target.style.background = blockColor;
  event.target.style.color = "white";
};

let flag = true;

const enableHovering = () => {
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      let currCell = document.getElementById(`c${M * i + j}`);
      currCell.addEventListener("mouseover", createBlock);
      currCell.addEventListener("click", toggleHovering);
    }
  }
};

const toggleHovering = () => {
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      let currCell = document.getElementById(`c${M * i + j}`);
      if (flag) {
        currCell.removeEventListener("mouseover", createBlock);
      } else {
        currCell.addEventListener("mouseover", createBlock);
      }
    }
  }
  flag = !flag;
};

const dfs = async (i, j, M, N, arr, vis, i0, j0) => {
  if (i < 0 || i >= M || j < 0 || j >= N) {
    return;
  }
  let curr = M * i + j;
  vis.add(curr);
  let cell = document.getElementById(`c${M * i + j}`);
  cell.style.background =
    colors[(Math.abs(i - i0) + Math.abs(j - j0)) % colors.length];
  let y = [1, 0, -1];
  let x = [1, 0, -1];

  for (let p = 0; p < 3; p++) {
    for (let q = 0; q < 3; q++) {
      if (y[p] != x[q]) {
        let i1 = i + y[p];
        let j1 = j + x[q];
        if (
          i1 >= 0 &&
          i1 < M &&
          j1 >= 0 &&
          j1 < N &&
          vis.has(M * i1 + j1) == false &&
          document.getElementById(`c${M * i1 + j1}`).style.background !=
            blockColor
        ) {
          await sleep(animationTime);
          await dfs(i1, j1, M, N, arr, vis, i0, j0);
        }
      }
    }
  }
};

const dfsTraversal = async (arr, M, N, start) => {
  if (isRunning == true) return;
  isRunning = true;
  let vis = new Set();
  let i = Math.floor(start / M);
  let j = start % M;
  await dfs(i, j, M, N, arr, vis, i, j);
  isRunning = false;
};

const bfsTraversal = async (arr, M, N, start) => {
  if (isRunning == true) return;
  isRunning = true;
  let layer = 0;
  let vis = new Set();
  let queue = [];
  vis.add(start);
  queue.push(start);
  while (queue.length > 0) {
    let levelLen = queue.length;
    for (let len = 0; len < levelLen; len++) {
      let curr = queue.shift();
      let i = Math.floor(curr / M);
      let j = curr % M;
      let cell = document.getElementById(`c${curr}`);
      cell.style.background = colors[layer % colors.length];
      let y = [1, 0, -1];
      let x = [1, 0, -1];
      await sleep(animationTime);
      for (let p = 0; p < 3; p++) {
        for (let q = 0; q < 3; q++) {
          if (Math.abs(y[p]) != Math.abs(x[q])) {
            let i1 = i + y[p];
            let j1 = j + x[q];
            if (
              vis.has(M * i1 + j1) == false &&
              i1 >= 0 &&
              i1 < M &&
              j1 >= 0 &&
              j1 < N &&
              document.getElementById(`c${M * i1 + j1}`).style.background !==
                blockColor
            ) {
              queue.push(M * i1 + j1);
              vis.add(M * i1 + j1);
            }
          }
        }
      }
    }
    layer++;
  }
  isRunning = false;
};

const startTraversal = async (e) => {
  e.preventDefault();
  let str = document.getElementById("start").value;
  let algo = document.getElementById("algo").value;
  let start = 0;
  if (str != "" && 0 <= parseInt(str) && parseInt(str) < M * N) {
    start = parseInt(str);
  }
  if (algo == "BFS") {
    bfsTraversal(arr, M, N, start);
  } else if (algo == "DFS") {
    dfsTraversal(arr, M, N, start);
  }
};

const reset = () => {
  if (isRunning == true) return;
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      let cell = document.getElementById(`c${M * i + j}`);
      cell.style.background = "white";
      cell.style.color = "black";
    }
  }
  enableHovering();
};

function adjustAnimation(e) {
  animationTime = parseInt(e.target.value) * 50;
}

enableHovering();

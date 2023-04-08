let gridContainer = document.getElementById("gridContainer");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let colors = [
  "#2EDEFD",
  "#2EEDFD",
  "#2EFAFD",
  "#2EFDAF",
  "#2EFD92",
  "#63FD2E",
  "#70FD2E",
  "#86FD2E",
  "#A2FD2E",
  "#C1FD2E",
  "#D7FD2E",
  "#EAFD2E",
  "#FDFD2E",
  "#FDF42E",
  "#FDE42E",
  "#FDDE2E",
  "#FDD12E",
  "#FD992E",
  "#FD8C2E",
  "#FD732E",
  "#FD602E",
];
let M = 20;
let N = 20;
let arr = [];
let animationTime = 1;

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

const dfs = async (i, j, M, N, arr, vis) => {
  if (i < 0 || i >= M || j < 0 || j >= N) {
    return;
  }
  let curr = M * i + j;

  vis.add(curr);
  let cell = document.getElementById(`c${M * i + j}`);
  cell.style.background = "yellow";
  let y = [1, 0, -1];
  let x = [1, 0, -1];

  for (let p = 0; p < 3; p++) {
    for (let q = 0; q < 3; q++) {
      if (y[p] != x[q]) {
        let i1 = i + y[p];
        let j1 = j + x[q];
        if (vis.has(M * i1 + j1) == false) {
          await sleep(animationTime);
          await dfs(i1, j1, M, N, arr, vis);
        }
      }
    }
  }
};

const dfsTraversal = async (arr, M, N, start) => {
  let vis = new Set();
  let i = Math.floor(start / M);
  let j = start % M;
  await dfs(i, j, M, N, arr, vis);
};

const bfsTraversal = async (arr, M, N, start) => {
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
              j1 < N
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
};

const startTraversal = (e) => {
  e.preventDefault();
  reset();
  let str = document.getElementById("start").value;
  let algo = document.getElementById("algo").value;
  console.log(algo);
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
  console.log("reset called");
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      let cell = document.getElementById(`c${M * i + j}`);
      cell.style.background = "white";
    }
  }
};

function adjustAnimation(e) {
  animationTime = parseInt(e.target.value) * 50;
}

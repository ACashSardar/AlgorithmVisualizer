let src = document.getElementById("src");
let aux = document.getElementById("aux");
let dest = document.getElementById("dest");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const colors = [
  "aqua",
  "deeppink",
  "greenyellow",
  "yellow",
  "orange",
  "orangered",
];

let n = 3;
let arrA = [];
let arrB = [];
let arrC = [];
let animationDelay = 100;
let isRunning = false;

const toh = (n, A, B, C, moves) => {
  if (n == 1) {
    console.log("Move disk 1 from " + A + " to " + C);
    moves.push([1, A, C]);
    return;
  }
  toh(n - 1, A, C, B, moves);
  console.log("Move disk " + n + " from " + A + " to " + C);
  moves.push([n, A, C]);
  toh(n - 1, B, A, C, moves);
};

const appendDisks = (stick, arr) => {
  stick.innerHTML = "";

  for (let i = arr.length - 1; i >= 0; i--) {
    stick.innerHTML += `
      <canvas class="rounded-2 mb-1 border shadow" style="width: ${
        arr[i] * 15
      }%; height: 1.5rem ; background-color: ${colors[arr[i] - 1]};"> </canvas>
    `;
  }
};

const solve = async () => {
  if (isRunning || arrC.length == n) return;
  isRunning = true;
  let moves = [];
  toh(n, "src", "aux", "dest", moves);
  for (let i = 0; i < moves.length; i++) {
    let move = moves[i];
    let disk = -1;
    if (move[1] == "src") {
      disk = arrA.pop();
    } else if (move[1] == "aux") {
      disk = arrB.pop();
    } else if (move[1] == "dest") {
      disk = arrC.pop();
    }
    if (move[2] == "src") {
      arrA.push(disk);
    } else if (move[2] == "aux") {
      arrB.push(disk);
    } else if (move[2] == "dest") {
      arrC.push(disk);
    }
    await sleep(animationDelay);
    appendDisks(src, arrA);
    appendDisks(aux, arrB);
    appendDisks(dest, arrC);
  }
  isRunning = false;
};

const setup = () => {
  if (isRunning) return;
  arrA = [];
  arrB = [];
  arrC = [];
  for (let i = n; i > 0; i--) arrA.push(i);
  appendDisks(src, arrA);
  appendDisks(aux, arrB);
  appendDisks(dest, arrC);
};

const changeInput = (e) => {
  if (isRunning) return;
  n = parseInt(e.target.value);
  setup();
};

const adjustAnimation = (e) => {
  animationDelay = parseInt(e.target.value);
};

setup();

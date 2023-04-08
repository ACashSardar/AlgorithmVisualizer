const barList = document.getElementById("bar-list");
const complexity = document.getElementById("complexity");
const runtime = document.getElementById("runtime");
const arraySize = document.getElementById("array-size");

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

let verticalBars = [];
let elements = [];
let sortingAlgo = "bubbleSort";
let animationTime = 1;
let sampleCount = 10;
let isSorted = false;
let running = false;

arraySize.innerHTML = `Array size n: ${sampleCount}`;

function adjustAnimation(e) {
  animationTime = parseInt(e.target.value) * 50;
}

function adjustBarWidth(e) {
  if (running) return;
  sampleCount = parseInt(e.target.value);
  arraySize.innerHTML = `Array size n: ${sampleCount}`;

  Array.from(verticalBars).forEach((bar, index) => {
    bar.style.borderWidth =
      (100 / sampleCount) * window.innerWidth * 0.00045 + "px";
  });

  loadRandomSamples();
}

const pixelToInt = (pixelVal) => {
  rawStr = pixelVal.substring(0, pixelVal.length - 2);
  return parseInt(rawStr);
};

const swapBars = (bars, i, j) => {
  let temp = bars[i].style.height;
  bars[i].style.height = bars[j].style.height;
  bars[j].style.height = temp;
};

const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const setUpBarHeights = (bars, elements) => {
  const max = elements.reduce((a, b) => Math.max(a, b), -Infinity);

  const dx = 99 / elements.length;
  console.log(elements.length, dx);

  Array.from(bars).forEach((bar, index) => {
    bar.style.height = (elements[index] * 200) / max + "px";
    bar.style.left = 1 + index * dx + "%";
    bar.style.borderWidth =
      (100 / sampleCount) * window.innerWidth * 0.006 + "px";
  });
};

const merge = (bars, low, mid, high) => {
  let n = mid - low + 1;
  let m = high - mid;
  let left = new Array(n);
  let right = new Array(m);
  for (let i = 0; i < n; i++) left[i] = pixelToInt(bars[low + i].style.height);
  for (let j = 0; j < m; j++)
    right[j] = pixelToInt(bars[mid + 1 + j].style.height);

  let i = 0;
  let j = 0;
  let k = low;

  while (i < n && j < m) {
    if (left[i] < right[j]) bars[k++].style.height = left[i++] + "px";
    else bars[k++].style.height = right[j++] + "px";
  }

  while (i < n) bars[k++].style.height = left[i++] + "px";
  while (j < m) bars[k++].style.height = right[j++] + "px";
};

const bubbleSort = async (bars) => {
  for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      bars[j].style.borderLeftColor = "#333";
      if (
        pixelToInt(bars[j].style.height) > pixelToInt(bars[j + 1].style.height)
      ) {
        swapBars(bars, j, j + 1);

        bars[j + 1].style.borderLeftColor = "yellow";
        await timer(animationTime);
      }
    }
    bars[bars.length - i - 1].style.borderLeftColor = "cyan";
  }
};

const selectionSort = async (bars) => {
  for (let i = 0; i < bars.length; i++) {
    let minValIndx = i;
    for (let j = i + 1; j < bars.length; j++) {
      if (
        pixelToInt(bars[j].style.height) <
        pixelToInt(bars[minValIndx].style.height)
      ) {
        minValIndx = j;
      }
    }
    bars[minValIndx].style.borderLeftColor = "yellow";
    await timer(50 + animationTime);
    bars[minValIndx].style.borderLeftColor = "#333";
    swapBars(bars, i, minValIndx);

    bars[i].style.borderLeftColor = "cyan";
  }
};

const insertionSort = async (bars) => {
  for (let i = 0; i < bars.length; i++) {
    let temp = bars[i].style.height;
    let j = i;
    while (j > 0 && pixelToInt(bars[j - 1].style.height) > pixelToInt(temp)) {
      await timer(animationTime);
      bars[j].style.height = bars[j - 1].style.height;
      bars[i].style.borderLeftColor = "yellow";
      j--;
    }
    bars[j].style.height = temp;
    bars[i].style.borderLeftColor = "cyan";
  }
};

const quickSort = async (bars, low, high) => {
  if (low >= high) return;

  let pivotItem = pixelToInt(bars[low].style.height);
  let i = low + 1;
  let j = high;
  bars[low].style.borderLeftColor = "greenyellow";
  bars[low + 1].style.borderLeftColor = "cyan";
  bars[high].style.borderLeftColor = "deeppink";

  while (i <= j) {
    while (i <= high && pixelToInt(bars[i].style.height) <= pivotItem) {
      i++;
    }
    while (j >= 0 && pixelToInt(bars[j].style.height) > pivotItem) {
      j--;
    }
    if (i < j) swapBars(bars, i, j);
  }
  await timer(animationTime);
  swapBars(bars, low, j);
  bars[j].style.borderLeftColor = "greenyellow";
  bars[low + 1].style.borderLeftColor = "greenyellow";
  await quickSort(bars, low, j - 1);
  await quickSort(bars, j + 1, high);
  bars[high].style.borderLeftColor = "greenyellow";
};

const mergeSort = async (bars, low, high) => {
  if (low >= high) return;
  let mid = parseInt((low + high) / 2);
  bars[low].style.borderLeftColor = "cyan";
  bars[mid].style.borderLeftColor = "deeppink";
  bars[mid + 1].style.borderLeftColor = "cyan";
  bars[high].style.borderLeftColor = "deeppink";
  await timer(animationTime);
  await mergeSort(bars, low, mid);
  await mergeSort(bars, mid + 1, high);
  merge(bars, low, mid, high);
  bars[low].style.borderLeftColor = "greenyellow";
  bars[mid].style.borderLeftColor = "greenyellow";
  bars[mid + 1].style.borderLeftColor = "greenyellow";
  bars[high].style.borderLeftColor = "greenyellow";
};

function loadRandomSamples() {
  let length = sampleCount;
  let max = 100;

  barList.innerHTML = "";
  runtime.innerHTML = "Stopped";

  let elements = [...new Array(length)].map(() =>
    Math.round(Math.random() * max)
  );

  for (let count = 0; count < elements.length; count++) {
    barList.innerHTML += `
  <li class="mx-5 list-unstyled">
    <span class="vertical" onclick="return getBarHeight(this)"></span>
  </li>
`;
  }

  verticalBars = document.getElementsByClassName("vertical");
  setUpBarHeights(verticalBars, elements);
  isSorted = false;
}

function handleSortAlgo(e) {
  sortingAlgo = e.target.value;

  if (
    sortingAlgo === "bubbleSort" ||
    sortingAlgo === "selectionSort" ||
    sortingAlgo === "insertionSort"
  ) {
    complexity.innerHTML = "TC: 0[n²]";
  } else if (sortingAlgo === "quickSort" || sortingAlgo === "mergeSort") {
    complexity.innerHTML = "TC: 0[nlog(n)]";
  }
}

async function handleSort() {
  if (isSorted == true) {
    alert("Already sorted!");
    return;
  }

  running = true;
  runtime.innerHTML = "Sorting..";
  let start = new Date().getTime();
  if (sortingAlgo === "bubbleSort") {
    await bubbleSort(verticalBars);
  } else if (sortingAlgo === "quickSort") {
    await quickSort(verticalBars, 0, verticalBars.length - 1);
  } else if (sortingAlgo === "mergeSort") {
    await mergeSort(verticalBars, 0, verticalBars.length - 1);
  } else if (sortingAlgo === "selectionSort") {
    await selectionSort(verticalBars);
  } else if (sortingAlgo === "insertionSort") {
    await insertionSort(verticalBars);
  }
  let stop = new Date().getTime();
  isSorted = true;
  running = false;

  let ms = stop - start;
  let sec = ((stop - start) / 1000).toFixed(2);
  let min = parseInt(sec / 60);
  if (stop - start < 1000) runtime.innerHTML = "⏱️" + ms + " ms";
  else if (stop - start < 60000) {
    runtime.innerHTML = "⏱️" + sec + " s";
  } else {
    runtime.innerHTML = "⏱️" + min + " m" + sec + " s";
  }
}

function clearConsole() {}

function reset() {
  location.reload();
}

loadRandomSamples();

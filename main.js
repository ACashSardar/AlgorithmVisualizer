const logs = document.getElementById("logs");
const audio = document.getElementById("audio");
const audio2 = document.getElementById("audio2");
const barList = document.getElementById("bar-list");
const complexity = document.getElementById("complexity");
const runtime = document.getElementById("runtime");
const arraySize = document.getElementById("array-size");

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

let verticalBars = [];
let elements = [];
let sortingAlgo = "bubbleSort";
let animationTime = 1;
let sampleCount = 50;
let isSorted = false;
let running = false;

arraySize.innerHTML = `n: ${sampleCount}`;

function adjustAnimation(e) {
  animationTime = parseInt(e.target.value) * 50;
}

function adjustBarWidth(e) {
  if (running) return;
  sampleCount = parseInt(e.target.value);
  arraySize.innerHTML = `n: ${sampleCount}`;

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
      (100 / sampleCount) * window.innerWidth * 0.0045 + "px";
  });
};

const merge = async (bars, low, mid, high) => {
  let n = mid - low + 1;
  let m = high - mid;
  let left = new Array(n);
  let right = new Array(m);

  logs.innerHTML += `<p>low: ${low},mid: ${mid}, high: ${high}</p>`;

  bars[mid].style.borderLeftColor = "hotpink";

  for (let i = 0; i < n; i++) left[i] = pixelToInt(bars[low + i].style.height);
  for (let j = 0; j < m; j++)
    right[j] = pixelToInt(bars[mid + 1 + j].style.height);

  let i = 0;
  let j = 0;
  let k = low;
  await timer(animationTime);

  audio.play();

  logs.innerHTML += `<p class="text-light">Merging: ${left} with ${right}</p>`;

  while (i < n && j < m) {
    if (left[i] < right[j]) bars[k++].style.height = left[i++] + "px";
    else bars[k++].style.height = right[j++] + "px";
  }

  while (i < n) bars[k++].style.height = left[i++] + "px";
  while (j < m) bars[k++].style.height = right[j++] + "px";

  bars[high].style.borderLeftColor = "hotpink";
};

const bubbleSort = async (bars) => {
  logs.innerHTML += "<p>Starting Bubble Sort...</p>";
  for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      bars[j].style.borderLeftColor = "white";
      if (
        pixelToInt(bars[j].style.height) > pixelToInt(bars[j + 1].style.height)
      ) {
        logs.innerHTML += `<p class="text-light" >Swapping ${pixelToInt(
          bars[j].style.height
        )} with ${pixelToInt(bars[j + 1].style.height)}</p>`;
        swapBars(bars, j, j + 1);

        bars[j + 1].style.borderLeftColor = "hotpink";
        await timer(animationTime);
      }
    }
    bars[bars.length - i - 1].style.borderLeftColor = "cyan";
    audio.play();
  }
  logs.innerHTML += "<p>Done..</p>";
};

const quickSort = async (bars, low, high) => {
  if (low >= high) return;

  bars[low].style.borderLeftColor = "hotpink";

  let pivotItem = pixelToInt(bars[low].style.height);
  let i = low + 1;
  let j = high;

  logs.innerHTML += `<p>low: ${low}, pivot:${low} high: ${high}</p>`;

  await timer(animationTime);

  while (i <= j) {
    while (i <= high && pixelToInt(bars[i].style.height) <= pivotItem) i++;
    while (j >= 0 && pixelToInt(bars[j].style.height) > pivotItem) j--;
    if (i < j) swapBars(bars, i, j);
  }
  audio.play();
  swapBars(bars, low, j);
  logs.innerHTML += `<p class="text-light">Swapping Pivot with location ${j}</p>`;
  bars[low].style.borderLeftColor = "greenyellow";
  bars[j].style.borderLeftColor = "greenyellow";

  await quickSort(bars, low, j - 1);

  await quickSort(bars, j + 1, high);
  bars[high].style.borderLeftColor = "greenyellow";
};

const mergeSort = async (bars, low, high) => {
  if (low >= high) return;
  let mid = parseInt((low + high) / 2);
  await mergeSort(bars, low, mid);
  await mergeSort(bars, mid + 1, high);
  await merge(bars, low, mid, high);
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
      } else {
        bars[j].style.borderLeftColor = "white";
      }
      await timer(animationTime);
    }

    bars[minValIndx].style.borderLeftColor = "orangered";

    logs.innerHTML += `<p>Min Value ${pixelToInt(
      bars[minValIndx].style.height
    )} found at index ${minValIndx} </p>`;

    logs.innerHTML += `<p class="text-light">Min Value ${pixelToInt(
      bars[minValIndx].style.height
    )} swapped with ${pixelToInt(bars[i].style.height)}</p>`;

    swapBars(bars, i, minValIndx);
    audio.play();
    bars[i].style.borderLeftColor = "lightseagreen";
  }
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
    <span class="vertical"></span>
    </li>
`;
    audio2.play();
  }

  verticalBars = document.getElementsByClassName("vertical");
  setUpBarHeights(verticalBars, elements);
  isSorted = false;
}

function handleSortAlgo(e) {
  sortingAlgo = e.target.value;

  if (sortingAlgo === "bubbleSort" || sortingAlgo === "selectionSort") {
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
  runtime.innerHTML = "Started..";
  let start = new Date().getTime();
  if (sortingAlgo === "bubbleSort") {
    logs.innerHTML = "";
    await bubbleSort(verticalBars);
  } else if (sortingAlgo === "quickSort") {
    logs.innerHTML = "<p>Starting Quick Sort..</p>";
    await quickSort(verticalBars, 0, verticalBars.length - 1);
  } else if (sortingAlgo === "mergeSort") {
    logs.innerHTML = "<p>Starting Merge Sort..</p>";
    await mergeSort(verticalBars, 0, verticalBars.length - 1);
  } else if (sortingAlgo === "selectionSort") {
    logs.innerHTML = "<p>Starting Selection Sort..</p>";
    await selectionSort(verticalBars);
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

function clearConsole() {
  logs.innerHTML = "";
}

function reset() {
  location.reload();
}

loadRandomSamples();

const logs = document.getElementById("logs");
const audio = document.getElementById("audio");
const barList = document.getElementById("bar-list");
const complexity = document.getElementById("complexity");
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

let verticalBars = [];
let elements = [];
let sortingAlgo = "bubbleSort";
let animationTime = 1;
let isSorted = false;

function adjustAnimation(e) {
  animationTime = parseInt(e.target.value) * 50;
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
  Array.from(bars).forEach((bar, index) => {
    bar.style.height = (elements[index] * 200) / max + "px";
    bar.style.left = index * 10 + "px";
  });
};

const merge = async (bars, low, mid, high) => {
  let n = mid - low + 1;
  let m = high - mid;
  let left = new Array(n);
  let right = new Array(m);

  logs.innerHTML += `<p>low: ${low},mid: ${mid}, high: ${high}</p>`;

  bars[mid].style.borderLeftColor = "limegreen";

  for (let i = 0; i < n; i++) left[i] = pixelToInt(bars[low + i].style.height);
  for (let j = 0; j < m; j++)
    right[j] = pixelToInt(bars[mid + 1 + j].style.height);

  let i = 0;
  let j = 0;
  let k = low;
  await timer(animationTime);

  audio.play();

  logs.innerHTML += `<p class="text-warning">Merging: ${left} with ${right}</p>`;

  while (i < n && j < m) {
    if (left[i] < right[j]) bars[k++].style.height = left[i++] + "px";
    else bars[k++].style.height = right[j++] + "px";
  }

  while (i < n) bars[k++].style.height = left[i++] + "px";
  while (j < m) bars[k++].style.height = right[j++] + "px";

  bars[high].style.borderLeftColor = "limegreen";
};

const bubbleSort = async (bars) => {
  logs.innerHTML += "<p>Starting Bubble Sort...</p>";
  for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      await timer(animationTime);
      logs.innerHTML += `<p>Comparing ${pixelToInt(
        bars[j].style.height
      )} to ${pixelToInt(bars[j + 1].style.height)}</p>`;

      if (
        pixelToInt(bars[j].style.height) > pixelToInt(bars[j + 1].style.height)
      ) {
        logs.innerHTML += `<p class="text-warning" >Swapping ${pixelToInt(
          bars[j].style.height
        )} with ${pixelToInt(bars[j + 1].style.height)}</p>`;

        swapBars(bars, j, j + 1);
      }
    }
    bars[bars.length - i - 1].style.borderLeftColor = "crimson";
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
  logs.innerHTML += `<p class="text-warning">Swapping Pivot with location ${j}</p>`;
  bars[low].style.borderLeftColor = "lightseagreen";
  bars[j].style.borderLeftColor = "lightseagreen";

  await quickSort(bars, low, j - 1);

  await quickSort(bars, j + 1, high);
  bars[high].style.borderLeftColor = "lightseagreen";
};

const mergeSort = async (bars, low, high) => {
  if (low >= high) return;
  let mid = parseInt((low + high) / 2);
  await mergeSort(bars, low, mid);
  await mergeSort(bars, mid + 1, high);
  await merge(bars, low, mid, high);
};

function loadRandomSamples() {
  let length = parseInt(window.innerWidth / 30);
  let max = 100;

  console.log(length);
  barList.innerHTML = "";
  let elements = [...new Array(length)].map(() =>
    Math.round(Math.random() * max)
  );

  for (let count = 0; count < elements.length; count++) {
    barList.innerHTML += `
    <li class="mx-5 list-unstyled">
    <span class="vertical"></span>
    </li>
`;
  }

  verticalBars = document.getElementsByClassName("vertical");
  setUpBarHeights(verticalBars, elements);
  isSorted = false;
}

function handleSortAlgo(e) {
  sortingAlgo = e.target.value;

  if (sortingAlgo === "bubbleSort") {
    complexity.innerHTML = "Time Complexity: 0[n^2]";
  } else if (sortingAlgo === "quickSort" || sortingAlgo === "mergeSort") {
    complexity.innerHTML = "Time Complexity: 0[nlog(n)]";
  }
}

function handleSort() {
  if (isSorted == true) {
    alert("Already sorted!");
    return;
  }

  if (sortingAlgo === "bubbleSort") {
    logs.innerHTML = "";
    bubbleSort(verticalBars);
  } else if (sortingAlgo === "quickSort") {
    logs.innerHTML = "<p>Starting Quick Sort..</p>";
    quickSort(verticalBars, 0, verticalBars.length - 1);
  } else if (sortingAlgo === "mergeSort") {
    logs.innerHTML = "<p>Starting Merge Sort..</p>";
    mergeSort(verticalBars, 0, verticalBars.length - 1);
  }
  isSorted = true;
}

function clearConsole() {
  logs.innerHTML = "";
}

addEventListener("resize", (event) => {
  loadRandomSamples();
});

loadRandomSamples();

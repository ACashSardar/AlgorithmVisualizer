let verticalBars = null;
let elements = [];

const logs = document.getElementById("logs");
const audio = document.getElementById("audio");
const barList = document.getElementById("bar-list");
const complexity = document.getElementById("complexity");

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

let sortingAlgo = "bubbleSort";

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
    bar.style.left = 5 + index * 10 + "px";
  });
};

const bubbleSort = async (bars) => {
  console.log(bars);
  logs.innerHTML += "<p>Starting Bubble Sort...</p>";
  for (let i = 0; i < bars.length; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      await timer(100);
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
    bars[bars.length - i - 1].style.borderLeftColor = "limegreen";
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

  logs.innerHTML += `<p>low: ${low}, high: ${high}</p>`;

  await timer(500);

  while (i <= j) {
    while (i <= high && pixelToInt(bars[i].style.height) <= pivotItem) i++;
    while (j >= 0 && pixelToInt(bars[j].style.height) > pivotItem) j--;
    if (i < j) swapBars(bars, i, j);
  }
  audio.play();
  swapBars(bars, low, j);
  logs.innerHTML += `<p>Pivot's actual location ${j}</p>`;
  bars[low].style.borderLeftColor = "lightseagreen";
  bars[j].style.borderLeftColor = "lightseagreen";

  await quickSort(bars, low, j - 1);

  await quickSort(bars, j + 1, high);
  bars[high].style.borderLeftColor = "lightseagreen";
};

function handleSubmit(e) {
  e.preventDefault();
  elements = e.target.elements.value.split(",").map((item) => parseInt(item));
  barList.innerHTML = "";

  for (let count = 0; count < elements.length; count++) {
    barList.innerHTML += `
    <li class="me-5 list-unstyled">
    <span class="vertical"></span>
    </li>
`;
    verticalBars = document.getElementsByClassName("vertical");
    setUpBarHeights(verticalBars, elements);
  }
}

function handleSortAlgo(e) {
  sortingAlgo = e.target.value;

  if (sortingAlgo === "bubbleSort") {
    complexity.innerHTML = "Time Complexity: 0[n^2]";
  } else if (sortingAlgo === "quickSort") {
    complexity.innerHTML = "Time Complexity: 0[nlog(n)]";
  }
}

function handleSort() {
  if (sortingAlgo === "bubbleSort") {
    logs.innerHTML = "";
    bubbleSort(verticalBars);
  } else if (sortingAlgo === "quickSort") {
    logs.innerHTML = "<p>Starting Quick Sort..</p>";
    quickSort(verticalBars, 0, verticalBars.length - 1);
  }
}

function clearInput() {
  elements = [];
  document.getElementById("inputs").value = "";
  logs.innerHTML = "";
}

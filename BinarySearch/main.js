let gridContainer = document.getElementById("gridContainer");
let msg = document.getElementById("message");
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const setupArray = async () => {
  gridContainer.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    gridContainer.innerHTML += `<span class="gridItem" id='c${i}'>${array[i]}</span>`;
  }
};

const displayArray = async () => {
  for (let i = 0; i < array.length; i++) {
    let cell = document.getElementById(`c${i}`);
    cell.innerHTML = `${array[i]}`;
    cell.style.background = "white";
  }
};

let cnt = 10;
const addElement = (e) => {
  e.preventDefault();
  let str = document.getElementById("data").value;
  if (str != "") {
    let data = parseInt(str);
    document.getElementById("data").value = "";
    array.push(data);
  } else {
    array.push(++cnt);
  }
  array.sort(function (a, b) {
    return a - b;
  });
  setupArray();
  displayArray();
};

const search = async (e) => {
  e.preventDefault();
  msg.innerHTML = "Scanning...";
  displayArray();
  let str = document.getElementById("key").value;
  console.log(str);
  if (str != "") {
    let key = parseInt(str);
    let res = await binarySearch(array, key);
    if (res) {
      msg.innerHTML = "Success! Element found.";
    } else {
      msg.innerHTML = "Element not present";
    }
  } else {
    msg.innerHTML = "Please enter a key to search";
  }
};

const binarySearch = async (arr, key) => {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    let mid = lo + Math.floor((hi - lo) / 2);

    let leftElem = document.getElementById(`c${lo}`);
    let rightElem = document.getElementById(`c${hi}`);
    let midElem = document.getElementById(`c${mid}`);

    leftElem.style.background = "cyan";
    rightElem.style.background = "deeppink";
    midElem.style.background = "yellow";

    await sleep(1500);
    if (arr[mid] == key) {
      midElem.style.background = "lime";
      return true;
    } else if (arr[mid] < key) {
      for (let i = lo; i <= mid; i++) {
        document.getElementById(`c${i}`).style.background = "grey";
      }
      lo = mid + 1;
    } else {
      for (let i = mid; i <= hi; i++) {
        document.getElementById(`c${i}`).style.background = "grey";
      }
      hi = mid - 1;
    }
  }
  return false;
};

const reset = () => {
  while (array.length > 0) {
    array.pop();
  }
  cnt = 0;
  array = [];
  setupArray();
  displayArray();
  gridContainer.innerHTML = `<label class="d-flex">Empty!</label>`;
  msg.innerHTML = "";
};

setupArray();

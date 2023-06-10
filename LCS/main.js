let string1 = document.getElementById("string1");
let string2 = document.getElementById("string2");
let lcsresult = document.getElementById("lcs-result");
let dpArray = document.getElementById("gridContainer");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let str1 = "";
let str2 = "";
let animationDelay = 100;
let isRunning = false;

const longestCommonSubsequence = async (s1, s2) => {
  let n1 = s1.length;
  let n2 = s2.length;

  lcsresult.innerHTML = `<p class="text-info fs-5 fw-light">Generating DP array...Please wait</p>`;
  await sleep(animationDelay);

  dp = [];
  for (let i = 0; i <= n1 + 1; i++) {
    row = [];
    for (let j = 0; j <= n2 + 1; j++) {
      row.push(0);
    }
    dp.push(row);
  }

  for (let i = -1; i <= n1; i++) {
    dpArray.innerHTML += `<div class="mb-3">`;
    for (let j = -1; j <= n2; j++) {
      await sleep(animationDelay / 5);
      if (i > 0 && j > 0) {
        if (s1[i - 1] == s2[j - 1]) {
          dp[i][j] = 1 + dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
      if (i >= 0 && j >= 0) {
        dpArray.innerHTML += `<span id="c${i * n2 + j}" class="cell">${
          dp[i][j]
        }</span>`;
      } else {
        if (j >= 1)
          dpArray.innerHTML += `<span id="str1${j}" class="cell border-dark fw-bold">${
            s2[j - 1]
          }</span>`;
        else if (i >= 1)
          dpArray.innerHTML += `<span id="str2${i}" class="cell border-dark fw-bold">${
            s1[i - 1]
          }</span>`;
        else dpArray.innerHTML += `<span class="cell border-0">__</span>`;
      }
    }
    dpArray.innerHTML += `</div>`;
  }
  let i = n1;
  let j = n2;
  let lcs = "";

  while (i > 0 && j > 0) {
    let cell = document.getElementById(`c${i * n2 + j}`);
    let ch1 = document.getElementById(`str1${j}`);
    let ch2 = document.getElementById(`str2${i}`);

    await sleep(animationDelay * 5);
    if (s1[i - 1] == s2[j - 1]) {
      lcs = s1[i - 1] + lcs;
      cell.style.background = "lime";
      cell.style.border = "1px solid greenyellow";
      ch1.style.background = "aqua";
      ch2.style.background = "aqua";
      i--;
      j--;
    } else if (dp[i][j - 1] > dp[i - 1][j]) {
      cell.style.background = "#ddd";
      j--;
    } else {
      cell.style.background = "#ddd";
      i--;
    }
    lcsresult.innerHTML = "<b>LCS:</b> " + lcs;
  }

  return lcs;
};

const calcLCS = async () => {
  if (isRunning == true) return;
  isRunning = true;
  str1 = document.getElementById("str1").value;
  str2 = document.getElementById("str2").value;

  if (str1 == "" || str2 == "") {
    isRunning = false;
    return;
  }

  dpArray.innerHTML = "";

  string1.innerHTML = `<b>1st string : </b> "` + str1 + `"`;
  document.getElementById("str1").value = "";

  string2.innerHTML = `<b>2nd string : </b> "` + str2 + `"`;
  document.getElementById("str2").value = "";
  lcsresult.innerHTML =
    `<b>Longest Increasing Subsequence </b>"` +
    (await longestCommonSubsequence(str1, str2)) +
    `"`;
  isRunning = false;
};

const reset = () => {
  if (isRunning == true) return;
  document.getElementById("string1").innerHTML = "";
  document.getElementById("string2").innerHTML = "";
  document.getElementById("lcs-result").innerHTML = "";
  document.getElementById("gridContainer").innerHTML = "";
};

const adjustAnimation = (e) => {
  animationDelay = parseInt(e.target.value);
};

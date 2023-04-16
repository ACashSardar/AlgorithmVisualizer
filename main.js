let appname = document.getElementById("appname");
let str = "ALGORITHM VISUALIZER";

let flag = true;
for (let i = 0; i < str.length; i++) {
  if (flag === true) {
    appname.innerHTML += `<span style="font-size: ${18 + i}px;color: rgb(${
      (1 * i) % 255
    },${(10 * i) % 255},${(13 * i) % 255})">${str[i]}</span>`;
  }
}
setInterval(function () {
  appname.innerHTML = "";
  for (let i = 0; i < str.length; i++) {
    if (flag === true) {
      appname.innerHTML += `<span style="font-size: ${18 + i}px;color: rgb(${
        (1 * i) % 255
      },${(10 * i) % 255},${(13 * i) % 255})">${str[i]}</span>`;
    } else {
      j = str.length - 1 - i;
      appname.innerHTML += `<span style="font-size: ${18 + j}px; color: rgb(${
        (13 * j) % 255
      },${(6 * j) % 255},${(12 * j) % 255})">${str[j]}</span>`;
    }
  }
  flag = !flag;
}, 1000);

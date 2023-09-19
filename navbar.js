const html = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 p-3" style="box-shadow: 2px 2px 3px 3px grey">
    <div class="container-fluid">
    <a class="navbar-brand fw-bold p-0" id="appname" href="#"></a>
    <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item" >
            <a class="nav-link link-light fw-bold" style="letter-spacing: 2px" href="/index.html">HOME</a>
        </li>
        <li class="nav-item">
            <a class="nav-link link-light fw-bold" style="letter-spacing: 2px" href="/Sorting/index.html">SORTING</a>
        </li>
        <li class="nav-item">
            <a class="nav-link link-light fw-bold" style="letter-spacing: 2px" href="/LCS/index.html">LCS</a>
        </li>
        <li class="nav-item">
            <a class="nav-link link-light fw-bold" style="letter-spacing: 2px" href="/TOH/index.html">TOWER OF HANOI</a>
        </li>
        <li class="nav-item">
            <a class="nav-link link-light fw-bold" style="letter-spacing: 2px" href="/BFSandDFS/index.html">BFS & DFS</a>
        </li>
        <li class="nav-item">
            <a class="nav-link link-light fw-bold" style="letter-spacing: 2px" href="/Sudoku/index.html">SUDOKU</a>
        </li>
        </ul>
    </div>
    </div>
</nav>
`;

const elementFromHtml = (html) => {
  const navbar = document.createElement("navbar");
  navbar.innerHTML = html.trim();
  document.body.appendChild(navbar.firstChild);
};

elementFromHtml(html);

let appname = document.getElementById("appname");
let str = "Algorithm Visualizer";
let myflag = true;
for (let i = 0; i < str.length; i++) {
  if (myflag === true) {
    appname.innerHTML += `<span style="font-size: ${18 + i}px;
    color: pink">${str[i]}</span>`;
  }
}
setInterval(function () {
  appname.innerHTML = "";
  for (let i = 0; i < str.length; i++) {
    if (myflag === true) {
      appname.innerHTML += `<span style="font-size: ${18 + i}px;
      color: pink">${str[i]}</span>`;
    } else {
      appname.innerHTML += `<span class="flipH" style="font-size: ${18 + i}px; 
      color: greenyellow;"; >${str[str.length - 1 - i]}</span>`;
    }
  }
  myflag = !myflag;
}, 1000);

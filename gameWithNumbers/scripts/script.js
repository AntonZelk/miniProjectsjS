const btn = document.querySelector("#btn"),
  container = document.querySelector("#container"),
  text = document.querySelector("#text");

const getRandomNumber = (a, b) => {
  let nums = [];
  for (let i = a; i < b; i++) {
    nums.push(i);
  }

  let randomNums = [],
    i = nums.length,
    j = 0;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    randomNums.push(nums[j]);
    nums.splice(j, 1);
  }
  return randomNums;
};

const drawBoard = (container, board, boardCell, textTimer) => {
  const spanBoard = document.createElement("span");
  let counter = 1;
  let numsArray = getRandomNumber(1, 26),
    sizeArray = getRandomNumber(20, 60),
    randomColorArray = getRandomNumber(1, 256);

  board.classList.add("board");
  boardCell.classList.add("board__cell");

  container.append(board);

  for (let i = 0; i < 25; i++) {
    let cell = boardCell.cloneNode(true),
      span = spanBoard.cloneNode(true);
    cell.id = i;
    span.style.fontSize = `${sizeArray[i]}px`;
    span.style.color = `rgb(${randomColorArray[i]},${
      randomColorArray[i + 20]
    },${randomColorArray[i + 30]})`;
    span.innerHTML = numsArray[i];

    board.append(cell);
    cell.append(span);
  }

  board.addEventListener("click", (event) => {
    let div = event.target.closest("div");

    if (!div) return;

    if (!board.contains(div)) return;

    if (counter == div.firstElementChild.textContent) {
      div.style.backgroundColor = "#c00";
      counter++;
    }
    if (counter === 26) {
      clearInterval(timer);
      textTimer.innerHTML = `Вы выиграли`;
    }
  });
};

const startGame = () => {
  const textTimer = document.createElement("p"),
    btnStartOver = document.createElement("btn"),
    board = document.createElement("div"),
    boardCell = document.createElement("div");

  let time = 75;

  const timerFunc = () => {
    time--;
    textTimer.innerHTML = `Времени осталось: ${time}`;
    if (time === -1) {
      textTimer.innerHTML = `Вы проиграли`;
      clearInterval(timer);
      board.remove();
      console.log(textTimer);
    }
  };

  textTimer.classList.add("textTimer");
  textTimer.innerHTML = `Времени осталось: 75`;
  btnStartOver.classList.add("btnStartOver");

  timer = setInterval(timerFunc, 1000);

  btnStartOver.innerHTML = `Начать сначала`;

  container.append(textTimer);
  drawBoard(container, board, boardCell, textTimer);
  container.append(btnStartOver);

  btnStartOver.addEventListener("click", () => {
    clearInterval(timer);
    textTimer.remove();
    board.remove();
    btnStartOver.remove();
    startGame();
  });
};

btn.addEventListener("click", () => {
  btn.style.display = "none";
  text.style.display = "none";

  startGame();
});

let cells = document.querySelectorAll(".cell"),
  board = document.querySelector("#board"),
  btn = document.querySelector(".btn"),
  move = document.querySelector(".move"),
  resultX = document.querySelector("#resultX"),
  resultO = document.querySelector("#resultO"),
  resultDraw = document.querySelector("#resultDraw");

let game = true;
let counterDraw = 0;

let endGame = () => {
  let arrayValues = [];
  let arraySlahes = [];
  let counterResultX = 0;
  let counterResultO = 0;
  let counterResultDraw = 0;

  if (!game) return;

  cells.forEach((cell) => {
    arrayValues.push(cell.firstElementChild.innerHTML);
    arraySlahes.push(cell.lastElementChild.classList);
  });

  let endFunc = (pos1, pos2, pos3, deg) => {
    arraySlahes[pos1].add(`cell__slash_${deg}`);
    arraySlahes[pos2].add(`cell__slash_${deg}`);
    arraySlahes[pos3].add(`cell__slash_${deg}`);
    game = false;
  };

  let conditionFunc = (val, el1, el2, el3, deg) => {
    if (
      arrayValues[el1] === val &&
      arrayValues[el2] === val &&
      arrayValues[el3] === val
    ) {
      if (val === "X") {
        counterResultX++;
        resultX.innerHTML = +resultX.textContent + counterResultX;
        move.innerHTML = "Выиграл: X";
        counterDraw = 0;
      }
      if (val === "O") {
        counterResultO++;
        resultO.innerHTML = +resultO.textContent + counterResultO;
        move.innerHTML = "Выиграл: O";
        counterDraw = 0;
      }
      endFunc(el1, el2, el3, deg);
    }
  };
  let choiceCondition = (value) => {
    conditionFunc(value, 0, 1, 2, 0);
    conditionFunc(value, 3, 4, 5, 0);
    conditionFunc(value, 6, 7, 8, 0);
    conditionFunc(value, 0, 4, 8, 45);
    conditionFunc(value, 0, 3, 6, 90);
    conditionFunc(value, 1, 4, 7, 90);
    conditionFunc(value, 2, 5, 8, 90);
    conditionFunc(value, 2, 4, 6, 135);
  };

  choiceCondition("X");
  choiceCondition("O");

  if (counterDraw === 8 && game === true) {
    counterResultDraw++;
    resultDraw.innerHTML = +resultDraw.textContent + counterResultDraw;
    move.innerHTML = "Ничья";

    game = false;
  }
};

let startGame = () => {
  let flag = true;

  let drawCell = (event) => {
    let cell = event.target.closest("div");

    if (!cell) return;
    if (!game) return;
    if (flag) {
      cell.firstElementChild.innerHTML = "X";
      flag = !flag;
      move.innerHTML = "Ходит: O";
    } else {
      cell.firstElementChild.innerHTML = "O";
      flag = !flag;
      move.innerHTML = "Ходит: X";
    }
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", function clickCell(event) {
      drawCell(event);
      cell.removeEventListener("click", clickCell);
      endGame();
    });
  });
};

btn.addEventListener("click", () => {
  cells.forEach((cell) => {
    cell.firstElementChild.innerHTML = "";
    cell.lastElementChild.classList.remove("cell__slash_0");
    cell.lastElementChild.classList.remove("cell__slash_45");
    cell.lastElementChild.classList.remove("cell__slash_90");
    cell.lastElementChild.classList.remove("cell__slash_135");
  });
  game = true;
  move.innerHTML = "Ходит: X";
  counterDraw = 0;
  startGame();
});

board.addEventListener("click", (event) => {
  let cell = event.target.closest("div");
  if (!cell) return;
  counterDraw++;
  console.log(counterDraw);
});

startGame();

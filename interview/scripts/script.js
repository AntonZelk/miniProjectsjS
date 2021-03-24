const btn = document.querySelector("#btn"),
  questions = document.querySelectorAll(".li"),
  ownInputs = document.querySelectorAll(".own"),
  allInputs = document.querySelectorAll("input"),
  allAnswers = document.querySelectorAll("#answer"),
  results = document.querySelectorAll("#result"),
  listQuestions = document.querySelectorAll(".list2");

const result = [];

let flagHide = true;

const createArray = () => {
  listQuestions.forEach((question) => {
    let array = [];
    result.push(array);
    for (let el of question.children) {
      let miniArr = [];
      array.push(miniArr);
    }
  });
};
createArray();

const supFuncToAddAnswers = (value, numAnswers, numQuestions) => {
  result.forEach((el, j) => {
    if (j === numQuestions) {
      el.forEach((el, i) => {
        if (i === numAnswers) {
          el.push(value);
        }
      });
    }
  });
};

const addAnswers = () => {
  listQuestions.forEach((question, numQuestions) => {
    for (let i = 0; i < question.children.length; i++) {
      let answer = question.children[i].lastElementChild;
      if (answer.checked) {
        supFuncToAddAnswers(answer.value, i, numQuestions);
      } else if (answer.type === "text" && answer.value !== "") {
        supFuncToAddAnswers(answer.value, i, numQuestions);
      }
    }
  });
};

const funcDropAll = () => {
  ownInputs.forEach((input) => {
    input.value = "";
  });
  questions.forEach((question) => {
    question.checked = false;
  });
};

const funcPersent = () => {
  const arrayPercent = [];
  result.forEach((array) => {
    let allNum = 0;
    array.forEach((el) => {
      allNum += el.length;
    });
    array.forEach((el) => {
      let percent = 0;
      if (allNum == 0) {
        percent = (el.length * 100) / 1;
      } else {
        percent = (el.length * 100) / allNum;
      }
      arrayPercent.push(percent);
    });
  });
  addSpanResult(arrayPercent);
};

const addSpanResult = (arrayPercent) => {
  allAnswers.forEach((answer, i) => {
    let newSpan = document.createElement("span");
    newSpan.id = "deleteThisSpan";
    if (arrayPercent[i] !== 0) {
      newSpan.innerHTML = ` (${Math.round(arrayPercent[i])}%)`;
    }

    answer.append(newSpan);
  });
};

const deleteSpanResult = () => {
  let spans = document.querySelectorAll("#deleteThisSpan");
  spans.forEach((span) => {
    span.remove();
  });
};

const funcHide = () => {
  funcPersent();
  if (flagHide) {
    btn.innerHTML = "Пройти опрос заново";

    allInputs.forEach((input) => {
      input.style.display = "none";
    });
    results.forEach((result) => {
      result.innerHTML = "Другие ответы";
    });

    flagHide = false;
  } else {
    deleteSpanResult();
    btn.innerHTML = "Показать результат";

    allInputs.forEach((input) => {
      input.style.display = "inline-block";
    });
    results.forEach((result) => {
      result.innerHTML = "Свой ответ";
    });
    flagHide = true;
  }
};

btn.addEventListener("click", () => {
  addAnswers();
  funcDropAll();
  funcHide();
});

ownInputs.forEach((input, i) => {
  input.addEventListener("focus", () => {
    for (let el of listQuestions[i].children) {
      el.lastElementChild.checked = false;
    }
  });
});

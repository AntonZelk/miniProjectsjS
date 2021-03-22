const radioBtns = document.querySelectorAll("input"),
  lies = document.querySelectorAll("#li"),
  btn = document.querySelector("#btn");

const numQuestions = 3,
  numAnswerOptions = 9;

let counter = 0;

lies[counter].style.display = "block";

const funcPercent = (n) => {
  return n + ` (${Math.round((n / numQuestions) * 100)}%)`;
};

const supFunc = (counter, numQuestions, numAnswerOptions) => {
  counter = counter - numAnswerOptions + numQuestions;
  return counter;
};

const funcCheck = () => {
  let counterRight = 0;
  let counterWrong = 0;
  let counterNoAnswers = 0;

  radioBtns.forEach((radio) => {
    if (radio.checked && radio.id === "questionRight") {
      counterRight++;
    } else if (radio.checked && radio.id !== "questionRight") {
      counterWrong++;
    } else if (!radio.checked) {
      counterNoAnswers++;
    }
  });

  let message = `Правильных ответов: ${funcPercent(counterRight)}
Неправильных ответов: ${counterWrong}
Без ответа: ${supFunc(counterNoAnswers, numQuestions, numAnswerOptions)}`;

  alert(message);
};

const funcNextQuestions = () => {
  lies[counter].style.display = "none";
  lies[counter + 1].style.display = "block";
  counter++;
  console.log(counter);
  console.log(lies.length);
};

btn.addEventListener("click", () => {
  if (counter === lies.length - 2) {
    btn.innerHTML = "Проверка";
  }
  if (counter !== lies.length - 1) {
    funcNextQuestions();
  } else {
    funcCheck();
  }
});

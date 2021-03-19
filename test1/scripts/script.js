const radioBtns = document.querySelectorAll("input"),
  btn = document.querySelector("#btn");

const numQuestions = 3,
  numAnswerOptions = 9;

const funcPercent = (n) => {
  return n + ` (${Math.round((n / numQuestions) * 100)}%)`;
};

const supFunc = (counter, numQuestions, numAnswerOptions) => {
  counter = counter - numAnswerOptions + numQuestions;
  return counter;
};

btn.addEventListener("click", () => {
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
});

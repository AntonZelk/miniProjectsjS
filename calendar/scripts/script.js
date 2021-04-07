const daysBlock = document.querySelector("#daysBlock"),
  numbersBlock = document.querySelector("#numbersBlock"),
  monthName = document.querySelector("#month"),
  back = document.querySelector("#back"),
  next = document.querySelector("#next"),
  yearName = document.querySelector("#year");

const dayArray = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  monthArray = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

for (let i = 0; i < 7; i++) {
  let day = document.createElement("div");
  day.innerHTML = dayArray[i];
  daysBlock.append(day);
}

let dateNow = new Date();
let year = dateNow.getFullYear();
let month = dateNow.getMonth();
let numDay = dateNow.getDate();
let day = dateNow.getDay();

const curMonth = month;
const curYear = year;

const getDayFirstNumber = () => {
  let day = new Date(year + "-" + (month + 1) + "-01").getDay();
  day = day === 0 ? 7 : day;
  return day;
};

const getNameMonth = () => {
  for (let i = 0; i < 12; i++) {
    if (month === i) {
      monthName.innerHTML = monthArray[i];
    }
  }
};

const daysInMonth = (month, year) => {
  let days;
  switch (month) {
    case 1:
      let leapYear = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
      days = leapYear ? 29 : 28;
      break;
    case 3:
    case 5:
    case 8:
    case 10:
      days = 30;
      break;
    default:
      days = 31;
  }
  return days;
};

const getPrevDaysInMonth = (month, year, firstDay) => {
  let previosDaysInMonth = 0;

  if (month === 0) {
    month = 11;
    previosDaysInMonth = daysInMonth(month, year - 1);
  } else {
    previosDaysInMonth = daysInMonth(month - 1, year);
  }
  let arrayPrevDays = [];

  for (let i = previosDaysInMonth; i > previosDaysInMonth - firstDay + 1; i--) {
    arrayPrevDays.push(i);
  }
  arrayPrevDays.reverse();

  return arrayPrevDays;
};

const getArrrayDaysInMonth = (month, year) => {
  let arrayDaysInMonth = [];

  let days = daysInMonth(month, year);

  for (let i = 1; i <= days; i++) {
    arrayDaysInMonth.push(i);
  }

  return arrayDaysInMonth;
};

const addDaysToDiv = (
  array,
  classDay,
  i,
  numDay,
  month,
  curMonth,
  year,
  curYear
) => {
  let dayNumber = document.createElement("div");
  if (i !== numDay - 1) {
    dayNumber.classList.add(classDay);
    dayNumber.innerHTML = array[i];
  } else if (month === curMonth && year === curYear) {
    dayNumber.classList.add("curDay");
    dayNumber.innerHTML = array[i];
  } else {
    dayNumber.classList.add(classDay);
    dayNumber.innerHTML = array[i];
  }

  dayNumber.id = "delete";

  numbersBlock.append(dayNumber);
};

const drawDays = (arrayPrevDays, firstDay, arrayDaysInMonth, numDay) => {
  let arrayNextDaysInMonth = [];

  for (
    let i = 1;
    i <= 42 - arrayDaysInMonth.length - arrayPrevDays.length;
    i++
  ) {
    arrayNextDaysInMonth.push(i);
  }

  for (let i = 0; i < firstDay - 1; i++) {
    addDaysToDiv(arrayPrevDays, "prevNumbers", i);
  }
  for (let i = 0; i <= arrayDaysInMonth.length - 1; i++) {
    addDaysToDiv(
      arrayDaysInMonth,
      "curNumbers",
      i,
      numDay,
      month,
      curMonth,
      year,
      curYear
    );
  }
  for (let i = 0; i <= arrayNextDaysInMonth.length - 1; i++) {
    addDaysToDiv(arrayNextDaysInMonth, "prevNumbers", i);
  }
};
drawDays(
  getPrevDaysInMonth(month, year, getDayFirstNumber()),
  getDayFirstNumber(),
  getArrrayDaysInMonth(month, year),
  numDay,
  month,
  curMonth,
  year,
  curYear
);
getNameMonth();

yearName.innerHTML = year;

const clearCalendar = () => {
  let daysForDelete = document.querySelectorAll("#delete");
  for (let el of daysForDelete) {
    el.remove();
  }
};

back.addEventListener("click", () => {
  clearCalendar();
  month--;

  if (month === -1) {
    month = 11;
    year--;
    yearName.innerHTML = year;
  }
  getNameMonth();

  drawDays(
    getPrevDaysInMonth(month, year, getDayFirstNumber()),
    getDayFirstNumber(),
    getArrrayDaysInMonth(month, year),
    numDay,
    month,
    curMonth,
    year,
    curYear
  );
});
next.addEventListener("click", () => {
  clearCalendar();

  month++;

  if (month === 12) {
    month = 0;
    year++;
    yearName.innerHTML = year;
  }

  getNameMonth();

  drawDays(
    getPrevDaysInMonth(month, year, getDayFirstNumber()),
    getDayFirstNumber(),
    getArrrayDaysInMonth(month, year),
    numDay,
    month,
    curMonth,
    year,
    curYear
  );
});

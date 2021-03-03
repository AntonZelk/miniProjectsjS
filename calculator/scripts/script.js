const cursor = document.querySelector("#cursor"),
  btns = document.querySelectorAll(".button"),
  newMenu = document.querySelector("#newBtn"),
  btnHistory = document.querySelector("#history"),
  otherBtns = document.querySelectorAll(".but");

const allBtn = [...btns, ...otherBtns];

const tick = () => {
  if (cursor.style.display == "block") {
    cursor.style.display = "none";
  } else {
    cursor.style.display = "block";
  }
};

const timer = setInterval(tick, 500);

let changeBtns = (btn) => {
  btn.forEach((el) => {
    el.addEventListener("click", () => {
      btn.forEach((el) => {
        el.style.borderColor = "rgb(117, 115, 115)";
      });
      el.style.borderColor = "rgb(117, 228, 132)";
    });
  });
};

let noneBtns = (click, btns, otherBtns, flex, none) => {
  let flag = true;
  click.addEventListener("click", () => {
    if (flag) {
      otherBtns.forEach((el) => {
        el.style.display = flex;
        btns.forEach((el) => {
          el.style.display = none;
          el.style.borderColor = "rgb(117, 115, 115)";
        });
      });
      flag = false;
    } else {
      btns.forEach((el) => {
        el.style.display = flex;
        otherBtns.forEach((el) => {
          el.style.display = none;
          el.style.borderColor = "rgb(117, 115, 115)";
        });
      });
      flag = true;
    }
  });
};

let funcHistory = (btn) => {
  btn.forEach((el) => {
    el.style.display = "none";
  });
};
changeBtns(allBtn);
noneBtns(newMenu, btns, otherBtns, "flex", "none");
btnHistory.addEventListener("click", () => {
  funcHistory(allBtn);
});

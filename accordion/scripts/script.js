let languages = document.querySelectorAll(".menu__name");

languages.forEach((el) => {
  el.addEventListener("click", () => {
    languages.forEach((element) => {
      if (element !== el) {
        element.classList.remove("active");
      }
    });
    el.classList.toggle("active");

    languages.forEach((el) => {
      let text = el.nextElementSibling;
      if (el.classList.contains("active")) {
        text.style.maxHeight = text.scrollHeight + "px";
      } else {
        text.style.maxHeight = null;
      }
    });
  });
});

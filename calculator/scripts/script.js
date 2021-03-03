let cursor = document.querySelector("#cursor");

let timer = setTimeout(() => {
  cursor.style.display = "block";
  let tick = setInterval(() => {
    cursor.style.display = "none";
  }, 1000);
}, 1000);

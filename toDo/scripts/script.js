const addTask = document.querySelector("#addTask"),
  list = document.querySelector("#list");

const createTask = () => {
  let li = document.createElement("li");
  let checkbox = document.createElement("input");
  let span = document.createElement("span");
  let spanForValue = document.createElement("span");
  let div = document.createElement("div");

  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.addEventListener("click", () => {
    spanForValue.style.textDecoration = "line-through";
    checkbox.remove();
  });

  span.classList.add("closeTask");
  span.id = "closeTask";
  span.textContent = "X";

  spanForValue.textContent = addTask.value;
  spanForValue.addEventListener("dblclick", () => {
    let newInput = document.createElement("input");

    newInput.classList.add("newInput");
    newInput.value = spanForValue.textContent;
    newInput.focus();

    newInput.addEventListener("change", () => {
      spanForValue.innerHTML = newInput.value;
      newInput.remove();
      spanForValue.style.display = "inline-block";
      console.log("hi");
    });
    spanForValue.style.display = "none";
    checkbox.after(newInput);
  });

  div.classList.add("wrapCloseTask");
  div.addEventListener("click", () => {
    li.remove();
  });

  div.append(span);
  li.append(checkbox);
  li.append(spanForValue);
  li.append(div);
  list.prepend(li);
};

addTask.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createTask();
    addTask.value = "";
    addTask.blur();
  }
});

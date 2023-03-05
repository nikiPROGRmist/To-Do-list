const input = document.querySelector("input");
const btn = document.querySelector(".add__btn");
const item = document.querySelector(".toDo__item");
const icon = document.querySelector(".toDO__icon");

let toDOIten = [];

if (localStorage.getItem("toDo")) {
  toDOIten = JSON.parse(localStorage.getItem("toDo"));
  displayMessage();
}

btn.addEventListener("click", function () {
  newToDo = {
    input: input.value,
    checked: false,
    importand: false,
  };

  toDOIten.push(newToDo);
  displayMessage();
  localStorage.setItem("toDo", JSON.stringify(toDOIten));
});

function displayMessage(e) {
  if (toDOIten.length > 0) {
    icon.style.display = "block";
  } else {
    icon.style.display = "none";
  }

  icon.innerHTML = "";
  toDOIten.forEach((item, i) => {
    icon.innerHTML += `
     <div class="toDo__item">
       <input class ="check__btn" type ="checkbox" id ="check__${i}" ${
      item.checked ? "checked" : ""
    }>
      <label class = ${item.importand ? "importand" : ""} for="check__${i}">${item.input}</label>
      <button class ="delete">delete</button>
      `;

    document.querySelectorAll(".delete").forEach((item, index) => {
      item.addEventListener("click", function () {
        toDOIten.splice(index, 1);
        displayMessage();
        localStorage.setItem("toDo", JSON.stringify(toDOIten));
      });
    });
  });
}

icon.addEventListener("change", function (e) {
  const forLabel = document.querySelector(`[for = ${e.target.getAttribute("id")}]`).innerHTML;
  toDOIten.forEach((item) => {
    if (item.input === forLabel) {
      item.checked = !item.checked;
      localStorage.setItem("toDo", JSON.stringify(toDOIten));
    }
  });
});

icon.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  toDOIten.forEach((item) => {
    if (item.input === e.target.innerHTML) {
      item.importand = !item.importand;
      displayMessage();
      localStorage.setItem("toDo", JSON.stringify(toDOIten));
    }
  });
});

const inp = document.querySelector("input");

const btn = document.querySelector("#add");
const todoBox = document.querySelector(".todo-List");

// btn.addEventListener("click", () => {
//   const value = inp.value;
//   if (value.trim()=='') return;
//   todoBox.innerHTML += ` <div class="li">
//           <h3>${inp.value}</h3>
//           <div>
//             <button class="btn edit">Edit</button>
//             <button class="btn del" >Delete</button>
//           </div>
//         </div>`;
//   inp.value = "";
// });

let currentTodo = null;
btn.addEventListener("click", () => {
  const value = inp.value;
  if (currentTodo) {
    currentTodo.textContent = value;
    currentTodo = null;
    inp.value = "";
    return;
  }
  if (value.trim() === "") return;
  let box = document.createElement("div");
  let h3 = document.createElement("h3");
  h3.textContent = value;
  let div = document.createElement("div");
  let edit = document.createElement("button");
  let del = document.createElement("button");
  box.classList.add("li");
  box.append(h3);
  edit.textContent = "Edit";
  del.textContent = "Delete";
  edit.classList.add("edit");
  edit.classList.add("btn");
  del.classList.add("btn");
  del.classList.add("del");
  div.append(edit);
  div.append(del);
  box.append(div);

  todoBox.append(box);
  inp.value = "";
  del.addEventListener("click", () => {
    box.remove();
  });
  edit.addEventListener("click", () => {
    inp.value = h3.textContent;
    currentTodo = h3;
  });
});

// make this via create Element
// complete the edit and delete functionality
// dont use ai
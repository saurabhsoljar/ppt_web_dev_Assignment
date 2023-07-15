let submit = document.getElementById("button");
let currentID = 1; // Variable to track the current unique ID for new cards

// Function to save the to-do items in local storage
const saveToDos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to retrieve the to-do items from local storage
const getToDos = () => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

submit.addEventListener("click", () => {
  let input = document.getElementById("note").value;

  let div = document.createElement("div");
  div.classList.add("container");

  let pTag = document.createElement("p");
  pTag.classList.add("my-note");
  pTag.textContent = input;
  div.appendChild(pTag);

  let status = document.createElement("p");
  status.textContent = "Status: Pending";
  div.appendChild(status);

  let removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  div.appendChild(removeBtn);

  let markCompleteBtn = document.createElement("button");
  markCompleteBtn.classList.add("mrk");
  markCompleteBtn.textContent = "Mark Completed";
  div.appendChild(markCompleteBtn);

  let editBtn = document.createElement("button");
  editBtn.textContent = "Edit Note";
  div.appendChild(editBtn);

  let isCompleted = false;
  let cardID = currentID; // Assign the current unique ID to the card
  currentID++; // Increment the unique ID for the next card

  markCompleteBtn.addEventListener("click", () => {
    isCompleted = !isCompleted;

    if (isCompleted) {
      status.textContent = "Status: Completed";
      markCompleteBtn.textContent = "Mark Pending";
      markCompleteBtn.classList.toggle("completed");
    } else {
      status.textContent = "Status: Pending";
      markCompleteBtn.textContent = "Mark Completed";
      markCompleteBtn.classList.toggle("completed");
    }
  });

  removeBtn.addEventListener("click", () => {
    div.remove();
    // Update and save the to-do items in local storage after removing an item
    const todos = getToDos().filter((todo) => todo.id !== cardID);
    saveToDos(todos);
  });

  editBtn.addEventListener("click", () => {
    // Create a separate div for editing
    let editDiv = document.createElement("div");
    editDiv.classList.add("edit-container");

    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = pTag.textContent;
    editDiv.appendChild(editInput);

    let updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    editDiv.appendChild(updateBtn);

    let closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    editDiv.appendChild(closeBtn);

    div.appendChild(editDiv);

    pTag.style.display = "none";
    editBtn.style.display = "none";

    updateBtn.addEventListener("click", () => {
      pTag.textContent = editInput.value;
      pTag.style.display = "block";
      editBtn.style.display = "block";
      editDiv.remove();

      // Update and save the to-do items in local storage after editing an item
      const todos = getToDos().map((todo) => {
        if (todo.id === cardID) {
          return { id: cardID, note: pTag.textContent };
        }
        return todo;
      });
      saveToDos(todos);
    });

    closeBtn.addEventListener("click", () => {
      pTag.style.display = "block";
      editBtn.style.display = "block";
      editDiv.remove();
    });
  });

  let container = document.getElementById("todo-container");
  container.appendChild(div);

  document.getElementById("note").value = "";

  // Add the new item to the existing to-do items and save in local storage
  const todos = getToDos();
  todos.push({ id: cardID, note: input });
  saveToDos(todos);
});

// Retrieve the saved to-do items from local storage on page load
window.addEventListener("DOMContentLoaded", () => {
  const todos = getToDos();
  todos.forEach((todo) => {
    let div = document.createElement("div");
    div.classList.add("container");

    let pTag = document.createElement("p");
    pTag.classList.add("my-note");
    pTag.textContent = todo.note;
    div.appendChild(pTag);

    let status = document.createElement("p");
    status.textContent = "Status: Pending";
    div.appendChild(status);

    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    div.appendChild(removeBtn);

    let markCompleteBtn = document.createElement("button");
    markCompleteBtn.classList.add("mrk");
    markCompleteBtn.textContent = "Mark Completed";
    div.appendChild(markCompleteBtn);

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit Task";
    div.appendChild(editBtn);

    let isCompleted = false;
    let cardID = todo.id; // Retrieve the unique ID for the card

    markCompleteBtn.addEventListener("click", () => {
      isCompleted = !isCompleted;

      if (isCompleted) {
        status.textContent = "Status: Completed";
        markCompleteBtn.textContent = "Mark Pending";
        markCompleteBtn.classList.toggle("completed");
      } else {
        status.textContent = "Status: Pending";
        markCompleteBtn.textContent = "Mark Completed";
        markCompleteBtn.classList.toggle("completed");
      }
    });

    removeBtn.addEventListener("click", () => {
      div.remove();
      // Update and save the to-do items in local storage after removing an item
      const updatedTodos = getToDos().filter((todoItem) => todoItem.id !== cardID);
      saveToDos(updatedTodos);
    });

    editBtn.addEventListener("click", () => {
      // Create a separate div for editing
      let editDiv = document.createElement("div");
      editDiv.classList.add("edit-container");

      let editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = pTag.textContent;
      editInput.style.height = "40px";
      editInput.style.width = "280px";
      editInput.style.borderRadius = "10px";
      editInput.style.border = "none";
      editInput.style.padding = "10px";
      editInput.style.fontSize = "16px";
      editInput.style.outline = "none";
      editDiv.appendChild(editInput);

      let updateBtn = document.createElement("button");
      updateBtn.textContent = "Update";
      editDiv.appendChild(updateBtn);

      let closeBtn = document.createElement("button");
      closeBtn.textContent = "Close";
      editDiv.appendChild(closeBtn);

      div.appendChild(editDiv);

      pTag.style.display = "none";
      editBtn.style.display = "none";

      updateBtn.addEventListener("click", () => {
        pTag.textContent = editInput.value;
        pTag.style.display = "block";
        editBtn.style.display = "block";
        editDiv.remove();

        // Update and save the to-do items in local storage after editing an item
        const updatedTodos = getToDos().map((todoItem) => {
          if (todoItem.id === cardID) {
            return { id: cardID, note: pTag.textContent };
          }
          return todoItem;
        });
        saveToDos(updatedTodos);
      });

      closeBtn.addEventListener("click", () => {
        pTag.style.display = "block";
        editBtn.style.display = "block";
        editDiv.remove();
      });
    });

    let container = document.getElementById("todo-container");
    container.appendChild(div);
  });
});





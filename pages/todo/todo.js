const todoInput = document.querySelector(".todo-input");
const priority = document.querySelector(".priority");
const addButton = document.querySelector(".add-button");
const todoList = document.querySelector(".todo-list");

let todoValue = todoInput.value;
let priorityValue = priority.value;

const handleTodoInput = (e) => {
  todoValue = e.target.value;
};

const handlePriority = (e) => {
  priorityValue = e.target.value;
};

const handleAddTodo = () => {
  if (todoValue === "") {
    alert("할 일을 작성해주세요");
    return;
  }

  if (priorityValue === "") {
    alert("우선순위를 지정해주세요");
    return;
  }

  handleTodoList();
  handleResetInput();
};

const handleResetInput = () => {
  todoValue = "";
  priorityValue = "";
  todoInput.value = "";
  priority.value = "";
};

const handleTodoList = () => {
  const todoItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const todoText = document.createElement("input");
  const todoPriority = document.createElement("span");

  todoItem.className = "todo-item";
  checkBox.className = "todo-check";
  todoText.className = "todo-text";
  todoPriority.className = "todo-priority";

  checkBox.type = "checkBox";
  todoText.value = todoValue;
  todoPriority.textContent = priorityValue;

  todoItem.appendChild(checkBox);
  todoItem.appendChild(todoText);
  todoItem.appendChild(todoPriority);
  todoList.appendChild(todoItem);
};

todoInput.addEventListener("input", handleTodoInput);
priority.addEventListener("change", handlePriority);
addButton.addEventListener("click", handleAddTodo);

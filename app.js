let toDo = document.getElementById("input")
let addToDo = document.getElementById("addToDo")
let toDoList = document.getElementById("list")
let ToDoDeletes = document.querySelectorAll(".delete")

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(todo => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;
        if (todo.completed) span.classList.add("completed");

        const btn = document.createElement("button");
        btn.className = "delete";
        btn.textContent = "Delete";

        li.append(span, btn);
        toDoList.appendChild(li);
    });
}

loadTodos();


addToDo.addEventListener("click", () => {
    let check = toDo.value
    if (toDo.value != "") {
        toDoList.innerHTML = toDoList.innerHTML + ` <li>
                        <span class="todo-text">${check}</span>
                        <button class="delete">Delete</button>
                    </li>`
        toDo.value = ""
        saveTodos();
    }
})

toDoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        saveTodos();
    }
});

toDoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("todo-text")) {
        e.target.classList.toggle("completed");
        saveTodos();
    }
});

function saveTodos() {
    const todos = [];
    document.querySelectorAll(".todo-text").forEach(todo => {
        todos.push({
            text: todo.textContent,
            completed: todo.classList.contains("completed")
        });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}


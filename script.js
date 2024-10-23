function loadTodos() {
    // This function will load the todos from the browser
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList": []};
    console.log(todos);
    return todos;
}

function addTodoToLocalStorage(todo) {
    const todos = loadTodos();
    todos.todoList.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// function executeFilterAction(event){
//     const todoList = document.getElementById("todoList");
//     const element = event.target
//     const value = element.getAttribute('data-filter')
//     todoList.innerHTML = ''
//     const todos = loadTodos()
//     if(value == "all"){
//         todos.todoList.forEach(todo => {
//             appendTodoInHtml(todo)
//          })
//     }
//     else if(value == "pending"){
//         todos.todoList.forEach(todo => {
//             if (todo.isCompleted != true){
//                 appendTodoInHtml(todo)
//             }
//          })
//     }
//     else{
//         todos.todoList.forEach(todo => {
//             if (todo.isCompleted == true){
//                 appendTodoInHtml(todo)
//             }
//          })
//     }
        
// }

function executeFilterAction(event) {
    const todoList = document.getElementById("todoList");
    const element = event.target;
    const value = element.getAttribute('data-filter');

    // Remove the 'active' class from all filter buttons
    const filterBtns = document.getElementsByClassName("filterbtn");
    for (const btn of filterBtns) {
        btn.classList.remove('active');
    }

    // Add the 'active' class to the clicked filter button
    element.classList.add('active');

    todoList.innerHTML = ''; // Clear current list
    const todos = loadTodos(); // Load todos from localStorage

    if (value == "all") {
        todos.todoList.forEach(todo => appendTodoInHtml(todo));
    } else if (value == "pending") {
        todos.todoList.forEach(todo => {
            if (!todo.isCompleted) appendTodoInHtml(todo);
        });
    } else if (value == "completed") {
        todos.todoList.forEach(todo => {
            if (todo.isCompleted) appendTodoInHtml(todo);
        });
    }
}

function toggleTodoCompletion(todoText) {
    const todos = loadTodos();
    todos.todoList.forEach(todo => {
        if (todo.text === todoText) {
            todo.isCompleted = !todo.isCompleted; // Toggle completion status
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos)); // Save updated todos in localStorage
}

function deleteTodoFromLocalStorage(todoText) {
    let todos = loadTodos();
    todos.todoList = todos.todoList.filter(todo => todo.text !== todoText); // Filter out the deleted todo
    localStorage.setItem("todos", JSON.stringify(todos)); // Update the local storage
}

function editTodoInLocalStorage(oldText, newText) {
    const todos = loadTodos();
    todos.todoList.forEach(todo => {
        if (todo.text === oldText) {
            todo.text = newText; // Update the text of the matching todo
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos)); // Save the updated todos back to localStorage
}





function appendTodoInHtml(todo) {
    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("li");

    const textDiv = document.createElement("div")

    textDiv.textContent = todo.text;
    todoItem.classList.add("todoItem")
    
    if (todo.isCompleted) {
        todoItem.classList.add("completed");
    }

    const wrapper = document.createElement("div")
    wrapper.classList.add("todoButtons")
    
    const editBtn = document.createElement("button")
    editBtn.textContent = "Edit"
    editBtn.classList.add("editBtn")

    const deleteBtn = document.createElement("button")
    deleteBtn.textContent = "Delete"
    deleteBtn.classList.add("deleteBtn")
    
    const completedBtn = document.createElement("button")
    completedBtn.textContent = "Completed"
    completedBtn.classList.add("completedBtn")

    todoItem.appendChild(textDiv)
    todoItem.appendChild(wrapper)

    wrapper.appendChild(editBtn)
    wrapper.appendChild(deleteBtn)
    wrapper.appendChild(completedBtn)

    todoList.appendChild(todoItem)

     // Add event listener for Completed button
     completedBtn.addEventListener("click", () => {
        toggleTodoCompletion(todo.text); // Toggle the completion status in storage

        // After toggling, reapply the filter to update the list based on the current filter
        const currentFilter = document.querySelector('.filterbtn.active').getAttribute('data-filter');
        executeFilterAction({ target: { getAttribute: () => currentFilter } });
    });

    // Add event listener for Delete button
    deleteBtn.addEventListener("click", () => {
        deleteTodoFromLocalStorage(todo.text); // Delete the todo from localStorage
        const currentFilter = document.querySelector('.filterbtn.active').getAttribute('data-filter');
        executeFilterAction({ target: { getAttribute: () => currentFilter } }); // Reapply current filter
    });

    // Add event listener for Edit button
    editBtn.addEventListener("click", () => {
        const newText = prompt("Edit your todo:", todo.text); // Prompt user for new text
        if (newText && newText.trim() !== "") {
            editTodoInLocalStorage(todo.text, newText.trim()); // Update localStorage with the new text
            const currentFilter = document.querySelector('.filterbtn.active').getAttribute('data-filter');
            executeFilterAction({ target: { getAttribute: () => currentFilter } }); // Reapply current filter
        }
    });
    
}



document.addEventListener("DOMContentLoaded", () => {

    const todoInput = document.getElementById("todoInput");

    const submitButton = document.getElementById("addTodo");

    const todoList = document.getElementById("todoList");

    const filterBtn = document.getElementsByClassName("filterbtn")

    for(const btn of filterBtn){
        btn.addEventListener("click", executeFilterAction)
    }
    submitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value;
        if(todoText == '') {
            alert("Please write something for the todo");
        } else {
            addTodoToLocalStorage({text:todoText, isCompleted:false});
            appendTodoInHtml({text:todoText, isCompleted:false});
            todoInput.value = '';
        }

    });

    todoInput.addEventListener("change", (event) => {
        // This call back method is fired everytime there is a change in the input tag
        const todoText = event.target.value;

        event.target.value = todoText.trim();

        console.log(event.target.value)
        
    });

    const todos = loadTodos();

    todos.todoList.forEach(todo => {
       appendTodoInHtml(todo)
    })
});


//github sankettsingh
// https://github.com/singhsanket143/Dom-Manipulation-Todo-List/blob/master/style.css
function getCookieValue(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null; 
}  // cooki ucun 
const token = getCookieValue('token');


let todoCollection=[];

document.addEventListener("DOMContentLoaded", () => {
    
    if (!token) {
        console.error("No access token found. Redirecting to login page.");
        window.location.href = "/index.html"; 
        return;
    }

    fetch('http://localhost:5001/todos', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.ok ? response.json() : Promise.reject("Failed to fetch todos"))
    .then(todos => {
        todoCollection = [...todos]; 
        console.log(todoCollection);
        const todoList = document.getElementById("todoList");
        todos.forEach(todo => {
            const listItem = document.createElement("li");
            
            listItem.textContent = todo.title;
            listItem.className = "todo-item";
            listItem.innerHTML = `
                ${listItem.textContent}
                <button class="todo-delete-button" onclick="deleteTodo('${todo._id}',this)"><i class="fa-solid fa-trash" style="color: #B197FC;"></i></button>
            `;
            todoList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error("Error fetching todos:", error);
    });
});


function addTodo() {
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
    const taskText = todoInput.value.trim();
   

    if (!token) {
        console.error("No access token found. Redirecting to login page.");
        window.location.href = "/index.html"; 
        return;
    }
    fetch('http://localhost:5001/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
           title:taskText
        })
    })
    .then(response => {
        if (!response.ok) {
           throw new Error("No respond ok")
        }
        return response.json();
    })
    if (taskText !== "") {
        const todoItem = document.createElement("li");
        todoItem.className = "todo-item";
        todoItem.innerHTML = `
        ${taskText}
        <button class="todo-delete-button"><i class="fa-solid fa-trash" style="color: #B197FC;"></i></button>
    `;

        todoList.appendChild(todoItem);
        todoInput.value = "";
    }

}

async function deleteTodo(id, button) {
    const todoItem = button.parentElement;

    try {
       
        const response = await fetch(`http://localhost:5001/todos/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("Failed to delete todo");
        }

        
        todoItem.remove();
        todoCollection = todoCollection.filter(todo => todo._id !== id);
        console.log("Updated Todo Collection:", todoCollection);

    } catch (e) {
        console.error(`Error: ${e}`);
    }
}

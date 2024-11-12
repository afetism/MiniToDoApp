function getAccessTokenCookie() {
    const name = "access_token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name)) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    
    return null; 
}

document.addEventListener("DOMContentLoaded", () => {
    const token = getAccessTokenCookie();

    if (!token) {
        console.error("No access token found. Redirecting to login page.");
        window.location.href = "/login.html"; 
        return;
    }

    fetch('http://localhost:5001/api/todos', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.ok ? response.json() : Promise.reject("Failed to fetch todos"))
    .then(todos => {
        const todoList = document.getElementById("todoList");
        todos.forEach(todo => {
            const listItem = document.createElement("li");
            
            listItem.textContent = todo.title;
            listItem.className = "todo-item";
            listItem.innerHTML = `
                ${listItem.textContent}
                <button class="todo-delete-button" onclick="deleteTodo(this)">🗑️</button>
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
    const token = getAccessTokenCookie();

    if (!token) {
        console.error("No access token found. Redirecting to login page.");
        window.location.href = "/login.html"; 
        return;
    }
    fetch('http://localhost:5001/api/todos', {
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
            <button class="todo-delete-button" onclick="deleteTodo(this)">🗑️</button>
        `;
        todoList.appendChild(todoItem);
        todoInput.value = "";
    }

}

function deleteTodo(button) {
    const todoItem = button.parentElement;
    
    todoItem.remove();
}
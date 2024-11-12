function showLogin() {
    document.getElementById("registerContainer").style.display = "none";
    document.getElementById("loginContainer").style.display = "block";
  }

  function showRegister() {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("registerContainer").style.display = "block";
  }

  function register() {
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    console.log("Registering:", { username, email, password });
    
    fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        return response.json();
    })
    .then(data => {
        console.log("Registration successful:", data);
       
        if (data.token) {
            document.cookie = `access_token=${data.token}; path=/; secure; HttpOnly; SameSite=Strict; max-age=3600`;
        }
        window.location.href="/ToDo.html"
    })
    .catch(error => {
        console.error("Error during registration:", error);
    });
}
function getAccessTokenCookie() {
    const name = "access_token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

  function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    console.log("Logging in:", { username, password });
    const token = getAccessTokenCookie();
  }

const showLogin=()=>
{
    document.getElementById('registerContainer').style.display='none';
    document.getElementById('loginContainer').style.display='block';
    
}

const showRegister=()=>
{
    document.getElementById('registerContainer').style.display='block';
    document.getElementById('loginContainer').style.display='none';
}
let dataArray=[];

const login = async()=>
{
   const loginEmail=document.getElementById('loginEmail').value;
   const loginPassword=document.getElementById('loginPassword').value;

   const myHeaders=new Headers();
   myHeaders.append("Content-Type","application/json");
   await fetch("http://localhost:5001/users/login",{
      method:"POST",
      body:JSON.stringify({
        email: loginEmail,
        password: loginPassword}),
      headers:myHeaders
   })
   .then(response=>
        {
            if(!response.ok)
                throw new Error("Login Fail");

            return response.json();
        }
    )
    .then(data=>
    {
         document.cookie=`token=${data.token}; path=/; max-age=3600`;
         window.location.href="/ToDoFront/ToDo.html"
    })
    .catch(error=>
    {
          console.error("An error occurred:", error);
    });
}


const register=async()=>
{
    const registerUsername=document.getElementById('registerUsername').value;
    const registerEmail=document.getElementById('registerEmail').value;
    const registerPassword=document.getElementById('registerPassword').value;
 
    const myHeaders=new Headers();
    myHeaders.append("Content-Type","application/json");
    await fetch("http://localhost:5001/users/register",{
      method:"POST",
      body:JSON.stringify({
        username: registerUsername,
        email: registerEmail,
        password: registerPassword

      }),
      headers:myHeaders
    })
    .then(r=>{
        if(!r.ok)
            throw new Error("Error");
        return r.json();
    })
    .then(data=>{
        document.cookie=`token=${data.token}; path=/; max-age=3600`;
        window.location.href="/ToDoFront/ToDo.html"
    })
    .catch(error=>
    {
          console.error("An error occurred:", error);
    });
}
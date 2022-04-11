//get data
const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const success = document.querySelector("#success");
const errorNodes = document.querySelectorAll(".error");


const btn = document.querySelector("button");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");
     

//validate function 
function validateForm(){

    clearMessage();
    errorFlag = false;

    if(nameInput.value.length < 3){
        errorNodes[0].innerText = "Name can not be empty";
        nameInput.classList.add("error-border");
        errorFlag = true;
    }

    if(!emailIsValid(email.value)){
        errorNodes[1].innerText = "Invalid email address";
        email.classList.add("error-border");
        errorFlag = true;
    }

    if(message.value.length < 2){
        errorNodes[2].innerText = "Your genuine feedback is appreciated";
        message.classList.add("error-border");
        errorFlag = true;
    }

    const starInputs = document.querySelectorAll('input[name="rating"]');
    for (const starInput of starInputs){
        if(starInput.checked){
            starSelected = starInput.value;
            break;
        }
    }
    console.log(starSelected);
        

    if (!errorFlag){
        success.innerText = "success!"
        alert("Hello, "+(nameInput.value)+",Thank you very much for your feedback\n"+"You rated "+(starSelected)+" and your feedback was "+ (message.value));
        document.getElementById("myform").reset();
    }

    btn.onclick = ()=>{
        widget.style.display = "none";
        post.style.display = "block";
        editBtn.onclick = ()=>{
          widget.style.display = "block";
          post.style.display = "none";
        }
        return false;
      }   
}


//clear error messages
function clearMessage(){
    for(let i = 0; i < errorNodes.length; i++){
        errorNodes[i].innerText = "";
    }
    success.innerText = "";
    nameInput.classList.remove("error-border")
    email.classList.remove("error-border")
    message.classList.remove("error-border")
}

//if email valid
function emailIsValid(email){
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
}


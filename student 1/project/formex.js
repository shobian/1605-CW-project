function validation(){
    var name=document.getElementById("name").value.trim();
    var age=document.getElementById("age").value.trim();
    var occupation=document.getElementById("occupation").value.trim();
    var phone=document.getElementById("phone").value.trim();
    var email=document.getElementById("email").value.trim();
    var address=document.getElementById("address").value.trim();
    var text;
    var error_msg=document.getElementById("message");

    error_msg.style.padding="20px";

    if (name.length<5){
        text="Please Enter a Valid Name!";
        error_msg.innerHTML=text;
        return false;
    }
    if(age <2){
        text="You have to be more than 10 years!";
        error_msg.innerHTML=text;
        return false;
    }
    if(email.indexOf('@')==-1 || email.lenght<6){
        text="please enter a valid a email";
        error_msg.innerHTML=text;
        return false;
    }
    alert("Form submited succesfully!!");
    return true ;   
}

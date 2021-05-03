const form = document.querySelector("#form");
const email = document.querySelector("#email");
const text = document.querySelector("#text");
const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

function validation(){

    if (email.value.match(pattern)){
        email.style.borderColor = "#ffffff";
        email.style.color = "#9095a7";
        text.style.opacity = "0"
        text.innerHTML = "This block is empty";
    } else {
        email.style.borderColor = "#f25f3a";
        email.style.color = "#f25f3a";
        text.style.opacity = "1"
        text.innerHTML = "Please insert a valid email";
        text.style.color = "#f25f3a";
    }
    if(email.value == ""){
        email.style.borderColor = "#ffffff";
        email.style.color = "#9095a7";
        text.style.opacity = "0"
        text.innerHTML = "This block is empty";
    }
}

function validateForm(){
    
    let submit = true

    if (email.value == null || email.value == "") {
        nameError = "Please enter an email";
        text.style.color = "#f25f3a";
        text.style.opacity = "1";
        text.innerHTML = nameError;
        submit = false;
    } else {
        text.innerHTML = "This block is empty";
        text.style.opacity = "0";
        submit = true;
    }
   
    return submit
}

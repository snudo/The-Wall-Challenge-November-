/*
    DOCU: This function checks and validates all the form email, text and password inputs
    *Triggered: document.getElementsByClassName("form_template")[0].addEventListener("submit", validateFormInputs);
    *Last Updated: November 21, 2022
    *Author: Stan Bernie Nudo
*/
function validateFormInputs(event){
    event.preventDefault();
    let signin_signup_form = this;

    /*Loop through the form inputs and validate*/
    signin_signup_form.querySelectorAll(".form_inputs").forEach(inputs => {
        /*Add input_error for the input fields that are empty and remove input_error class if not*/
        (inputs.value.length == "") ? inputs.classList.add("input_error") : inputs.classList.remove("input_error"); 
    });

    /*Check input_error class if still exists if not got to success*/
    if(!signin_signup_form.querySelectorAll(".input_error").length){
        signin_signup_form.reset();
        window.location.href = "/web_frontend/views/dashboard/post_page.html";
    }
}
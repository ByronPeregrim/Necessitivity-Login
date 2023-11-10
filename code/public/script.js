// Cache DOM

var login = document.getElementById('login');
var signup = document.getElementById('signup');
var user_login_form = document.getElementById('user_login_form');
var input_username_box = document.getElementById('input_username_box');
var input_password_box = document.getElementById('input_password_box');
var login_button_box = document.getElementById('login_button_box');
var login_back_button = document.getElementById('login_back_button');
var login_submit_button = document.getElementById('login_submit_button');
var signup_form = document.getElementById('user_signup_form');
var signup_form_text = document.getElementById('signup_form_text');
var form_elements = document.getElementById('user_signup_form').childNodes;
var height_box = document.getElementById('height_box');
var height_label = document.getElementById('height_label');
var height_ft = document.getElementById('height_ft');
var height_in = document.getElementById('height_in');
var weight_box = document.getElementById('weight_box');
var weight_label = document.getElementById('weight_label');
var weight = document.getElementById('weight');
var signup_button_box = document.getElementById('signup_button_box');
var signup_back_button = document.getElementById('signup_back_button');
var signup_submit_button = document.getElementById('signup_submit_button');
var account_recovery_links = document.getElementById('account_recovery_links');
var login_account_recovery_links = document.getElementById('login_account_recovery_links');
var account_recovery_button_box = document.getElementById('account_recovery_button_box');
var account_recovery_back_button = document.getElementById('account_recovery_back_button');
var account_recovery_submit_button = document.getElementById('account_recovery_submit_button');
var account_recovery_text = document.getElementById('account_recovery_text');
var account_recovery_input = document.getElementById('account_recovery_input');

function ClickLoginButton() {
    login.classList.toggle('hide');
    signup.classList.toggle('hide');
    user_login_form.classList.toggle('hide');
    input_username_box.classList.toggle('hide');
    input_password_box.classList.toggle('hide');
    login_button_box.classList.toggle('hide');
    login_back_button.classList.toggle('hide');
    login_submit_button.classList.toggle('hide');
    account_recovery_links.classList.toggle('hide');
    login_account_recovery_links.classList.toggle('hide');
}

function ClickSignupButton() {
    login.classList.toggle('hide');
    signup.classList.toggle('hide');
    signup_form.classList.toggle('hide');
    signup_form_text.classList.toggle('hide');
    for (var i = 0; i < form_elements.length; i++) {
        if (form_elements[i].nodeName.toLowerCase() == 'input') {
            form_elements[i].classList.toggle('hide');
        }
    }
    height_label.classList.toggle('hide');
    height_box.classList.toggle('hide');
    height_ft.classList.toggle('hide');
    height_in.classList.toggle('hide');
    weight_box.classList.toggle('hide');
    weight_label.classList.toggle('hide');
    weight.classList.toggle('hide');
    signup_button_box.classList.toggle('hide');
    signup_back_button.classList.toggle('hide');
    signup_submit_button.classList.toggle('hide');
    account_recovery_links.classList.toggle('hide');
}

function ClickAccountRecoveryLinks() {
    login.classList.toggle('hide');
    signup.classList.toggle('hide');
    account_recovery_button_box.classList.toggle('hide');
    account_recovery_back_button.classList.toggle('hide');
    account_recovery_submit_button.classList.toggle('hide');
    account_recovery_links.classList.toggle('hide');
    account_recovery_text.classList.toggle('hide');
    account_recovery_input.classList.toggle('hide');
}

function ClickLoginAccountRecoveryLinks() {
    user_login_form.classList.toggle('hide');
    input_username_box.classList.toggle('hide');
    input_password_box.classList.toggle('hide');
    login_button_box.classList.toggle('hide');
    login_back_button.classList.toggle('hide');
    login_submit_button.classList.toggle('hide');
    login_account_recovery_links.classList.toggle('hide');
    account_recovery_button_box.classList.toggle('hide');
    account_recovery_back_button.classList.toggle('hide');
    account_recovery_submit_button.classList.toggle('hide');
    account_recovery_text.classList.toggle('hide');
    account_recovery_input.classList.toggle('hide');
}

function LoginValidation() {
    var user = document.login.username;
    var pass = document.login.password;
    if (LoginUsernameValidation(user)) {
        if (LoginPasswordValidation(pass)) {
            // Verify Username and Password in correct combination were found in database
            return true;
        }
    }
    return false;
}

function LoginUsernameValidation(user) {
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    var user_len = user.value.length;
    if (user_len != 0 && user_len <= 16 && user_len > 4) {
        if (user.value.match(usernameRegex)) {
            return true;    
        }
    }
    alert("The username/password combination provided was not found.");
    user.focus();
    return false;
}

function LoginPasswordValidation(pass) {
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (pass.value.match(passwordRegex)) {
        return true;    
    }
    alert("The username/password combination provided was not found.");
    pass.focus();
    return false;
}

function FormValidation() {
    var uid = document.registration.username;
    var pass = document.registration.password;
    var c_pass = document.registration.c_pass;
    var first = document.registration.first;
    var last = document.registration.last;
    var email = document.registration.email;
    var height_ft = document.registration.feet;
    var height_in = document.registration.inches;
    var weight = document.registration.weight;

    if (UsernameValidation(uid)) {
        if (PasswordValidation(pass)) {
            if (ConfirmPassword(pass,c_pass)) {
                if (FirstNameValidation(first)) {
                    if (LastNameValidation(last)) {
                        if (EmailValidation(email)) {
                            if (HeightValidation(height_ft, height_in)) {
                                if (WeightValidation(weight)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false
}

function UsernameValidation(uid) {
    // Verify username only contains valid symbols and is of correct length.
    var usernameRegex = /^[a-zA-Z0-9]+$/;
    var uid_len = uid.value.length;
    if (uid_len != 0 && uid_len <= 16 && uid_len > 4) {
        if (uid.value.match(usernameRegex)) {
            return true;    
        }
    }
    alert("The username provided is not valid. Usernames must be between 5 and 16 characters. Only characters A-Z, a-z and 0-9 are acceptable.");
    uid.focus();
    return false;
}

function PasswordValidation(pass) {
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (pass.value.match(passwordRegex)) {
        return true;    
    }
    alert("The password provided is not valid. Password must be at least 8 characters and must contains at least one letter, one number, and one special character.");
    pass.focus();
    return false;
}

function ConfirmPassword(pass,c_pass) {
    if (pass.value === c_pass.value) {
        return true;
    }
    alert("Passwords do not match.");
    c_pass.focus();
    return false;
}

function FirstNameValidation(first) {
    var nameRegex = /^[a-zA-Z\-]+$/;
    if (first.value.match(nameRegex)) {
        return true;
    }
    alert("First name provided is not valid. Name must only contain characters A-Z, a-z, and -.");
    first.focus();
    return false;
}

function LastNameValidation(last) {
    var nameRegex = /^[a-zA-Z\-]+$/;
    if (last.value.match(nameRegex)) {
        return true;
    }
    alert("Last name provided is not valid. Name must only contain characters A-Z, a-z, and -.");
    last.focus();
    return false;
}

function EmailValidation(email) {
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.value.match(emailRegex)) {
        return true;
    }
    alert("Email provided is not of a valid format.");
    email.focus();
    return false;
}


function HeightValidation(height_ft,height_in) {
    if (height_ft.value <= 7 && height_ft.value > 2) {
        if (height_in.value <= 11 && height_in.value >= 0) {
            return true;
        }
        alert("Height in inches provided is not valid. Inches entered must be between 0 and 11.");
        height_in.focus();
        return false;
    }
    alert("Height in feet provided is not valid. Feet entered must be between 3 and 7.");
    height_ft.focus();
    return false;
}

function WeightValidation(weight) {
    if (weight.value < 501 && weight.value > 49) {
        return true;
    } 
    alert("Weight provided is not valid. Weight entered must be between 50 and 500lbs.");
    weight.focus();
    return false;
}




var account_recovery_button_box = document.getElementById('account_recovery_button_box');
var account_recovery_back_button = document.getElementById('account_recovery_back_button');
var account_recovery_submit_button = document.getElementById('account_recovery_submit_button');
var account_recovery_text = document.getElementById('account_recovery_text');
var account_recovery_input = document.getElementById('account_recovery_input');
var account_recovery_links = document.getElementById('account_recovery_links');
var user_login_form = document.getElementById('user_login_form');
var input_username_box = document.getElementById('input_username_box');
var input_password_box = document.getElementById('input_password_box');
var login_button_box = document.getElementById('login_button_box');
var login_back_button = document.getElementById('login_back_button');
var login_submit_button = document.getElementById('login_submit_button');
var login_error_message = document.getElementById('login_error_message');

function ClickAccountRecoveryLinks() {
    account_recovery_button_box.classList.toggle('hide');
    account_recovery_back_button.classList.toggle('hide');
    account_recovery_submit_button.classList.toggle('hide');
    account_recovery_links.classList.toggle('hide');
    account_recovery_text.classList.toggle('hide');
    account_recovery_input.classList.toggle('hide');
    user_login_form.classList.toggle('hide');
    input_username_box.classList.toggle('hide');
    input_password_box.classList.toggle('hide');
    login_button_box.classList.toggle('hide');
    login_back_button.classList.toggle('hide');
    login_submit_button.classList.toggle('hide');
    login_error_message.classList.toggle('hide');
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
    alert("The username provided is of an invalid format.");
    user.focus();
    return false;
}

function LoginPasswordValidation(pass) {
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,24}$/;
    if (pass.value.match(passwordRegex)) {
        return true;    
    }
    alert("The password provided is of an invalid format.");
    pass.focus();
    return false;
}
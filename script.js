var login = document.getElementById('login');
var signup = document.getElementById('signup');
var user_login_form = document.getElementById('user-login-form');
var input_username_box = document.getElementById('input-username-box');
var input_password_box = document.getElementById('input-password-box');
var login_button_box = document.getElementById('login-button-box');
var login_back_button = document.getElementById('login-back-button');
var login_submit_button = document.getElementById('login-submit-button');
var signup_form = document.getElementById('user-signup-form');
var form_elements = document.getElementById('user-signup-form').childNodes;
var signup_button_box = document.getElementById('signup-button-box');
var signup_back_button = document.getElementById('signup-back-button');
var signup_submit_button = document.getElementById('signup-submit-button');
var account_recovery_links = document.getElementById('account-recovery-links');
var account_recovery_button_box = document.getElementById('account-recovery-button-box');
var account_recovery_back_button = document.getElementById('account-recovery-back-button');
var account_recovery_submit_button = document.getElementById('account-recovery-submit-button');
var account_recovery_text = document.getElementById('account-recovery-text');
var account_recovery_input = document.getElementById('account-recovery-input');

function ClickLoginButton() {
    login.classList.toggle('hide');
    signup.classList.toggle('hide');
    user_login_form.classList.toggle('hide');
    input_username_box.classList.toggle('hide');
    input_password_box.classList.toggle('hide');
    login_button_box.classList.toggle('hide');
    login_back_button.classList.toggle('hide');
    login_submit_button.classList.toggle('hide');
}

function ClickSignupButton() {
    login.classList.toggle('hide');
    signup.classList.toggle('hide');
    signup_form.classList.toggle('hide');
    for (var i = 0; i < form_elements.length; i++) {
        if (form_elements[i].nodeName.toLowerCase() == 'input') {
            form_elements[i].classList.toggle('hide');
        }
    }
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
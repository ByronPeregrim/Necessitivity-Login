function ClickLoginButton() {
    var login = document.getElementById('login');
    login.classList.toggle('hide');
    var signup = document.getElementById('signup');
    signup.classList.toggle('hide');
    var user_login_form = document.getElementById('user-login-form');
    user_login_form.classList.toggle('hide');
    var input_username_box = document.getElementById('input-username-box');
    input_username_box.classList.toggle('hide');
    var input_password_box = document.getElementById('input-password-box');
    input_password_box.classList.toggle('hide');
    var login_button_box = document.getElementById('login-button-box');
    login_button_box.classList.toggle('hide');
    var login_back_button = document.getElementById('login-back-button');
    login_back_button.classList.toggle('hide');
    var login_submit_button = document.getElementById('login-submit-button');
    login_submit_button.classList.toggle('hide');
}

function ClickSignupButton() {
    var login = document.getElementById('login');
    login.classList.toggle('hide');
    var signup = document.getElementById('signup');
    signup.classList.toggle('hide');
    var signup_form = document.getElementById('user-signup-form');
    signup_form.classList.toggle('hide');
    var form_elements = document.getElementById('user-signup-form').childNodes;
    for (var i = 0; i < form_elements.length; i++) {
        if (form_elements[i].nodeName.toLowerCase() == 'input') {
            form_elements[i].classList.toggle('hide');
        }
    }
    var signup_button_box = document.getElementById('signup-button-box');
    signup_button_box.classList.toggle('hide');
    var signup_back_button = document.getElementById('signup-back-button');
    signup_back_button.classList.toggle('hide');
    var signup_submit_button = document.getElementById('signup-submit-button');
    signup_submit_button.classList.toggle('hide');
    var account_recovery_links = document.getElementById('account-recovery-links');
    account_recovery_links.classList.toggle('hide');
}

function ClickAccountRecoveryLinks() {
    var login = document.getElementById('login');
    login.classList.toggle('hide');
    var signup = document.getElementById('signup');
    signup.classList.toggle('hide');
    var account_recovery_button_box = document.getElementById('account-recovery-button-box');
    account_recovery_button_box.classList.toggle('hide');
    var account_recovery_back_button = document.getElementById('account-recovery-back-button');
    account_recovery_back_button.classList.toggle('hide');
    var account_recovery_submit_button = document.getElementById('account-recovery-submit-button');
    account_recovery_submit_button.classList.toggle('hide');
    var account_recovery_links = document.getElementById('account-recovery-links');
    account_recovery_links.classList.toggle('hide');
    var account_recovery_text = document.getElementById('account-recovery-text');
    account_recovery_text.classList.toggle('hide');
    var account_recovery_input = document.getElementById('account-recovery-input');
    account_recovery_input.classList.toggle('hide');
}
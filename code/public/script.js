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
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,25}$/;
    if (pass.value.match(passwordRegex)) {
        return true;    
    }
    alert("The password provided is of an invalid format.");
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
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,24}$/;
    if (pass.value.match(passwordRegex)) {
        return true;    
    }
    alert("The password provided is not valid. Password must be between 8 and 24 characters and must contain at least one letter, one number, and one special character.");
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
    var nameRegex = /^[a-zA-Z\-]{2,30}$/;
    if (first.value.match(nameRegex)) {
        return true;
    }
    alert("First name provided is not valid. Name must only contain characters A-Z, a-z, and -. Must be between 2 and 30 characters.");
    first.focus();
    return false;
}

function LastNameValidation(last) {
    var nameRegex = /^[a-zA-Z\-]{1,30}$/;
    if (last.value.match(nameRegex)) {
        return true;
    }
    alert("Last name provided is not valid. Name must only contain characters A-Z, a-z, and -. Can not contain more than 30 characters.");
    last.focus();
    return false;
}

function EmailValidation(email) {
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var email_len = email.value.length;
    if (email_len != 0 && email_len <= 40 && email_len > 4) {
        if (email.value.match(emailRegex)) {
            return true;    
        }
    }
    alert("Email provided is not of a valid format. Email can not be more than 40 characters in length.");
    email.focus();
    return false;
}

function AccountRecoveryEmailValidation() {
    var email = document.account_recovery.email;
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var email_len = email.value.length;
    console.log(email_len)
    if (email_len != 0 && email_len <= 40 && email_len > 4) {
        if (email.value.match(emailRegex)) {
            return true;    
        }
    }
    alert("Email provided is not of a valid format. Email can not be more than 40 characters in length.");
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


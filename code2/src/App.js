import React, { useState } from "react";

import './App.css';

const App = () => {
    const [showHomeView, setShowHomeView] = useState(true);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showAccountRecoveryForm,setShowAccountRecoveryForm] = useState(false);
    return (
        <div className="App">
            {
                showHomeView?
                    <>
                        <div className="banner_box">
                            <h1 id="banner_text">FitTracker 5000</h1>
                        </div>
                        <button onClick={()=>[setShowHomeView(false), setShowLoginForm(true)]} className="login_button" id="login">Login</button>
                        <button onClick={()=>[setShowHomeView(false), setShowRegistrationForm(true)]} className="login_button" id="signup">Sign-Up</button>
                        <div id="account_recovery_links">
                            <a onClick={()=>[setShowHomeView(false), setShowAccountRecoveryForm(true)]}>Forgot Username?</a>
                            <a onClick={()=>[setShowHomeView(false), setShowAccountRecoveryForm(true)]}>Reset Password?</a>
                        </div>
                    </>
                    :null
            }

            {    
                showLoginForm?
                    <>
                        <div className="banner_box">
                            <h1 id="banner_text">FitTracker 5000</h1>
                        </div>
                        <form method="post" action="/login-user" id="user_login_form" name="login">
                            <input className="input_account_info_box" id="input_username_box" name="username" type="text" placeholder="Username"  required/>
                            <input className="input_account_info_box" id="input_password_box" name="password" type="password" placeholder="Password" required/>
                            <div className="button_box" id="login_button_box">
                                <button onClick={()=>[setShowLoginForm(false),setShowHomeView(true)]} type="button" id="login_back_button">Back</button>
                                <button type="submit" id="login_submit_button">Submit</button>
                            </div>
                        </form>
                        <div id="account_recovery_links">
                            <a onClick={()=>[setShowLoginForm(false), setShowAccountRecoveryForm(true)]}>Forgot Username?</a>
                            <a onClick={()=>[setShowLoginForm(false), setShowAccountRecoveryForm(true)]}>Reset Password?</a>
                        </div>
                    </>
                    :null
            }

            {
                showRegistrationForm?
                    <>
                        <div className="banner_box" id="reg_banner_box">
                            <h1 id="banner_text">FitTracker 5000</h1>
                        </div>
                        <form method="post" action="/register" id="user_signup_form" name="registration">
                            <p id="signup_form_text">Username and password are case sensitive.</p>
                            <input id="username" name="username" type="text" placeholder="Username"  required/>
                            <input id="password" name="password" type="password" placeholder="Password" required/>
                            <input id="confirm_password" name="c_pass" type="password" placeholder="Confirm Password" required/>
                            <input id="first" name="first" type="text" placeholder="First Name"  required/>
                            <input id="last" name="last" type="text" placeholder="Last Name" required/>
                            <input id="email" type="email" name="email" placeholder="Email Address" required/>
                            <div id="height_box">
                                <div id="height_label">Height</div>
                                <input id="height_ft" type="number" name="feet" placeholder="ft"  required/>
                                <input id="height_in" type="number" name="inches" placeholder="in"  required/>
                            </div>
                            <div id="weight_box">
                                <div id="weight_label">Weight</div>
                                <input id="weight" type="number" name="weight" placeholder="lbs" required/>
                            </div>
                            <div id="age_box">
                                <div id="age_label">Age</div>
                                <input id="age" type="number" name="age" placeholder="0" required/>
                            </div>
                            <div className="button_box" id="signup_button_box">
                                <button onClick={()=>[setShowRegistrationForm(false),setShowHomeView(true)]} type="button" id="signup_back_button">Back</button>
                                <button type="submit" id="signup_submit_button">Submit</button>
                            </div>
                        </form>
                    </>
                    :null
            }

            {
                showAccountRecoveryForm?
                    <>
                        <div className="banner_box">
                            <h1 id="banner_text">FitTracker 5000</h1>
                        </div>
                        <h2 id="account_recovery_text">Forgot Username or Password?</h2>
                        <form method="post" name="account_recovery" action="/recover-account" id="account_recovery_form">
                            <input id="account_recovery_input" name="email" type="email" placeholder="Email Address" required/>
                            <div className="button_box" id="account_recovery_button_box">
                                <button onClick={()=>[setShowAccountRecoveryForm(false),setShowHomeView(true)]}  type="button" id="account_recovery_back_button">Back</button>
                                <button type="submit" id="account_recovery_submit_button">Submit</button>
                            </div>
                        </form>
                    </>
                    :null
            }


        </div> 
            
    );
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
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,25}$/;
    if (pass.value.match(passwordRegex)) {
        return true;    
    }
    alert("The password provided is of an invalid format.");
    pass.focus();
    return false;
}

export default App;
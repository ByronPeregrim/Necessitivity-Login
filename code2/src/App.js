import React, { useState } from "react";

import './App.css';

const App = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showHomeView, setShowHomeView] = useState(true);
    return (
        <div className="App">
            <div id="banner_box">
                <h1 id="banner_text">Necessitivity</h1>
            </div>
            {
                showHomeView?
                    <>
                        <button onClick={()=>[setShowLoginForm(true),setShowHomeView(false)]} className="login_button" id="login">Login</button>
                        <button className="login_button" id="signup">Sign-Up</button>
                        <div id="account_recovery_links">
                            <a>Forgot Username?</a>
                            <a>Reset Password?</a>
                        </div>
                    </>
                    :null
            }
            {    
                showLoginForm?
                    <>
                        <form method="post" action="/login-user" id="user_login_form" name="login" onsubmit="return LoginValidation()">
                            <input className="input_account_info_box" id="input_username_box" name="username" type="text" placeholder="Username"  required/>
                            <input className="input_account_info_box" id="input_password_box" name="password" type="password" placeholder="Password" required/>
                            <div className="button_box" id="login_button_box">
                                <button onClick={()=>[setShowLoginForm(false),setShowHomeView(true)]} type="button" id="login_back_button">Back</button>
                                <button onclick="LoginValidation()" type="submit" id="login_submit_button">Submit</button>
                            </div>
                        </form>
                        <div id="login_account_recovery_links">
                            <a>Forgot Username?</a>
                            <a>Reset Password?</a>
                        </div>
                    </>
                    :null
            }
        </div> 
            
    );
}



function LoginForm(props) {
    return (
        <div className='App' style={{ visibility: props.status ? "visible" : "hidden" }}>
            <form method="post" action="/login-user" id="user_login_form" name="login" onsubmit="return LoginValidation()">
                <input className="input_account_info_box" id="input_username_box" name="username" type="text" placeholder="Username"  required/>
                <input className="input_account_info_box" id="input_password_box" name="password" type="password" placeholder="Password" required/>
                <div className="hide button_box" id="login_button_box">
                    <button type="button" id="login_back_button">Back</button>
                    <button onclick="LoginValidation()" type="submit" id="login_submit_button">Submit</button>
                </div>
            </form>
            <div style="cursor: pointer;" id="login_account_recovery_links">
                <a>Forgot Username?</a>
                <a>Reset Password?</a>
            </div>
        </div>
    )
}

export default App;
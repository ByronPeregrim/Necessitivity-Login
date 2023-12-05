import React, { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { RegistrationForm } from "./components/RegistrationForm";
import { RecoveryForm } from "./components/RecoveryForm";

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
                        <LoginForm change={()=>[setShowLoginForm(false),setShowHomeView(true)]} />
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
                        <RegistrationForm change={()=>[setShowRegistrationForm(false),setShowHomeView(true)]} />
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
                        <RecoveryForm change={()=>[setShowAccountRecoveryForm(false),setShowHomeView(true)]} />
                    </>
                    :null
            }
        </div>
    );
}

export default App;
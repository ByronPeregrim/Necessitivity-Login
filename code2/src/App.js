import React from "react";

import './App.css';

const App = () => {
    return (
        <>
            <body>
                <div id="banner_box">
                    <h1 id="banner_text">Necessitivity</h1>
                </div>
                <button class="login_button" id="login">Login</button>
                <button class="login_button" id="signup">Sign-Up</button>
                <div id="account_recovery_links">
                    <a>Forgot Username?</a>
                    <a>Reset Password?</a>
                </div>
            </body>
        </>
        
    );
}

export default App;
import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { RecoveryForm } from "./components/RecoveryForm";
import { RegistrationSuccessful } from "./components/RegistrationSuccessful";
import SignUpModal from "./components/SignUpModal";

const App = () => {

    const [showHomeView, setShowHomeView] = useState(true);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showAccountRecoveryForm,setShowAccountRecoveryForm] = useState(false);
    const [showRegistrationSuccessfulView, setShowRegistrationSuccessfulView] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    return (
        <div className="App">
            {
                showHomeView?
                    <>
                        <div className="banner_box">
                            <h1 id="banner_text">FitTracker5000</h1>
                        </div>
                        <button onClick={()=>[setShowHomeView(false), setShowLoginForm(true)]} className="login_button" id="login">Login</button>
                        <button onClick={()=>[setShowHomeView(false), setShowSignUpModal(true)]} className="signup_button" id="signup">Sign-Up</button>
                        <div id="account_recovery_links">
                            <button onClick={()=>[setShowHomeView(false), setShowAccountRecoveryForm(true)]}>Forgot Username?</button>
                            <button onClick={()=>[setShowHomeView(false), setShowAccountRecoveryForm(true)]}>Reset Password?</button>
                        </div>
                    </>
                    :null
            }

            {    
                showLoginForm?
                    <>
                        <div className="banner_box">
                            <h1 id="banner_text">FitTracker5000</h1>
                        </div>
                        <LoginForm change={()=>[setShowLoginForm(false),setShowHomeView(true)]} />
                        <div id="account_recovery_links">
                            <button onClick={()=>[setShowLoginForm(false), setShowAccountRecoveryForm(true)]}>Forgot Username?</button>
                            <button onClick={()=>[setShowLoginForm(false), setShowAccountRecoveryForm(true)]}>Reset Password?</button>
                        </div>
                    </>
                    :null
            }

            {
                showSignUpModal ?
                <>
                    <div id="reg_banner_box">
                        <h1 id="reg_banner_text">FitTracker5000</h1>
                    </div>
                    <SignUpModal
                        onDismiss={() => {}}
                        onSignUpSuccessful={() => {}}
                    />
                </>
                :null
                
            }

            {
                showAccountRecoveryForm?
                    <>
                        <div className="banner_box">
                            <h1 id="banner_text">FitTracker5000</h1>
                        </div>
                        <RecoveryForm change={()=>[setShowAccountRecoveryForm(false),setShowHomeView(true)]}/>
                    </>
                    :null
            }

            {
                showRegistrationSuccessfulView?
                    <>
                        <div className="banner_box">
                            <h1 id="banner_text">FitTracker5000</h1>
                        </div>
                        <RegistrationSuccessful back={() => {
                            setShowRegistrationSuccessfulView(false);
                            setShowHomeView(true);
                        }}
                        />
                    </>
                    :null
            }
        </div>
    );
}

export default App;
import { useState } from "react";
import { RecoveryForm } from "./components/RecoveryForm";
import { RegistrationSuccessful } from "./components/RegistrationSuccessful";
import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { User } from "./models/users";

const App = () => {

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const [showHomeView, setShowHomeView] = useState(true);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showAccountRecoveryForm,setShowAccountRecoveryForm] = useState(false);
    const [showRegistrationSuccessfulView, setShowRegistrationSuccessfulView] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    return (
        <div>
            <NavBar 
                loggedInUser={loggedInUser}
                onLoginClicked={() => {setShowLoginModal(true)}}
                onSignUpClicked={() => {setShowSignUpModal(true)}}
                onLogoutSuccessful={() => setLoggedInUser(null)}
            />
            <div className="App">
                {
                    showHomeView?
                        <>
                            <div className="banner_box">
                                <h1 className="banner_text">FitTracker5000</h1>
                            </div>
                            <button onClick={()=>[setShowHomeView(false), setShowLoginModal(true)]} className="login_button" id="login">Login</button>
                            <button onClick={()=>[setShowHomeView(false), setShowSignUpModal(true)]} className="signup_button" id="signup">Sign-Up</button>
                            <div id="account_recovery_links">
                                <button onClick={()=>[setShowHomeView(false), setShowAccountRecoveryForm(true)]}>Forgot Username?</button>
                                <button onClick={()=>[setShowHomeView(false), setShowAccountRecoveryForm(true)]}>Reset Password?</button>
                            </div>
                        </>
                        :null
                }
                {
                    showLoginModal?
                        <>
                            <LoginModal
                                onDismiss={() => {}}
                                onLoginSuccessful={() => {}}
                            />
                        </>
                        :null
                }
                {
                    showSignUpModal ?
                        <>
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
        </div>
    );
}

export default App;
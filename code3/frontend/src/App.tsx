import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { RecoveryForm } from "./components/RecoveryForm";
import { RegistrationSuccessful } from "./components/RegistrationSuccessful";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/users";
import * as UsersApi from "./network/users_api";
import UserPageLoggedInView from "./components/UserPageLoggedInView";
import HomeView from "./components/HomeView";

const App = () => {

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    const [showHomeView, setShowHomeView] = useState(false);
    const [showAccountRecoveryForm,setShowAccountRecoveryForm] = useState(false);
    const [showRegistrationSuccessfulView, setShowRegistrationSuccessfulView] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await UsersApi.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        }
        fetchLoggedInUser();
    }, []);

    return (
        <div>
            <NavBar 
                loggedInUser={loggedInUser}
                onLoginClicked={() => {setShowLoginModal(true)}}
                onSignUpClicked={() => {setShowSignUpModal(true)}}
                onLogoutSuccessful={() => setLoggedInUser(null)}
            />
            <div className="App">
                <>
                {loggedInUser?
                <UserPageLoggedInView />
                :<HomeView
                    onLoginClicked={() => {setShowLoginModal(true)}}
                    onSignUpClicked={() => {setShowSignUpModal(true)}}
                />
                }
                </>
                {showHomeView?
                <HomeView
                onLoginClicked={() => {setShowLoginModal(true)}}
                onSignUpClicked={() => {setShowSignUpModal(true)}}
                />
                :null
                }
                {showLoginModal?
                <>
                    <LoginModal
                        onDismiss={() => {setShowLoginModal(false)}}
                        onLoginSuccessful={(user) => {
                            setLoggedInUser(user);
                            setShowLoginModal(false);
                        }}
                        onBackButtonClicked={() => [setShowLoginModal(false)]}
                    />
                </>
                :null
                }
                {showSignUpModal?
                <>
                    <SignUpModal
                        onDismiss={() => {setShowSignUpModal(false)}}
                        onSignUpSuccessful={(user) => {
                            setLoggedInUser(user);
                            setShowSignUpModal(false);
                        }}
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
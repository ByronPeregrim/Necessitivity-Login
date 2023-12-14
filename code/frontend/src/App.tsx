import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./components/HomeView";
import NavBar from "./components/navbar/NavBar";
import LoginModal from "./components/modals/LoginModal";
import SignUpModal from "./components/modals/SignUpModal";
import { User } from "./models/users";
import * as UsersApi from "./network/users_api";
import NotFoundPage from "./pages/NotFoundPage";
import UserPage from "./pages/UserPage";
import styles from "./styles/App.module.css";
import AccountRecoveryModal from "./components/modals/AccountRecoveryModal";
import AccountRecoverySuccess from "./components/modals/AccountRecoverySuccess";

const App = () => {

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [showHomeView, setShowHomeView] = useState(false);
    const [showAccountRecoveryModal,setShowAccountRecoveryModal] = useState(false);
    const [showAccountRecoverySuccess, setShowAccountRecoverySuccess] = useState(false);
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
        <BrowserRouter>
        <div>
            <NavBar 
                loggedInUser={loggedInUser}
                onLoginClicked={() => {setShowLoginModal(true)}}
                onSignUpClicked={() => {setShowSignUpModal(true)}}
                onLogoutSuccessful={() => setLoggedInUser(null)}
            />
            <Container className={styles.pageContainer}>
                <Routes>
                    <Route 
                    path='/'
                    element={<UserPage
                        loggedInUser={loggedInUser}
                        onLoginClicked={() => {setShowLoginModal(true)}}
                        onSignUpClicked={() => {setShowSignUpModal(true)}}
                        onAccountRecoveryClicked={() => {setShowAccountRecoveryModal(true)}}
                        />}
                    />
                    <Route
                        path="/*"
                        element={<NotFoundPage />}
                    />
                </Routes>

            </Container>
            <div className="App">
                
                {showHomeView?
                    <HomeView
                    onLoginClicked={() => {setShowLoginModal(true)}}
                    onSignUpClicked={() => {setShowSignUpModal(true)}}
                    onAccountRecoveryClicked={() => {setShowAccountRecoveryModal(true)}}
                    />
                    :null
                }
                {showLoginModal?
                <>
                    <LoginModal
                        onLoginSuccessful={(user) => {
                            setLoggedInUser(user);
                            setShowLoginModal(false);
                        }}
                        onBackButtonClicked={() => [setShowLoginModal(false)]}
                        onAccountRecoveryClicked={() => [setShowLoginModal(false), setShowAccountRecoveryModal(true)]}
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
                        onBackButtonClicked={() => [setShowSignUpModal(false)]}
                        onAlreadyHaveAccountButtonClicked={() => [setShowSignUpModal(false), setShowLoginModal(true)]}
                    />
                </>
                :null
            
                }
                {showAccountRecoveryModal?
                <>
                    <AccountRecoveryModal
                    onDismiss={() => {setShowAccountRecoveryModal(false)}}
                    onBackButtonClicked={() => [setShowAccountRecoveryModal(false)]}
                    onRecoverySuccessful={() => [setShowAccountRecoverySuccess(true), setShowAccountRecoveryModal(false)]}
                    />
                </>
                :null
                }
                {showAccountRecoverySuccess?
                <>
                    <AccountRecoverySuccess
                    onBackButtonClicked={() => [setShowAccountRecoverySuccess(false)]}
                    />
                </>
                :null
                }
            </div>
        </div>
        </BrowserRouter>
    );
}

export default App;
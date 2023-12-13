import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./components/HomeView";
import NavBar from "./components/navbar/NavBar";
import { RecoveryForm } from "./components/RecoveryForm";
import { RegistrationSuccessful } from "./components/RegistrationSuccessful";
import LoginModal from "./components/modals/LoginModal";
import SignUpModal from "./components/modals/SignUpModal";
import { User } from "./models/users";
import * as UsersApi from "./network/users_api";
import NotFoundPage from "./pages/NotFoundPage";
import UserPage from "./pages/UserPage";
import styles from "./styles/App.module.css";

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
                        onBackButtonClicked={() => [setShowSignUpModal(false)]}
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
        </BrowserRouter>
    );
}

export default App;
import { useState, useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { RegistrationForm } from "./components/RegistrationForm";
import { RecoveryForm } from "./components/RecoveryForm";
import { RegistrationSuccessful } from "./components/RegistrationSuccessful";
import * as UsersApi from "./network/users_api";
import { User as UserModel } from "./models/users";

const App = () => {

    const [showHomeView, setShowHomeView] = useState(true);
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [showAccountRecoveryForm,setShowAccountRecoveryForm] = useState(false);
    const [showRegistrationSuccessfulView, setShowRegistrationSuccessfulView] = useState(false);

    const [users, setUsers] = useState<UserModel[]>([]);

    useEffect(() => {
        async function loadUsers() {
            try {
                const users = await UsersApi.fetchUsers();
                setUsers(users);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
        loadUsers();
    }, []);

    async function deleteUser(user: UserModel) {
        try {
            await UsersApi.deleteUser(user._id)
            setUsers(users.filter(existingUser => existingUser._id !== user._id));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <div className="App">
            {
                showHomeView?
                    <>
                        <div className="banner_box">
                            <h1 id="banner_text">FitTracker5000</h1>
                        </div>
                        <button onClick={()=>[setShowHomeView(false), setShowLoginForm(true)]} className="login_button" id="login">Login</button>
                        <button onClick={()=>[setShowHomeView(false), setShowRegistrationForm(true)]} className="signup_button" id="signup">Sign-Up</button>
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
                showRegistrationForm?
                    <>
                        <div id="reg_banner_box">
                            <h1 id="reg_banner_text">FitTracker5000</h1>
                        </div>
                        <RegistrationForm 
                            change={()=>[setShowRegistrationForm(false),setShowHomeView(true)]} 
                            onUserSaved={() => {
                                setShowRegistrationForm(false);
                                setShowRegistrationSuccessfulView(true);
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
    );
}

export default App;
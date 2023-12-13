interface HomeViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const HomeView = ({ onSignUpClicked, onLoginClicked } : HomeViewProps) => {
    return (
        <>
            <div className="banner_box">
            <h1 className="banner_text">FitTracker5000</h1>
            </div>
            <button onClick={onLoginClicked} className="login_button" id="login">Login</button>
            <button onClick={onSignUpClicked} className="signup_button" id="signup">Sign-Up</button>
            <div id="account_recovery_links">
                <button onClick={()=> {}}>Forgot Username?</button>
                <button onClick={()=> {}}>Reset Password?</button>
            </div>
        </>
    );
}

export default HomeView;
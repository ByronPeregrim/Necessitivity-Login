import styles from "../styles/HomeView.module.css";


interface HomeViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onAccountRecoveryClicked: () => void,
}

const HomeView = ({ onSignUpClicked, onLoginClicked, onAccountRecoveryClicked } : HomeViewProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.banner_box}>
            <h1 className={styles.banner_text}>FitTracker 5000</h1>
            </div>
            <button onClick={onLoginClicked} className={styles.login_button} id="login">Login</button>
            <button onClick={onSignUpClicked} className={styles.signup_button} id="signup">Sign-Up</button>
            <div className={styles.account_recovery_links}>
                <button onClick={()=> {onAccountRecoveryClicked()}}>Forgot Username?</button>
                <button onClick={()=> {onAccountRecoveryClicked()}}>Reset Password?</button>
            </div>
        </div>
    );
}

export default HomeView;
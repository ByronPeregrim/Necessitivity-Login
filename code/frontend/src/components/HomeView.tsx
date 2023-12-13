import styles from "../styles/HomeView.module.css";


interface HomeViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const HomeView = ({ onSignUpClicked, onLoginClicked } : HomeViewProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.banner_box}>
            <h1 className={styles.banner_text}>FitTracker5000</h1>
            </div>
            <button onClick={onLoginClicked} className={styles.login_button} id="login">Login</button>
            <button onClick={onSignUpClicked} className={styles.signup_button} id="signup">Sign-Up</button>
            <div className={styles.account_recovery_links}>
                <button onClick={()=> {}}>Forgot Username?</button>
                <button onClick={()=> {}}>Reset Password?</button>
            </div>
        </div>
    );
}

export default HomeView;
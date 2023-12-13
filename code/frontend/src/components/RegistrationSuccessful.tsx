import styles from "../styles/RegistrationSuccessful.module.css";

export const RegistrationSuccessful = ({back} : {back: any}) => {
    return (
        <>
            <p className={styles.text}>Registration Successful!</p>
            <button onClick={()=>back()} className={styles.backButton}>Back</button>
        </>
    )
}
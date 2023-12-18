import { Container } from "react-bootstrap";
import { User } from "../models/users";
import styles from "../styles/UserPage.module.css";

interface UserPageLoggedInViewProps {
    user: User | null,
}

const UserPageLoggedInView = ({user} : UserPageLoggedInViewProps) => {
    return (
        <Container className={styles.wrapper}>

            <div className={styles.banner_box}>
                <h1 className={styles.banner_text}>FitTracker 5000</h1>
            </div>

            <div className={styles.user_info_box}>
                <div className={styles.user_info}>
                    <p><b>Name: </b>{user?.first} {user?.last}</p>
                    <p><b>Username: </b>{user?.username}</p>
                    <p><b>Email: </b>{user?.email}</p>
                    <p><b>Weight: </b>{user?.weight}lbs</p>
                </div>
                <div className={styles.edit_info_box}>
                    <button className={styles.edit_info_button}>Edit</button>
                </div>
            </div>
        </Container>
    );
}

export default UserPageLoggedInView;
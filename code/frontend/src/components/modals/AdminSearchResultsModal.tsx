import { Button } from "react-bootstrap";
import { User } from "../../models/users";
import styles from "../../styles/AdminPage.module.css"


interface AdminSearchResultsModalProps {
    currentUser: User | null,
}

const AdminSearchResultsModal = ({currentUser} : AdminSearchResultsModalProps) => {
    return (
        <div className={styles.results_container}>
            <div className={styles.user_info}>
                <p><b>Username :</b> {currentUser?.username}</p>
                <p><b>Email :</b> {currentUser?.email}</p>
                <p><b>First Name :</b> {currentUser?.first}</p>
                <p><b>Last Name :</b> {currentUser?.last}</p>
                <p><b>Weight : </b> {currentUser?.weight}</p>
            </div>
            <div className={styles.button_box}>
                <Button
                    className={styles.delete_button}
                    type="button"
                >   
                    Delete
                </Button>
                <Button
                    type="submit"
                >   
                    Edit
                </Button>
            </div>
        </div>
     );
}
 
export default AdminSearchResultsModal;
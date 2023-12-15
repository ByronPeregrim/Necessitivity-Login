import styles from "../../styles/AdminPage.module.css"

const DeleteUserSuccessModal = () => {
    return ( 
        <div className={styles.results_container}>
            <p className={styles.confirm_delete_text}>User account deleted successfully.</p>
        </div>
     );
}
 
export default DeleteUserSuccessModal;
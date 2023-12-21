import { Button, Modal } from "react-bootstrap";
import styles from "../../styles/AddWorkoutModal.module.css"

interface ConfirmAddWorkoutProps {
    onClickedBackButton: () => void,
}

const ConfirmAddWorkout =  ({onClickedBackButton} : ConfirmAddWorkoutProps) => {
    return (
        <Modal>
            <Modal.Body>
                <div className={styles.add_workout_wrapper}>
                    <p className={styles.confirm_delete_text}>Confirm Delete?</p>
                    <div className={styles.button_box}>
                        <Button
                            type="button"
                            onClick={onClickedBackButton}
                        >   
                            Back
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
     );
}
 
export default ConfirmAddWorkout;
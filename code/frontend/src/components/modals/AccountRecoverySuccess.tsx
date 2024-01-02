import { Button, Modal } from "react-bootstrap";
import styles from "../../styles/AccountRecoveryModal.module.css";

interface AccountRecoverySuccessProps {
  onBackButtonClicked: () => void;
}

const AccountRecoverySuccess = ({
  onBackButtonClicked,
}: AccountRecoverySuccessProps) => {
  return (
    <Modal show>
      <div className={styles.banner_box}>
        <h1 className={styles.banner_text}>FitTracker 5000</h1>
      </div>
      <Modal.Body className={styles.modal_body}>
        <div className={styles.account_recovery_form}>
          <h2 className={styles.account_recovery_success_text}>
            Recovery email sent!
          </h2>
          <div className={styles.success_button_box}>
            <Button type="button" onClick={onBackButtonClicked}>
              Back
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AccountRecoverySuccess;

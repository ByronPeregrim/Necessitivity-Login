import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BadGateway } from "../../errors/http_errors";
import * as UsersApi from "../../network/users_api";
import { EmailCredentials } from "../../network/users_api";
import styles from "../../styles/AccountRecoveryModal.module.css";
import InputField from "../forms/InputField";


interface AccountRecoveryModalProps {
    onDismiss: () => void,
    onBackButtonClicked: () => void,
    onRecoverySuccessful: () => void,
}

const AccountRecoveryModal = ({onDismiss, onBackButtonClicked, onRecoverySuccessful} : AccountRecoveryModalProps) => {
    
    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting}} = useForm<EmailCredentials>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    async function onSubmit(credentials: EmailCredentials) {
        try {
            await UsersApi.verifyEmail(credentials);
            onRecoverySuccessful();
        } catch(error) {
            if (error instanceof BadGateway) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error)
        }
    }

    let errorDisplayed = false;

    return (
        <Modal show onHide={onDismiss}>
            <div className={styles.banner_box}>
                <h1 className={styles.banner_text}>FitTracker5000</h1>
            </div>
            {errorDisplayed = false}
            <Modal.Body className={styles.modal_body}>
                <Form className={styles.account_recovery_form} onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={styles.account_recovery_text}>Forgot Username or Password?</h2>
                    { 
                        errors.email?.message?.length !== undefined ? 
                            <>
                                {errorDisplayed = true}
                                <p className={styles.recovery_error}>
                                    { errors.email?.message }
                                </p>
                            </>
                            :null
                    }
                    {
                        errorText && errorDisplayed === false?
                            <>
                                {errorDisplayed = true}
                                <p className={styles.recovery_error}>
                                    { errorText }
                                </p>
                            </>
                            :null
                    }
                    {
                        !errorText && errorDisplayed === false?
                        <>
                            <p className={styles.recovery_form_text}>Enter email address</p>
                        </>
                        :null
                    }
                    <InputField
                        className={styles.inputField}
                        name="email"
                        label=""
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{
                            required:"Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Email is invalid",
                            },
                            validate: {
                                notIncorrectSize: (fieldValue) => {
                                    return (
                                        (fieldValue.length < 41 && fieldValue.length >= 7) ||
                                        "Email is invalid"
                                    );
                                },
                            }
                        }}
                    />
                     <div className={styles.button_box}>
                        <Button
                            type="button"
                            disabled={isSubmitting}
                            onClick={onBackButtonClicked}
                        >   
                            Back
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >   
                            Submit
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>  
    );
}
 
export default AccountRecoveryModal;
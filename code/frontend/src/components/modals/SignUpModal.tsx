import { useForm } from "react-hook-form";
import { User } from "../../models/users";
import { SignUpCredentials } from "../../network/users_api";
import * as UsersApi from "../../network/users_api";
import { Button, Form, Modal } from "react-bootstrap";
import InputField from "../forms/InputField";
import styles from "../../styles/SignUpModal.module.css";
import { useState } from "react";
import { ConflictError } from "../../errors/http_errors";

interface SignUpModalProps {
    onDismiss: () => void, 
    onSignUpSuccessful: (user: User) => void,
    onBackButtonClicked: () => void,
}

const SignUpModal = ({onDismiss, onSignUpSuccessful, onBackButtonClicked}: SignUpModalProps) => {

    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<SignUpCredentials>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await UsersApi.signUp(credentials);
            onSignUpSuccessful(newUser);
        } catch (error) {
            if (error instanceof ConflictError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }

    let errorDisplayed = false;

    return (
        <>
        <Modal show onHide={onDismiss}>
            <Modal.Body className={styles.modal_body}>
                <Form className={styles.user_signup_form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.banner_box}>
                        <h1 className={styles.banner_text}>FitTracker5000</h1>
                    </div>
                    <h1 className={styles.signup_message}>Sign Up!</h1>
                    { 
                        errors.username?.message?.toString().length !== undefined && errorDisplayed === false ? 
                            <>
                                <p className={styles.registration_error}>
                                    { errors.username?.message.toString() }
                                </p>
                                {errorDisplayed = true}
                            </>
                            :null
                    }
                    { 
                        errors.password?.message?.toString().length !== undefined && errorDisplayed === false? 
                            <>
                                <p className={styles.registration_error}>
                                    { errors.password?.message.toString() }
                                </p>
                                {errorDisplayed = true}
                            </>
                            :null
                    }
                    { 
                        errors.email?.message?.toString().length !== undefined && errorDisplayed === false? 
                            <>
                                <p className={styles.registration_error}>
                                    { errors.email?.message.toString() }
                                </p>
                                {errorDisplayed = true}
                            </>
                            :null
                    }
                    { 
                        errors.first?.message?.toString().length !== undefined && errorDisplayed === false? 
                            <>
                                <p className={styles.registration_error}>
                                    { errors.first?.message.toString() }
                                </p>
                                {errorDisplayed = true}
                            </>
                            :null
                    }
                    { 
                        errors.last?.message?.toString().length !== undefined && errorDisplayed === false ? 
                            <>
                                <p className={styles.registration_error}>
                                    { errors.last?.message.toString() }
                                </p>
                                {errorDisplayed = true}
                            </>
                            :null
                    }
                    { 
                        errors.weight?.message?.toString().length !== undefined && errorDisplayed === false ? 
                            <>
                                <p className={styles.registration_error}>
                                    { errors.weight?.message.toString() }
                                </p>
                                {errorDisplayed = true}
                            </>
                            :null
                    }
                    {errorText && errorDisplayed === false?
                        <>
                            {errorDisplayed = true}
                            <p className={styles.registration_error}>
                                { errorText }
                            </p>
                        </>
                        :null
                    }
                    {
                        errorDisplayed === false ?
                        <>
                            <p className={styles.signup_form_text}>Username and password are case sensitive.</p>
                        </>
                        :null
                    }
                    <InputField
                        className={styles.inputField}
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{
                            required:"Username is required",
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: "Username can only contain letters and numbers",
                            },
                            validate: {
                                notIncorrectSize: (fieldValue) => {
                                    return (
                                        (fieldValue.length < 31 && fieldValue.length > 1) ||
                                        "Username must be between 2 and 30 characters"
                                    );
                                }
                            }
                        }}
                    />
                    <InputField
                        className={styles.inputField}
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{
                            required:"Password is required",
                            pattern: {
                                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                                message: "Password must contain a letter, a number, and a special character",
                            },
                            validate: {
                                notIncorrectSize: (fieldValue) => {
                                    return (
                                        (fieldValue.length < 25 && fieldValue.length > 7) ||
                                        "Password must be between 8 and 24 characters"
                                    );
                                }
                            }
                        }}
                    />
                    <InputField
                        className={styles.inputField}
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm Password"
                        register={register}
                        registerOptions={{
                            required:"Password confirmation is required",
                            validate: {

                            }
                        }}
                    />
                    <InputField
                        className={styles.inputField}
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="user@email.com"
                        register={register}
                        registerOptions={{
                            required:"Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Invalid email format",
                            },
                            validate: {
                                notIncorrectSize: (fieldValue) => {
                                    return (
                                        (fieldValue.length < 41 && fieldValue.length >= 7) ||
                                        "Email must be between 7 and 40 characters"
                                    );
                                },
                            }
                        }}
                    />
                    <InputField
                        className={styles.inputField}
                        name="first"
                        label="First Name"
                        type="text"
                        placeholder="John"
                        register={register}
                        registerOptions={{
                            required:"First name is required",
                            pattern: {
                                value: /^[a-zA-Z-]+$/,
                                message: "First name can only contain characters A-Z, a-z, and -",
                            },
                            validate: {
                                notIncorrectSize: (fieldValue) => {
                                    return (
                                        (fieldValue.length < 31 && fieldValue.length > 1) ||
                                        "First name must be between 2 and 30 characters"
                                    );
                                }
                            }
                        }}
                    />
                    <InputField
                        className={styles.inputField}
                        name="last"
                        label="Last Name"
                        type="text"
                        placeholder="Doe"
                        register={register}
                        registerOptions={{
                            required:"Last name is required",
                            pattern: {
                                value: /^[a-zA-Z-]+$/,
                                message: "Last name can only contain characters A-Z, a-z, and -",
                            },
                            validate: {
                                notIncorrectSize: (fieldValue) => {
                                    return (
                                        (fieldValue.length < 31 && fieldValue.length > 1) ||
                                        "Last name must be between 2 and 30 characters"
                                    );
                                }
                            }
                        }}
                    />
                    <div className={styles.weight_box}>
                        <InputField
                            className={[styles.inputField, styles.weight_input]}
                            name="weight"
                            label="Weight"
                            type="number"
                            placeholder="0"
                            register={register}
                            registerOptions={{
                                required:"Weight is required",
                                validate: {
                                    notIncorrectSize: (fieldValue) => {
                                        return (
                                            (fieldValue < 501 && fieldValue > 49) ||
                                            "Weight must be between 50 and 500 pounds"
                                        );
                                    }
                                }
                            }}
                        />
                    </div>
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
        </>
    );
}

export default SignUpModal;
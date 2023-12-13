import { useForm } from "react-hook-form";
import { Form, FormControl } from "react-bootstrap";
import styles from "../styles/RegistrationForm.module.css";
import { User as UserModel } from "./frontend/src/models/users";
import { SignUpCredentials } from "./frontend/src/network/users_api";
import * as UsersApi from "./frontend/src/network/users_api";
import TextInputField from "./frontend/src/components/forms/InputField";

interface AddUserAccountProps {
    change: () => void,
    onUserSaved: (user: UserModel) => void,
}

export const RegistrationForm = ({change, onUserSaved }: AddUserAccountProps) => {
    const { register, handleSubmit, formState : { errors, isSubmitting }} = useForm<UserInput>();

    let errorDisplayed = false;

    return (
        <>
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
                errors.confirmPassword?.message?.toString().length !== undefined && errorDisplayed === false ? 
                    <>
                        <p className={styles.registration_error}>
                            { errors.confirmPassword?.message.toString() }
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
                errors.feet?.message?.toString().length !== undefined && errorDisplayed === false ? 
                    <>
                        <p className={styles.registration_error}>
                            { errors.feet?.message.toString() }
                        </p>
                        {errorDisplayed = true}
                    </>
                    :null
            }
            { 
                errors.inches?.message?.toString().length !== undefined && errorDisplayed === false? 
                    <>
                        <p className={styles.registration_error}>
                            { errors.inches?.message.toString() }
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
            { 
                errors.age?.message?.toString().length !== undefined && errorDisplayed === false? 
                    <>
                        <p className={styles.registration_error}>
                            { errors.age?.message.toString() }
                        </p>
                        {errorDisplayed = true}
                    </>
                    :null
            }
            <Form onSubmit={handleSubmit(onSubmit)} id={styles.user_signup_form} noValidate>
                {
                    errorDisplayed === false ?
                    <>
                        <p id={styles.signup_form_text}>Username and password are case sensitive.</p>
                    </>
                    :null
                }

                <FormControl
                    type="text" 
                    placeholder="Username"  
                    isInvalid={!!errors.title}
                    {...register("username", {
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
                    }})}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.username?.message?.toString()}
                </Form.Control.Feedback>
                
                <input type="password" placeholder="Password" required {...register("password", {
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
                    }})}
                />
                <input type="password" placeholder="Confirm Password" required {...register("confirmPassword", {
                    required:"Password confirmation is required",
                    validate: {
                        
                    }
                })}
                />
                <input type="text" placeholder="First Name"  required {...register("first", {
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
                    }})}
                />
                <input type="text" placeholder="Last Name" required {...register("last", {
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
                    }})}
                />
                <input type="email" placeholder="Email Address" required {...register("email", {
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
                    }})}
                />
                <div id={styles.height_box}>
                    <div id={styles.height_label}>Height</div>
                    <input type="number" placeholder="ft"  required {...register("feet", {
                    required:"Height field (ft) is required",
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                (fieldValue < 8 && fieldValue > 2) ||
                                "Height must be within 3 to 7 feet"
                            );
                        }
                    }})}
                />
                    <input type="number" placeholder="in"  required {...register("inches", {
                    required:"Height field (in) is required",
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                (fieldValue < 12 && fieldValue >= 0) ||
                                "Height must be within 0 to 11 inches"
                            );
                        }
                    }})}
                />
                </div>
                <div id={styles.weight_box}>
                    <div id={styles.weight_label}>Weight</div>
                    <input type="number" placeholder="lbs" required {...register("weight", {
                    required:"Weight is required",
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                (fieldValue < 501 && fieldValue > 49) ||
                                "Weight must be between 50 and 500 pounds"
                            );
                        }
                    }})}
                />
                </div>
                <div id={styles.age_box}>
                    <div id={styles.age_label}>Age</div>
                    <input type="number" placeholder="0" required {...register("age", {
                    required:"Age is required",
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                (fieldValue < 131 && fieldValue > 17) ||
                                "Age must be between 18 and 130 years"
                            );
                        }
                    }})}
                />
                </div>
                <div className="button_box">
                    <button onClick={()=>change()} type="button">Back</button>
                    <button type="submit" form={styles.user_signup_form}>Submit</button>
                </div>
            </form>
        </>
    )
}
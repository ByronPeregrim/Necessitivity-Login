import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import React from "react";
import styles from "../styles/RecoveryForm.module.css";

type FormValues = {
    email: string;
}

export const RecoveryForm = ({change} : {change:any}) => {
    const form = useForm<FormValues>();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data: FormValues) => {
        console.log('Form submitted', data)
    }

    return (
        <>
            <h2 id={styles.account_recovery_text}>Forgot Username or Password?</h2>
            <form onSubmit={handleSubmit(onSubmit)} id={styles.account_recovery_form} noValidate>
                { 
                    errors.email?.message?.length !== undefined ? 
                        <>
                            <p id={styles.recovery_error}>
                                { errors.email?.message }
                            </p>
                        </>
                        :null
                }
                <input type="email" placeholder="Email Address" required {...register("email", {
                    required:"Email is required",
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]$/,
                        message: "Invalid email format",
                    },
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                (fieldValue.length < 41 && fieldValue.length > 7) ||
                                "Email must be between 7 and 40 characters"
                            );
                        }
                    }})}
                />
                <div className="button_box">
                    <button onClick={()=>change()}  type="button">Back</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <DevTool control={control} />
        </>
    )
}
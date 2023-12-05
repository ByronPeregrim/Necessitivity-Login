import { useForm } from "react-hook-form";
import React from "react";
import { DevTool } from "@hookform/devtools";

type FormValues = {
    username: string;
    password: string;
    confirm_password: string;
    first_name: string;
    last_name: string;
    email: string;
    height_ft: number;
    height_in: number;
    weight: number;
    age: number;
}

export const RegistrationForm = ({change} : {change:any}) => {
    const form = useForm<FormValues>();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState; 

    const onSubmit = (data: FormValues) => {
        console.log('Form submitted', data)
    }

    let errorDisplayed = false;

    return (
        <>
            { 
                errors.username?.message?.length !== undefined && errorDisplayed === false ? 
                    <>
                        <p className="registration_error">
                            { errors.username?.message }
                        </p>
                        {errorDisplayed = true}
                    </>
                    :null
            }
            { 
                errors.password?.message?.length !== undefined && errorDisplayed === false? 
                    <>
                        <p className="registration_error">
                            { errors.password?.message }
                        </p>
                        {errorDisplayed = true}
                    </>
                    :null
            }
            { 
                errors.confirm_password?.message?.length !== undefined && errorDisplayed === false ? 
                    <>
                        <p className="registration_error">
                            { errors.confirm_password?.message }
                        </p>
                        {errorDisplayed = true}
                    </>
                    :null
            }
            { 
                errors.first_name?.message?.length !== undefined && errorDisplayed === false? 
                    <>
                        <p className="registration_error">
                            { errors.first_name?.message }
                        </p>
                        {errorDisplayed = true}
                    </>
                    :null
            }
            { 
                errors.last_name?.message?.length !== undefined && errorDisplayed === false ? 
                    <>
                        <p className="registration_error">
                            { errors.last_name?.message }
                        </p>
                        {errorDisplayed = true}
                    </>
                    :null
            }
            { 
                errors.email?.message?.length !== undefined && errorDisplayed === false? 
                    <>
                        <p className="registration_error">
                            { errors.email?.message }
                        </p>
                        {errorDisplayed = true}
                    </>
                    :null
            }
            { 
                errors.height_ft?.message?.length !== undefined && errorDisplayed === false ? 
                    <>
                        <p className="registration_error">
                            { errors.height_ft?.message }
                        </p>
                        {errorDisplayed = true}
                    </>
                    :null
            }
            { 
                errors.height_in?.message?.length !== undefined && errorDisplayed === false? 
                    <>
                        <p className="registration_error">
                            { errors.height_in?.message }
                        </p>
                        {errorDisplayed = true}
                    </>
                    :null
            }
            { 
                errors.weight?.message?.length !== undefined && errorDisplayed === false ? 
                    <>
                        <p className="registration_error">
                            { errors.weight?.message }
                        </p>
                        {errorDisplayed = true}
                    </>
                    :null
            }
            { 
                errors.age?.message?.length !== undefined && errorDisplayed === false? 
                    <>
                        <p className="registration_error">
                            { errors.age?.message }
                        </p>
                        {errorDisplayed = true}
                    </>
                    :null
            }
            <form onSubmit={handleSubmit(onSubmit)} id="user_signup_form" noValidate>
                {
                    errorDisplayed === false ?
                    <>
                        <p id="signup_form_text">Username and password are case sensitive.</p>
                    </>
                    :null
                }
                <input className="reg_input" type="text" id="username" placeholder="Username"  required {...register("username", {
                    required:"Username is required",
                    pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: "Username can only contain letters and numbers",
                    },
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                fieldValue.length < 31 && fieldValue.length > 1 ||
                                "Username must be between 2 and 30 characters"
                            );
                        }
                    }})}
                />
                <input type="password" id="password" placeholder="Password" required {...register("password", {
                    required:"Password is required",
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                        message: "Password must contain a letter, a number, and a special character",
                    },
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                fieldValue.length < 25 && fieldValue.length > 7 ||
                                "Password must be between 8 and 24 characters"
                            );
                        }
                    }})}
                />
                <input type="password" id="confirm_password" placeholder="Confirm Password" required {...register("confirm_password", {
                    required:"Password confirmation is required",
                })}
                />
                <input type="text" id="first" placeholder="First Name"  required {...register("first_name", {
                    required:"First name is required",
                    pattern: {
                        value: /^[a-zA-Z\-]+$/,
                        message: "First name can only contain characters A-Z, a-z, and -",
                    },
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                fieldValue.length < 31 && fieldValue.length > 1 ||
                                "First name must be between 2 and 30 characters"
                            );
                        }
                    }})}
                />
                <input type="text" id="last" placeholder="Last Name" required {...register("last_name", {
                    required:"Last name is required",
                    pattern: {
                        value: /^[a-zA-Z\-]+$/,
                        message: "Last name can only contain characters A-Z, a-z, and -",
                    },
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                fieldValue.length < 31 && fieldValue.length > 1 ||
                                "Last name must be between 2 and 30 characters"
                            );
                        }
                    }})}
                />
                <input type="email" id="email" placeholder="Email Address" required {...register("email", {
                    required:"Email is required",
                    pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email format",
                    },
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                fieldValue.length < 41 && fieldValue.length >= 7 ||
                                "Email must be between 7 and 40 characters"
                            );
                        }
                    }})}
                />
                <div id="height_box">
                    <div id="height_label">Height</div>
                    <input type="number" id="height_ft" placeholder="ft"  required {...register("height_ft", {
                    required:"Height field (ft) is required",
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                fieldValue < 8 && fieldValue > 2 ||
                                "Height must be within 3 to 7 feet"
                            );
                        }
                    }})}
                />
                    <input type="number" id="height_in" placeholder="in"  required {...register("height_in", {
                    required:"Height field (in) is required",
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                fieldValue < 12 && fieldValue >= 0 ||
                                "Height must be within 0 to 11 inches"
                            );
                        }
                    }})}
                />
                </div>
                <div id="weight_box">
                    <div id="weight_label">Weight</div>
                    <input type="number" id="weight" placeholder="lbs" required {...register("weight", {
                    required:"Weight is required",
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                fieldValue < 501 && fieldValue > 49 ||
                                "Weight must be between 50 and 500 pounds"
                            );
                        }
                    }})}
                />
                </div>
                <div id="age_box">
                    <div id="age_label">Age</div>
                    <input type="number" id="age" placeholder="0" required {...register("age", {
                    required:"Age is required",
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                fieldValue < 131 && fieldValue > 17 ||
                                "Age must be between 18 and 130 years"
                            );
                        }
                    }})}
                />
                </div>
                <div className="button_box" id="signup_button_box">
                    <button onClick={()=>change()} type="button" id="signup_back_button">Back</button>
                    <button type="submit" id="signup_submit_button">Submit</button>
                </div>
            </form>
            <DevTool control={control} />
        </>
    )
}
import { useForm } from "react-hook-form";
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
    const { register, control, handleSubmit } = form;

    const onSubmit = (data: FormValues) => {
        console.log('Form submitted', data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} id="user_signup_form" noValidate>
                <p id="signup_form_text">Username and password are case sensitive.</p>
                <input type="text" id="username" placeholder="Username"  required {...register("username", {
                    required:"Username is required",
                    pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: "Username can only contain letters and numbers",
                    }})}
                />
                <input type="password" id="password" placeholder="Password" required {...register("password", {
                    required:"Password is required",
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,25}$/,
                        message: "Password must contain a letter, a number, and a special character",
                    }})}
                />
                <input type="password" id="confirm_password" placeholder="Confirm Password" required {...register("confirm_password", {
                    required:"Password confirmation is required"})}
                />
                <input type="text" id="first" placeholder="First Name"  required {...register("first_name", {
                    required:"First name is required",
                    pattern: {
                        value: /^[a-zA-Z\-]{2,30}$/,
                        message: "First name can only contain characters A-Z, a-z, and -",
                    }})}
                />
                <input type="text" id="last" placeholder="Last Name" required {...register("last_name", {
                    required:"Last name is required",
                    pattern: {
                        value: /^[a-zA-Z\-]{2,30}$/,
                        message: "Last name can only contain characters A-Z, a-z, and -",
                    }})}
                />
                <input type="email" id="email" placeholder="Email Address" required {...register("email", {
                    required:"Email is required",
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,25}$/,
                        message: "Invalid email format",
                    }})}
                />
                <div id="height_box">
                    <div id="height_label">Height</div>
                    <input type="number" id="height_ft" placeholder="ft"  required {...register("height_ft", {
                    required:"Height field is required"})}
                />
                    <input type="number" id="height_in" placeholder="in"  required {...register("height_in", {
                    required:"Height field is required"})}
                />
                </div>
                <div id="weight_box">
                    <div id="weight_label">Weight</div>
                    <input type="number" id="weight" placeholder="lbs" required {...register("weight", {
                    required:"Weight is required"})}
                />
                </div>
                <div id="age_box">
                    <div id="age_label">Age</div>
                    <input type="number" id="age" placeholder="0" required {...register("age", {
                    required:"Age is required"})}
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
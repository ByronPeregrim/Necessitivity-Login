import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
    username: string
    password: string
}

export const LoginForm = ({change} : {change:any}) => {
    const form = useForm<FormValues>();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState; 

    const onSubmit = (data: FormValues) => {
        console.log('Form submitted', data)
    }

    let errorDisplayed = false;

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} id="user_login_form" noValidate>
                {errorDisplayed = false}
                { 
                    errors.username?.message?.length !== undefined && errorDisplayed === false ? 
                        <>
                            <p className="login_error">
                                { errors.username?.message }
                            </p>
                            {errorDisplayed = true}
                        </>
                        :null
                }
                { 
                    errors.password?.message?.length !== undefined && errorDisplayed === false? 
                        <>
                            <p className="login_error">
                                { errors.password?.message }
                            </p>
                            {errorDisplayed = true}
                        </>
                        :null
                }
                <input className="input_account_info_box" id="input_username_box" type="text" placeholder="Username" {...register("username", {
                    required:"Username is required",
                    pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: "Username is not valid",
                    },
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                fieldValue.length < 31 && fieldValue.length > 1 ||
                                "Username is not valid"
                            );
                        }
                    }})}
                />
                <input className="input_account_info_box" id="input_password_box" type="password" placeholder="Password" required {...register("password", {
                    required:"Password is required",
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]$/,
                        message: "Password is not valid",
                    },
                    validate: {
                        notIncorrectSize: (fieldValue) => {
                            return (
                                fieldValue.length < 25 && fieldValue.length > 7 ||
                                "Password is not valid"
                            );
                        }
                    }})}
                />
                <div className="button_box" id="login_button_box">
                    <button onClick={()=>change()} type="button" id="login_back_button">Back</button>
                    <button type="submit" id="login_submit_button">Submit</button>
                </div>
            </form>
            <DevTool control={control} />
        </>
    )
}
import { useForm } from "react-hook-form";

export const LoginForm = ({change} : {change:any}) => {

    return (
        <>
            <form method="post" action="/login-user" id="user_login_form" name="login">
                <input className="input_account_info_box" id="input_username_box" name="username" type="text" placeholder="Username"  required/>
                <input className="input_account_info_box" id="input_password_box" name="password" type="password" placeholder="Password" required/>
                <div className="button_box" id="login_button_box">
                    <button onClick={()=>change()} type="button" id="login_back_button">Back</button>
                    <button type="submit" id="login_submit_button">Submit</button>
                </div>
            </form>
        </>
    )
}
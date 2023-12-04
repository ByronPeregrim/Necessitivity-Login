import { useForm } from "react-hook-form";

export const RegistrationForm = ({change} : {change:any}) => {

    return (
        <>
            <form method="post" action="/register" id="user_signup_form" name="registration">
                <p id="signup_form_text">Username and password are case sensitive.</p>
                <input id="username" name="username" type="text" placeholder="Username"  required/>
                <input id="password" name="password" type="password" placeholder="Password" required/>
                <input id="confirm_password" name="c_pass" type="password" placeholder="Confirm Password" required/>
                <input id="first" name="first" type="text" placeholder="First Name"  required/>
                <input id="last" name="last" type="text" placeholder="Last Name" required/>
                <input id="email" type="email" name="email" placeholder="Email Address" required/>
                <div id="height_box">
                    <div id="height_label">Height</div>
                    <input id="height_ft" type="number" name="feet" placeholder="ft"  required/>
                    <input id="height_in" type="number" name="inches" placeholder="in"  required/>
                </div>
                <div id="weight_box">
                    <div id="weight_label">Weight</div>
                    <input id="weight" type="number" name="weight" placeholder="lbs" required/>
                </div>
                <div id="age_box">
                    <div id="age_label">Age</div>
                    <input id="age" type="number" name="age" placeholder="0" required/>
                </div>
                <div className="button_box" id="signup_button_box">
                    <button onClick={()=>change()} type="button" id="signup_back_button">Back</button>
                    <button type="submit" id="signup_submit_button">Submit</button>
                </div>
            </form>
        </>
    )
}
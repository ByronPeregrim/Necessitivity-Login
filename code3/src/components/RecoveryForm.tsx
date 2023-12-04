import { useForm } from "react-hook-form";

export const RecoveryForm = ({change} : {change:any}) => {

    return (
        <>
            <form method="post" name="account_recovery" action="/recover-account" id="account_recovery_form">
                <input id="account_recovery_input" name="email" type="email" placeholder="Email Address" required/>
                <div className="button_box" id="account_recovery_button_box">
                    <button onClick={()=>change()}  type="button" id="account_recovery_back_button">Back</button>
                    <button type="submit" id="account_recovery_submit_button">Submit</button>
                </div>
            </form>
        </>
    )
}
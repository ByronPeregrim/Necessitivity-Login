import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
    email: string;
}

export const RecoveryForm = ({change} : {change:any}) => {
    const form = useForm<FormValues>();
    const { register, control, handleSubmit } = form;

    const onSubmit = (data: FormValues) => {
        console.log('Form submitted', data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} id="account_recovery_form" noValidate>
                <input type="email" id="account_recovery_input" placeholder="Email Address" required {...register("email", {
                    required:"Email is required",
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,25}$/,
                        message: "Invalid email format",
                    }})}
                />
                <div className="button_box" id="account_recovery_button_box">
                    <button onClick={()=>change()}  type="button" id="account_recovery_back_button">Back</button>
                    <button type="submit" id="account_recovery_submit_button">Submit</button>
                </div>
            </form>
            <DevTool control={control} />
        </>
    )
}
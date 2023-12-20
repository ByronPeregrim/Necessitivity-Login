import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styles from "../../styles/AddWorkoutModal.module.css"
import * as UsersApi from "../../network/users_api";
import { ConflictError } from "../../errors/http_errors";
import { useState } from "react";
import { NewWorkoutInfo } from "../../network/users_api";
import { User } from "../../models/users";
import moment from "moment";

interface AddWorkoutModalProps {
    currentUser : User | null,
    onAddWorkoutSuccessful : () => void,
    onBackButtonClicked: () => void,
}

const AddWorkoutModal = ({currentUser, onAddWorkoutSuccessful, onBackButtonClicked} : AddWorkoutModalProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<NewWorkoutInfo>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const [calories, setCalories] = useState(0);
    const [totalCalories, setTotalCalories] = useState(0);

    async function onSubmit(newWorkoutInfo: NewWorkoutInfo) {
        try {
            newWorkoutInfo.calories = totalCalories;
            const newWorkout = await UsersApi.addWorkout(newWorkoutInfo);
            alert("Add Workout Successful!");
            onAddWorkoutSuccessful();
        } catch (error) {
            if (error instanceof ConflictError) {
                
            } else {
                alert(error);
            }
            console.error(error);
        }
    }

    const updateTotalCalories = () => {
        setTotalCalories(totalCalories + calories);
    }

    return ( 
        <Modal show>
            <Modal.Body>
                <div className={styles.banner_box}>
                    <h1 className={styles.banner_text}>FitTracker 5000</h1>
                </div>
                <label htmlFor="calories">Enter amount of calories burned:</label>
                <input type="number" id="calories" name="calories" placeholder="0" defaultValue={0} onChange={e => setCalories(Number(e.target.value))}/>
                <button type="button" onClick={updateTotalCalories}>Enter</button>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register("user")} defaultValue={currentUser?._id}/>
                    <input type="hidden" {...register("calories")} defaultValue={totalCalories}/>
                    <input type="hidden" {...register("date")} defaultValue={moment().format("MMM Do YY")}/>
                    <div className={styles.total_calories_text}>
                        <p><b>Total Calories: </b></p> {totalCalories}
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
                            Confirm
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
     );
}
 
export default AddWorkoutModal;
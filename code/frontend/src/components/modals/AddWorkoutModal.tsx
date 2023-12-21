import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styles from "../../styles/AddWorkoutModal.module.css"
import * as UsersApi from "../../network/users_api";
import { ConflictError } from "../../errors/http_errors";
import { useState } from "react";
import { NewWorkoutInfo } from "../../network/users_api";
import { User } from "../../models/users";
import moment from "moment";
import { exercises } from "../../dictionaries/workouts";

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

    const [duration, setDuration] = useState(0);
    const [exercise, setExercise] = useState("");
    const [totalCalories, setTotalCalories] = useState(0);
    const [showEstimatedCalories, setShowEstimatedCalories] = useState(0);
    const [showEnteredCalories, setShowEnteredCalories] = useState(0);

    async function onSubmit(newWorkoutInfo: NewWorkoutInfo) {
        try {
            newWorkoutInfo.calories = totalCalories;
            await UsersApi.addWorkout(newWorkoutInfo);
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
        setTotalCalories(totalCalories + showEnteredCalories);
    }

    const calculateCalories = () => {
        const userWeight = currentUser?.weight;
        if (exercise !== "" && userWeight !== undefined && duration > 0) {
            const METScore = exercises[exercise];
            let caloriesBurned = ((METScore * 3.5 * (userWeight/2.205)) / 200) * duration;
            caloriesBurned = Math.round(caloriesBurned);
            setShowEstimatedCalories(caloriesBurned);
            setShowEnteredCalories(caloriesBurned);
        } 
    }

    const handleChange = (e: { preventDefault: () => void; target: { value: any; }; }) => {
        setShowEnteredCalories(Number(e.target.value));
    }

    return ( 
        <Modal show>
            <Modal.Body>
                <div className={styles.banner_box}>
                    <h1 className={styles.banner_text}>FitTracker 5000</h1>
                </div>
                <div className={styles.custom_exercise_wrapper}>
                    <label htmlFor="lang">Exercise:</label>
                    <select name="languages" id="lang" defaultValue={""} onChange={e => setExercise(e.target.value)}>
                        <option value="" disabled hidden>Choose exercise</option>
                        <option value="running">Running</option>
                        <option value="walking">Walking</option>
                        <option value="biking">Biking</option>
                        <option value="swimming">Swimming</option>
                        <option value="jumping-jacks">Jumping Jacks</option>
                        <option value="basketball">Basketball</option>
                        <option value="weight-lifting">Weight Lifting</option>
                    </select>
                    <label htmlFor="duration">Duration (mins):</label>
                    <input type="number" id="duration" name="duration" defaultValue={0} onChange={e => setDuration(Number(e.target.value))}/>
                    <Button
                        type="button"
                        disabled={isSubmitting}
                        onClick={calculateCalories}
                    >   
                        Enter
                    </Button>
                    <p>Estimated Calories: {showEstimatedCalories}</p>
                </div>
                <label htmlFor="calories">Enter amount of calories burned:</label>
                <input type="number" id="calories" name="calories" value={showEnteredCalories.toString()} onChange={handleChange}/>
                <button type="button" onClick={updateTotalCalories}>Add</button>
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
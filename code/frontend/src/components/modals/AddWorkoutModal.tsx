import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import styles from "../../styles/AddWorkoutModal.module.css"
import * as UsersApi from "../../network/users_api";
import { ConflictError } from "../../errors/http_errors";
import { useState } from "react";
import Workout from "../../classes/Workout";
import { UpdatedWorkoutInfo } from "../../network/users_api";
import { User } from "../../models/users";

interface AddWorkoutModalProps {
    currentUser : User | null,
    onUpdateWorkoutSuccessful : () => void,
    onBackButtonClicked: () => void,
}

const AddWorkoutModal = ({currentUser, onUpdateWorkoutSuccessful, onBackButtonClicked} : AddWorkoutModalProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<UpdatedWorkoutInfo>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    const updatedWorkouts = currentUser?.workouts;

    async function onSubmit(updatedWorkout: UpdatedWorkoutInfo) {
        try {
            const updatedUser = await UsersApi.updateUserWorkout(updatedWorkout);
            onUpdateWorkoutSuccessful();
        } catch (error) {
            if (error instanceof ConflictError) {
                
            } else {
                alert(error);
            }
            console.error(error);
        }
    }

    return ( 
        <Modal show>
            <Modal.Body>
                <div className={styles.banner_box}>
                    <h1 className={styles.banner_text}>FitTracker 5000</h1>
                </div>
                HERE IS WHERE I NEED TO UPDATE updatedWorkouts BEFORE IT IS SUBMITTED
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register("username")} defaultValue={currentUser?.username}/>
                    <input type="hidden" {...register("workouts")} defaultValue={JSON.stringify(updatedWorkouts)}/>
                </Form>
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
            </Modal.Body>
        </Modal>
     );
}
 
export default AddWorkoutModal;
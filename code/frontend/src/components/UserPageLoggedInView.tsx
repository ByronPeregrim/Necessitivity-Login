import { Button, Container } from "react-bootstrap";
import { User } from "../models/users";
import styles from "../styles/UserPage.module.css";
import { useEffect, useState } from "react";
import UserEditInfoFormModal from "./modals/UserEditInfoForm";
import AddWorkoutModal from "./modals/AddWorkoutModal";
import * as UsersApi from "../network/users_api";
import moment from "moment";

interface UserPageLoggedInViewProps {
    user: User | null,
}

const UserPageLoggedInView = ({user} : UserPageLoggedInViewProps) => {

    const [showUserInfo, setShowUserInfo] = useState(true);
    const [showEditInfoForm, setShowEditInfoForm] = useState(false);
    const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false);
    const [showTodaysCalories, setShowTodaysCalories] = useState(0);
    const [showLastSevenDaysCalories, setShowLastSevenDaysCalories] = useState(0);
    const [showLastThirtyDaysCalories, setShowLastThirtyDaysCalories] = useState(0);
    const id = user?._id;
    
    useEffect(() => {
        async function updateCalorieBoxes() {
            try {
                if (id) {
                    const today = getLastXDays(1);
                    const todaysCalories = getLastXDaysCalories(today);
                    if (todaysCalories !== null) {
                        setShowTodaysCalories(await todaysCalories);
                    }
                    const lastSevenDays = getLastXDays(7);
                    const lastSevenDaysCalories = getLastXDaysCalories(lastSevenDays);
                    if (lastSevenDaysCalories !== null) {
                        setShowLastSevenDaysCalories(await lastSevenDaysCalories);
                    }
                    const lastThirtyDays = getLastXDays(30);
                    const lastThirtyDaysCalories = getLastXDaysCalories(lastThirtyDays);
                    if (lastThirtyDaysCalories !== null) {
                        setShowLastThirtyDaysCalories(await lastThirtyDaysCalories);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
        async function getLastXDaysCalories(dates : string[]) {
            let totalCalories = 0;
            try {
                if (id) {
                    const lastXDays = await UsersApi.getCaloriesByDay({id, dates})
                    for (let i = 0; i < lastXDays.length; i++) {
                        totalCalories += lastXDays[i].calories;
                    }
                }
            } catch (error) {
                console.error(error);
            }
            return totalCalories;
        }
        updateCalorieBoxes();
    }, [id]);

    const getLastXDays = (days : number) => {
        const dates = [];
        for (let i = 0; i < days; i++) {
          dates.push(moment().subtract(i, 'day').format("MMM Do YY"));
        }
        return dates;
    }

    return (
        <Container className={styles.wrapper}>

            <div className={styles.banner_box}>
                <h1 className={styles.banner_text}>FitTracker 5000</h1>
            </div>

            <div className={styles.user_info_box}>
                {showUserInfo?
                    <>
                        <div className={styles.user_info}>
                            <p><b>Name: </b>{user?.first} {user?.last}</p>
                            <p><b>Username: </b>{user?.username}</p>
                            <p><b>Email: </b>{user?.email}</p>
                            <p><b>Weight: </b>{user?.weight}lbs</p>
                        </div>
                        <div className={styles.edit_info_box}>
                            <Button
                                onClick={() => [setShowUserInfo(false), setShowEditInfoForm(true)]}
                                className={styles.edit_info_button}
                            > Edit
                            </Button>
                        </div>
                    </>
                    :null

                }
                {showEditInfoForm?
                    <>
                        <UserEditInfoFormModal
                            currentUser={user}
                            onEditInfoSuccessful={() => [window.location.reload(), setShowEditInfoForm(false), setShowUserInfo(true)]}
                            onBackButtonClicked={() => [setShowEditInfoForm(false), setShowUserInfo(true)]}/>
                    </>
                    :null
                } 
            </div>
            <Button
                className={styles.user_page_button}
                onClick={() => [setShowAddWorkoutModal(true)]}
                >
                Add Workout
            </Button>
            {showAddWorkoutModal?
            <AddWorkoutModal
                currentUser = {user}
                onAddWorkoutSuccessful={() => [setShowAddWorkoutModal(false), window.location.reload()]}
                onBackButtonClicked={() => [setShowAddWorkoutModal(false)]} />
            :null
            }
            <div className={styles.calories_burned_wrapper}>
                <div>
                    Calories burned today:
                    <div>
                        {showTodaysCalories}
                    </div>
                </div>
                <div>
                    Calories burned over last 7 days:
                    <div>
                        {showLastSevenDaysCalories}
                    </div>
                </div>
                <div>
                    Calories burned over last 30 days:
                    <div>
                        {showLastThirtyDaysCalories}
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default UserPageLoggedInView;
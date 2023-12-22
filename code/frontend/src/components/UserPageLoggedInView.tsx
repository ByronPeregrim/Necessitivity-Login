import { Button, Container } from "react-bootstrap";
import { User } from "../models/users";
import styles from "../styles/UserPage.module.css";
import { useEffect, useState } from "react";
import UserEditInfoFormModal from "./modals/UserEditInfoForm";
import AddWorkoutModal from "./modals/AddWorkoutModal";
import * as UsersApi from "../network/users_api";
import moment from "moment";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip
} from 'chart.js';
import { Workout } from "../models/workouts";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
)

interface UserPageLoggedInViewProps {
    user: User | null,
}

const array : Workout[] = [];

const UserPageLoggedInView = ({user} : UserPageLoggedInViewProps) => {

    let maxCalories = 1000;
    const [showUserInfo, setShowUserInfo] = useState(true);
    const [showEditInfoForm, setShowEditInfoForm] = useState(false);
    const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false);
    const [showTodaysCalories, setShowTodaysCalories] = useState(0);
    const [showLastSevenDaysCalories, setShowLastSevenDaysCalories] = useState(0);
    const [showLastThirtyDaysCalories, setShowLastThirtyDaysCalories] = useState(0);
    const [lastTenDays, setLastTenDays] = useState(array);
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
        const setLastTenDaysUseState = async() => {
            const dates = getLastXDays(10);
            try {
                if (id) {
                    const lastTenDays = await UsersApi.getCaloriesByDay({id, dates})
                    setLastTenDays(lastTenDays);
                }
            } catch (error) {
                console.error(error);
            }
        }
        setLastTenDaysUseState();
        updateCalorieBoxes();
    }, [id]);

    const getLastXDays = (days : number) => {
        const dates = [];
        for (let i = 0; i < days; i++) {
          dates.push(moment().subtract(i, 'day').format("MMM Do YY"));
        }
        return dates;
    }



    const getLastTenDaysCalories = () => {
        const dates = getLastXDays(10);
        let array: number[] = [];
        let max = 0;
        for (let i = 0; i < dates.length; i++) {
            let mySwitch = false;
            for (let j = 0; j < lastTenDays.length; j++) {
                if (dates[i] === lastTenDays[j].date) {
                    array.push(lastTenDays[j].calories);
                    mySwitch = true;
                    if (lastTenDays[j].calories > maxCalories) {
                        max = lastTenDays[j].calories;
                    }
                }
            }
            if (!mySwitch) {
                array.push(0);
            }
        }
        if (max > 1000) {
            maxCalories = max + 500;
        }
        return array;
    }

    const data = {
        labels: getLastXDays(10).reverse(),
        datasets: [{
            data: getLastTenDaysCalories().reverse(),
            backgroundColor: 'green',
            borderColor: 'black',
            pointBorderColor: 'green',
            tension: 0.2
        }
        ]
    }

    const options = {
        plugins: {
        },
        scales: {
            y: {
                min: 0,
                max: maxCalories,
                title: {
                    display: true,
                    text: "Calories Burned",
                    font: {
                        size: 16,
                    },
                    color: "silver",
                },
                ticks: {
                }
            },
            x: {
                title: {
                    display: true,
                    text: "Date",
                    font: {
                        size: 16
                    },
                    color: "silver",
                },
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                }
            }
        }
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
            <div className={styles.line_chart_wrapper}>
                <label htmlFor="line_chart">Calories Burned Over Last Ten Days</label>
                <Line
                    id="line_chart"
                    data = {data}
                    options={options}
                ></Line>
            </div>
        </Container>
    );
}

export default UserPageLoggedInView;
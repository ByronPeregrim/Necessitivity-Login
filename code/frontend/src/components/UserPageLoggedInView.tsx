import { Button, Container } from "react-bootstrap";
import { User } from "../models/users";
import styles from "../styles/UserPage.module.css";
import { useState } from "react";
import UserEditInfoFormModal from "./modals/UserEditInfoForm";

interface UserPageLoggedInViewProps {
    user: User | null,
}

const UserPageLoggedInView = ({user} : UserPageLoggedInViewProps) => {

    const [showUserInfo, setShowUserInfo] = useState(true);
    const [showEditInfoForm, setShowEditInfoForm] = useState(false);

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
                >
                Add Workout
            </Button> 
            <div className={styles.calories_burned_wrapper}>
                <div>
                    Calories burned today:
                    <div>
                        {350}
                    </div>
                </div>
                <div>
                    Calories burned over last 7 days:
                    <div>
                        {2200}
                    </div>
                </div>
                <div>
                    Calories burned over last 30 days:
                    <div>
                        {8430}
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default UserPageLoggedInView;
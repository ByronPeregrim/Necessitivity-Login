import { Button, Container, Form } from "react-bootstrap";
import { User } from "../models/users";
import InputField from "./forms/InputField";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AdminSearchInput } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import { BadGateway, MissingParameters } from "../errors/http_errors";
import AdminSearchResultsModal from "./modals/AdminSearchResultsModal";
import styles from "../styles/AdminPage.module.css";
import ConfirmDeleteModal from "./modals/ConfirmDeleteModal";
import DeleteUserSuccessModal from "./modals/DeleteUserSuccessModal";
import EditInfoFormModal from "./modals/AdminEditInfoFormModal";

interface AdminPageLoggedInViewProps {
    loggedInAdmin: User | null,
}

const AdminPageLoggedInView = ({loggedInAdmin} : AdminPageLoggedInViewProps) => {

    const [errorText, setErrorText] = useState<string | null>(null);
    const [returnedUser, setReturnedUser] = useState<User | null>(null);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [showDeleteUserSuccessModal, setShowDeleteUserSuccessModal] = useState(false);
    const [showEditInfoForm, setShowEditInfoForm] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting}} = useForm<AdminSearchInput>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    async function onSubmit(credentials: AdminSearchInput) {
        try {
            const returnedUser = await UsersApi.getUserForAdmin(credentials);
            setReturnedUser(returnedUser);
            setShowSearchResults(true);
        } catch(error) {
            if (error instanceof MissingParameters) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error)
        }
    }

    async function deleteUser(user: User | null) {
        try {
            await UsersApi.deleteUser(user);
            setShowConfirmDeleteModal(false);
            setShowDeleteUserSuccessModal(true);
            console.log("User account: " + user?.username + " deleted by Admin: " + loggedInAdmin?.username);
        } catch(error) {
            if (error instanceof BadGateway) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error)
        }
    }

    let errorDisplayed = false;

    return ( 
        <Container className={styles.wrapper}>

            <div className={styles.banner_box}>
                <h1 className={styles.banner_text}>FitTracker 5000</h1>
            </div>

            <Form className={styles.admin_search_form} onSubmit={handleSubmit(onSubmit)}>
                
                { 
                    errors.username?.message?.toString().length !== undefined && errorDisplayed === false ? 
                        <>
                            <p className={styles.search_error}>
                                { errors.username?.message.toString() }
                            </p>
                            {errorDisplayed = true}
                        </>
                        :null
                }
                { 
                    errors.email?.message?.toString().length !== undefined && errorDisplayed === false? 
                        <>
                            <p className={styles.search_error}>
                                { errors.email?.message.toString() }
                            </p>
                            {errorDisplayed = true}
                        </>
                        :null
                }
                {errorText && errorDisplayed === false?
                    <>
                        {errorDisplayed = true}
                        <p className={styles.search_error}>
                            { errorText }
                        </p>
                    </>
                    :null
                }
                {
                    errorDisplayed === false ?
                    <>
                        <p className={styles.form_text}>Search for user account.</p>
                    </>
                    :null
                }
                <InputField
                    className={styles.inputField}
                    name="username"
                    label=""
                    type="text"
                    placeholder="Username"
                    register={register}
                    registerOptions={{
                        pattern: {
                            value: /^[a-zA-Z0-9]+$/,
                            message: "Username can only contain letters and numbers",
                        },
                        validate: {
                            notIncorrectSize: (fieldValue) => {
                                return (
                                    (fieldValue.length < 31) ||
                                    "Username must be between 2 and 30 characters"
                                );
                            }
                        }
                    }}
                />

                <p className={styles.or}>Or</p>

                <InputField
                    className={styles.inputField}
                    name="email"
                    label=""
                    type="email"
                    placeholder="Email"
                    register={register}
                    registerOptions={{
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Email is invalid",
                        },
                        validate: {
                            notIncorrectSize: (fieldValue) => {
                                return (
                                    (fieldValue.length < 41) ||
                                    "Email is invalid"
                                );
                            },
                        }
                    }}
                />

                <div className={styles.button_box}>
                    <Button
                        className={styles.submit_button}
                        type="submit"
                        disabled={isSubmitting}
                    >   
                        Search
                    </Button>
                </div>
                
            </Form>

            {showSearchResults?
                <AdminSearchResultsModal
                currentUser={returnedUser}
                onClickedDeleteUser={() => [setShowSearchResults(false), setShowConfirmDeleteModal(true)]}
                onClickedEditUser={() => [setShowSearchResults(false), setShowEditInfoForm(true)]} />
                :null
            }
            {showConfirmDeleteModal?
                <ConfirmDeleteModal
                onClickedConfirmDeleteUser={() => deleteUser(returnedUser)}
                onClickedBackButton={() => [setShowSearchResults(true), setShowConfirmDeleteModal(false)]} />
                :null
            }
            {showDeleteUserSuccessModal?
                <DeleteUserSuccessModal/>
                :null
            }
            {showEditInfoForm?
                <EditInfoFormModal
                currentUser={returnedUser}
                onEditInfoSuccessful={() => {setShowEditInfoForm(false)}}
                onBackButtonClicked={() => [setShowEditInfoForm(false), setShowSearchResults(true)]}/>
                :null
            }

        </Container>
    );
}
 
export default AdminPageLoggedInView;
import { Button, Container, Form } from "react-bootstrap";
import { User } from "../models/users";
import InputField from "./forms/InputField";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AdminSearchInput } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import { BadGateway } from "../errors/http_errors";
import AdminSearchResultsModal from "./modals/AdminSearchResultsModal";
import styles from "../styles/AdminPage.module.css";

interface AdminPageLoggedInViewProps {
    loggedInAdmin: User | null,
}

const AdminPageLoggedInView = ({loggedInAdmin} : AdminPageLoggedInViewProps) => {

    const [returnedUser, setReturnedUser] = useState<User | null>(null);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [showSearchResults, setShowSearchResults] = useState(false);

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
            if (error instanceof BadGateway) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error)
        }
    }

    let errorDisplayed = false;

    const onClearButtonClicked = () => {
        console.log("CLEAR");
    }

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
                        type="button"
                        disabled={isSubmitting}
                        onClick={onClearButtonClicked}
                    >   
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                    >   
                        Search
                    </Button>
                </div>
                
            </Form>

            {showSearchResults?
                <AdminSearchResultsModal currentUser={returnedUser} />
                :null
            }
        </Container>
    );
}
 
export default AdminPageLoggedInView;
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../../errors/http_errors";
import { User } from "../../models/users";
import * as UsersApi from "../../network/users_api";
import { LoginCredentials } from "../../network/users_api";
import styles from "../../styles/LoginModal.module.css";
import InputField from "../forms/InputField";

interface LoginModalProps {
  onLoginSuccessful: (user: User) => void;
  onBackButtonClicked: () => void;
  onAccountRecoveryClicked: () => void;
}

const LoginModal = ({
  onLoginSuccessful,
  onBackButtonClicked,
  onAccountRecoveryClicked,
}: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await UsersApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  let errorDisplayed = false;

  return (
    <Modal show>
      <div className={styles.banner_box}>
        <h1 className={styles.banner_text}>FitTracker 5000</h1>
      </div>
      {(errorDisplayed = false)}
      <Modal.Body>
        <Form
          className={styles.user_login_form}
          onSubmit={handleSubmit(onSubmit)}
        >
          {errors.username?.message?.length !== undefined &&
          errorDisplayed === false ? (
            <>
              {(errorDisplayed = true)}
              <p className={styles.login_error}>{errors.username?.message}</p>
            </>
          ) : null}
          {errors.password?.message?.length !== undefined &&
          errorDisplayed === false ? (
            <>
              {(errorDisplayed = true)}
              <p className={styles.login_error}>{errors.password?.message}</p>
            </>
          ) : null}
          {errorText && errorDisplayed === false ? (
            <>
              {(errorDisplayed = true)}
              <p className={styles.login_error}>{errorText}</p>
            </>
          ) : null}
          {!errorText && errorDisplayed === false ? (
            <>
              <p className={styles.signup_form_text}>
                Enter username and password.
              </p>
            </>
          ) : null}
          <InputField
            className={styles.input_account_info_box}
            name="username"
            label=""
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{
              required: "Username is required.",
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Username and/or password are incorrect.",
              },
              validate: {
                notIncorrectSize: (fieldValue) => {
                  return (
                    (fieldValue.length < 31 && fieldValue.length > 1) ||
                    "Username and/or password are incorrect."
                  );
                },
              },
            }}
          />
          <InputField
            className={styles.input_account_info_box}
            name="password"
            label=""
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{
              required: "Password is required.",
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                message: "Username and/or password are incorrect.",
              },
              validate: {
                notIncorrectSize: (fieldValue) => {
                  return (
                    (fieldValue.length < 25 && fieldValue.length > 7) ||
                    "Username and/or password are incorrect."
                  );
                },
              },
            }}
          />
          <div className={styles.button_box}>
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={onBackButtonClicked}
            >
              BACK
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              SUBMIT
            </Button>
          </div>
          <div className={styles.account_recovery_links}>
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                onAccountRecoveryClicked();
              }}
            >
              Forgot Username?
            </Button>
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                onAccountRecoveryClicked();
              }}
            >
              Reset Password?
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;

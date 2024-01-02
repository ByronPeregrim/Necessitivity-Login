import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ConflictError } from "../../errors/http_errors";
import { User } from "../../models/users";
import * as UsersApi from "../../network/users_api";
import { EditUserInfoCredentials } from "../../network/users_api";
import styles from "../../styles/UserEditInfoForm.module.css";
import InputField from "../forms/InputField";

interface UserEditInfoFormModalProps {
  currentUser: User | null;
  onEditInfoSuccessful: () => void;
  onBackButtonClicked: () => void;
}

const UserEditInfoFormModal = ({
  currentUser,
  onEditInfoSuccessful,
  onBackButtonClicked,
}: UserEditInfoFormModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditUserInfoCredentials>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  async function onSubmit(updatedCredentials: EditUserInfoCredentials) {
    try {
      await UsersApi.editUserInfo(updatedCredentials);
      onEditInfoSuccessful();
    } catch (error) {
      if (error instanceof ConflictError) {
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
      <Modal.Body className={styles.modal_body}>

        <div className={styles.banner_box}>
          <h1 className={styles.banner_text}>Edit Account Info</h1>
        </div>

        <Form
          className={styles.user_edit_info_form}
          onSubmit={handleSubmit(onSubmit)}
        >

          {errors.username?.message?.toString().length !== undefined &&
          errorDisplayed === false ? (
            <>
              <p className={styles.error_message}>
                {errors.username?.message.toString()}
              </p>
              {(errorDisplayed = true)}
            </>
          ) : null}

          {errors.email?.message?.toString().length !== undefined &&
          errorDisplayed === false ? (
            <>
              <p className={styles.error_message}>
                {errors.email?.message.toString()}
              </p>
              {(errorDisplayed = true)}
            </>
          ) : null}

          {errors.first?.message?.toString().length !== undefined &&
          errorDisplayed === false ? (
            <>
              <p className={styles.error_message}>
                {errors.first?.message.toString()}
              </p>
              {(errorDisplayed = true)}
            </>
          ) : null}

          {errors.last?.message?.toString().length !== undefined &&
          errorDisplayed === false ? (
            <>
              <p className={styles.error_message}>
                {errors.last?.message.toString()}
              </p>
              {(errorDisplayed = true)}
            </>
          ) : null}

          {errors.weight?.message?.toString().length !== undefined &&
          errorDisplayed === false ? (
            <>
              <p className={styles.error_message}>
                {errors.weight?.message.toString()}
              </p>
              {(errorDisplayed = true)}
            </>
          ) : null}

          {errorText && errorDisplayed === false ? (
            <>
              {(errorDisplayed = true)}
              <p className={styles.error_message}>{errorText}</p>
            </>
          ) : null}

          {errorDisplayed === false ? (
            <>
              <p className={styles.signup_form_text}>
                Username and password are case sensitive.
              </p>
            </>
          ) : null}

          <InputField
            className={styles.inputField}
            name="first"
            label="First Name"
            defaultValue={currentUser?.first}
            type="text"
            placeholder={currentUser?.first}
            register={register}
            registerOptions={{
              required: "First name is required",
              pattern: {
                value: /^[a-zA-Z-]+$/,
                message:
                  "First name can only contain characters A-Z, a-z, and -",
              },
              validate: {
                notIncorrectSize: (fieldValue) => {
                  return (
                    (fieldValue.length < 31 && fieldValue.length > 1) ||
                    "First name must be between 2 and 30 characters"
                  );
                },
              },
            }}
          />

          <InputField
            className={styles.inputField}
            name="last"
            label="Last Name"
            defaultValue={currentUser?.last}
            type="text"
            placeholder={currentUser?.last}
            register={register}
            registerOptions={{
              required: "Last name is required",
              pattern: {
                value: /^[a-zA-Z-]+$/,
                message:
                  "Last name can only contain characters A-Z, a-z, and -",
              },
              validate: {
                notIncorrectSize: (fieldValue) => {
                  return (
                    (fieldValue.length < 31 && fieldValue.length > 1) ||
                    "Last name must be between 2 and 30 characters"
                  );
                },
              },
            }}
          />

          <InputField
            className={styles.inputField}
            name="username"
            label="Username"
            defaultValue={currentUser?.username}
            type="text"
            placeholder={currentUser?.username}
            register={register}
            registerOptions={{
              required: "Username is required",
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "Username can only contain letters and numbers",
              },
              validate: {
                notIncorrectSize: (fieldValue) => {
                  return (
                    (fieldValue.length < 31 && fieldValue.length > 1) ||
                    "Username must be between 2 and 30 characters"
                  );
                },
              },
            }}
          />

          <InputField
            className={styles.inputField}
            name="email"
            label="Email"
            defaultValue={currentUser?.email}
            type="email"
            placeholder={currentUser?.email}
            register={register}
            registerOptions={{
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notIncorrectSize: (fieldValue) => {
                  return (
                    (fieldValue.length < 41 && fieldValue.length >= 7) ||
                    "Email must be between 7 and 40 characters"
                  );
                },
              },
            }}
          />

          <div className={styles.weight_box}>
            <InputField
              className={[styles.inputField, styles.weight_input]}
              name="weight"
              label="Weight"
              defaultValue={currentUser?.weight}
              type="number"
              placeholder={currentUser?.weight}
              register={register}
              registerOptions={{
                required: "Weight is required",
                validate: {
                  notIncorrectSize: (fieldValue) => {
                    return (
                      (fieldValue < 501 && fieldValue > 49) ||
                      "Weight must be between 50 and 500 pounds"
                    );
                  },
                },
              }}
            />
          </div>

          <input
            type="hidden"
            {...register("oldUsername")}
            defaultValue={currentUser?.username}
          ></input>
          <input
            type="hidden"
            {...register("oldEmail")}
            defaultValue={currentUser?.email}
          ></input>

          <div className={styles.button_box}>
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={onBackButtonClicked}
            >
              Back
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Confirm
            </Button>
          </div>
          
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserEditInfoFormModal;

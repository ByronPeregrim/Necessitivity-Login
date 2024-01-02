import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NewWorkoutData } from "../../network/users_api";
import * as UsersApi from "../../network/users_api";
import InputField from "../forms/InputField";
import styles from "../../styles/EditWorkoutModal.module.css";
import { add, format } from "date-fns";

interface EditWorkoutProps {
  value: Date;
  day: number;
  userId?: string;
  currentCalories: number;
  onEditWorkoutSuccessful: () => void;
  onBackButtonClicked: () => void;
}

const EditWorkoutModal = ({
  value,
  day,
  userId,
  currentCalories,
  onEditWorkoutSuccessful,
  onBackButtonClicked,
}: EditWorkoutProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewWorkoutData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  async function onSubmit(data: NewWorkoutData) {
    try {
      await UsersApi.editWorkout(data);
      onEditWorkoutSuccessful();
    } catch (error) {
      console.error(error);
    }
  }

  const getHeaderDate = () => {
    const selectedDate = add(value, { days: day - 1 });
    const header = format(selectedDate, "LLLL do yyyy");
    return header;
  };

  const getSubmitDate = () => {
    const selectedDate = add(value, { days: day - 1 });
    const submitDate = format(selectedDate, "LLL d yy");
    return submitDate;
  };

  let errorDisplayed = false;

  return (
    <Form
      className={styles.edit_workout_form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Button
        className={styles.back_button}
        type="button"
        disabled={isSubmitting}
        onClick={onBackButtonClicked}
      >
        X
      </Button>
      <h1 className={styles.header_date}>Edit {getHeaderDate()}</h1>
      <p className={styles.current_calories}>
        Current Calories: {currentCalories}
      </p>
      {errors.calories?.message?.toString().length !== undefined &&
      errorDisplayed === false ? (
        <>
          <p className={styles.error_message}>
            {errors.calories?.message.toString()}
          </p>
          {(errorDisplayed = true)}
        </>
      ) : null}
      <input type="hidden" {...register("id")} defaultValue={userId} />
      <input
        type="hidden"
        {...register("date")}
        defaultValue={getSubmitDate()}
      />
      <div className={styles.calorie_box}>
        <InputField
          className={[styles.inputField, styles.weight_input]}
          name="calories"
          label="Edit Calories:"
          type="number"
          placeholder=""
          register={register}
          registerOptions={{
            required: "Calories are required",
            validate: {
              notIncorrectSize: (fieldValue) => {
                return (
                  (fieldValue < 2001 && fieldValue >= 0) ||
                  "Calories must be between 0 and 2000"
                );
              },
            },
          }}
        />
      </div>
      <div className={styles.button_box}>
        <Button
          type="submit"
          disabled={isSubmitting}
          className={styles.submit_button}
        >
          SUBMIT
        </Button>
      </div>
    </Form>
  );
};

export default EditWorkoutModal;

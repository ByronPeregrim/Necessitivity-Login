import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  startOfMonth,
  sub,
} from "date-fns";
import { useEffect, useState } from "react";
import { Workout } from "../../models/workouts";
import * as UsersApi from "../../network/users_api";
import styles from "../../styles/Calendar.module.css";
import Cell from "./Cell";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarProps {
  id?: string;
  value?: Date;
  onChange?: (value: Date) => void;
  onCellClicked?: (daysDate: number) => void;
  onDateSet?: () => void;
  setCalories?: (calories: number) => void;
}

const Calendar = ({
  id = "",
  value = new Date(),
  onChange,
  onCellClicked,
  onDateSet,
  setCalories,
}: CalendarProps) => {
  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDays = differenceInDays(endDate, startDate) + 1;
  const preceedingDays = startDate.getDay();
  const currentMonth = new Date();
  const array: { date: string; calories: number }[] = [];
  const [userWorkouts, setUserWorkouts] = useState(array);

  useEffect(() => {
    const newArray: { date: string; calories: number }[] = [];
    
    async function fetchUserWorkouts() {
      try {
        const workouts = await UsersApi.getUserWorkouts({ id });
        onFetchUserWorkoutsSuccessful(workouts);
      } catch (error) {
        console.error(error);
      }
    }
    
    const onFetchUserWorkoutsSuccessful = (workouts: Workout[]) => {
      workouts.forEach((workout) => {
        const date = workout.date;
        const calories = workout.calories;
        newArray.push({ date, calories });
      });
      setUserWorkouts(newArray);
    };
    
    fetchUserWorkouts();
  }, [id]);

  const prevMonth = () => onChange && onChange(sub(value, { months: 1 }));
  
  const nextMonth = () => {
    const nextMonth = add(value, { months: 1 });
    if (!isAfter(nextMonth, currentMonth)) { // Prevents user from going past current month.
      onChange && onChange(nextMonth);
    }
  };

  const handleClickCell = (firstDateOfMonth: Date, daysToAdd: number) => {
    const selectedDate = add(firstDateOfMonth, { days: daysToAdd});
    const today = new Date();
    if (isBefore(selectedDate, today)) { //Prevents interaction with future dates
      onCellClicked && onCellClicked(daysToAdd);
      setCalories && setCalories(getCaloriesForDate(firstDateOfMonth, daysToAdd));
      onDateSet && onDateSet();
    }
  };

  const getCaloriesForDate = (firstDateOfMonth: Date, daysToAdd: number) => {
    const selectedDate = add(firstDateOfMonth, { days: daysToAdd});
    const formattedDate = format(selectedDate, "LLL d yy");
    let calories = 0;
    userWorkouts.forEach((workout) => {
      if (workout.date === formattedDate) {
        calories = workout.calories;
      }
    });
    return calories;
  };

  return (
    <div className={styles.calendar_wrapper}>
      <div className={styles.grid}>
        <div></div>
        <div className={styles.arrows} onClick={prevMonth}>
          {"<"}
        </div>
        <div className={styles.month}>{format(value, "LLLL yyyy")}</div>
        <div className={styles.arrows} onClick={nextMonth}>
          {">"}
        </div>
        <div></div>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.days_of_week}>
            <Cell key={day} day_of_week={day} />
          </div>
        ))}
        {Array.from({ length: preceedingDays }).map((_, index) => (
          <div key={index}></div>
        ))}
        {Array.from({ length: numDays }).map((_, index) => {
          const date = index + 1;
          const day = add(value, { days: date - new Date().getDate() });
          if (format(day, "LLL dd yy") === format(new Date(), "LLL dd yy")) {
            return (
              <Cell
                onClick={() => handleClickCell(value, date - new Date().getDate())}
                key={date}
                day={date}
                today={true}
                calories={getCaloriesForDate(value, date - new Date().getDate())}
              />
            );
          } else {
            return (
              <Cell
                onClick={() => handleClickCell(value, date - new Date().getDate())}
                key={date}
                day={date}
                calories={getCaloriesForDate(value, date - new Date().getDate())}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Calendar;

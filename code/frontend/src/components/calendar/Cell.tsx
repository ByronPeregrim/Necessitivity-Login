import styles from "../../styles/Calendar.module.css";

interface CellProps {
  onClick?: () => void;
  day?: number;
  calories?: number;
  day_of_week?: string;
  today?: boolean;
}

const Cell = ({ onClick, day, calories, day_of_week, today }: CellProps) => {
  return (
    <div className={styles.cell} onClick={onClick}>
      {/* Displays different styles if date is current date */}
      {today ? (
        <div className={styles.today}>{day}</div>
      ) : (
        <div className={styles.day}>{day}</div>
      )}
      {/* Displays different styles if calories equal zero */}
      {calories === 0 ? (
        <div className={styles.zero_calories}>{calories}</div>
      ) : (
        <div className={styles.non_zero_calories}>{calories}</div>
      )}
      <div className={styles.day_of_week}>{day_of_week}</div>
    </div>
  );
};

export default Cell;

export class Workout {
    date: number;
    calories: number;

    constructor() {
        this.date = 1;
        this.calories = 2;
    }

    getDate() {
        return this.date
    }

    getCalories() {
        return this.calories;
    }

}
export default Workout;
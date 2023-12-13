import Workout from "../classes/Workout";

export interface User {
    username: string,
    first: string,
    last: string,
    email: string,
    weight: number,
    admin: boolean,
    workouts?: Array<Workout>,
}
import Workout from "../classes/Workout";

export interface User {
    _id: string, 
    username: string,
    password: string,
    first: string,
    last: string,
    email: string,
    feet: number,
    inches: number,
    weight: number,
    age: number,
    admin?: boolean,
    workouts?: Array<Workout>,
    createdAt : string,
}
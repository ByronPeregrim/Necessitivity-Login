import Workout from "../classes/Workout";
import { User } from "../models/users";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchUsers(): Promise<User[]> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response.json();
}

export interface UserInput {
    username: string,
    password: string,
    confirmPassword: string,
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

export async function createUser(user: UserInput): Promise<User> {
    const response = await fetchData("/api/users",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    return response.json();
}

export async function deleteUser(userId: string) {
    await fetchData("/api/users/" + userId, { method: "DELETE"});
}
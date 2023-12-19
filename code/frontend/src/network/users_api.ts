import Workout from "../classes/Workout";
import { UnauthorizedError, ConflictError } from "../errors/http_errors";
import { User } from "../models/users";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if (response.status === 401) {
            throw new UnauthorizedError(errorMessage);
        } else if (response.status === 409) {
            throw new ConflictError(errorMessage);
        } else {
            throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
        }
    }
}


export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    password: string,
    first: string,
    last: string,
    email: string,
    weight: number,
    createdAt : string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
    return response.json();
}

export interface LoginCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface EmailCredentials {
    email: string,
}

export async function verifyEmail(credentials: EmailCredentials): Promise<User> {
    const response = await fetchData("/api/users/account-recovery",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface AdminSearchInput {
    username: string,
    email: string,
}

export async function getUserForAdmin(credentials: AdminSearchInput): Promise<User> {
    const response = await fetchData("api/users/admin-search",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function deleteUser(user: User | null): Promise<User> {
    const response = await fetchData("/api/users/delete-user",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    return response.json();
}

export interface EditUserInfoCredentials {
    username: string,
    email: string,
    first: string,
    last: string,
    weight: number,
    admin?: boolean,
    oldUsername: string,
    oldEmail: string,
}

export async function editUserInfo(credentials : EditUserInfoCredentials): Promise<User> {
    const response = await fetchData("/api/users/edit-user",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface UpdatedWorkoutInfo {
    username: string,
    workouts: Workout[],
}

export async function updateUserWorkout(updatedWorkout: UpdatedWorkoutInfo): Promise<User> {
    const response = await fetchData("/api/users/update-workout",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWorkout),
    });
    return response.json();
}

export async function logout() {
    await fetchData("/api/users/logout", { method: "POST"});
}
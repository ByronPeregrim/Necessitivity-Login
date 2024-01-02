import { UnauthorizedError, ConflictError } from "../errors/http_errors";
import { User } from "../models/users";
import { Workout } from "../models/workouts";

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
      throw Error(
        "Request failed with status: " +
          response.status +
          " message: " +
          errorMessage,
      );
    }
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("/api/users", { method: "GET" });
  return response.json();
}

export interface SignUpCredentials {
  username: string;
  password: string;
  first: string;
  last: string;
  email: string;
  weight: number;
  createdAt: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface EmailCredentials {
  email: string;
}

export async function verifyEmail(
  credentials: EmailCredentials,
): Promise<User> {
  const response = await fetchData("/api/users/account-recovery", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface AdminSearchInput {
  username: string;
  email: string;
}

export async function getUserForAdmin(
  credentials: AdminSearchInput,
): Promise<User> {
  const response = await fetchData("api/users/admin-search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function deleteUser(user: User | null): Promise<User> {
  const response = await fetchData("/api/users/delete-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

export interface EditUserInfoCredentials {
  username: string;
  email: string;
  first: string;
  last: string;
  weight: number;
  admin?: boolean;
  oldUsername: string;
  oldEmail: string;
}

export async function editUserInfo(
  credentials: EditUserInfoCredentials,
): Promise<User> {
  const response = await fetchData("/api/users/edit-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export interface NewWorkoutInfo {
  user: string;
  calories: number;
  date: string;
}

export async function addWorkout(
  updatedWorkout: NewWorkoutInfo,
): Promise<Workout> {
  const response = await fetchData("/api/users/add-workout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedWorkout),
  });
  return response.json();
}

export interface TodaysData {
  id: string;
  dates: string[];
}

export async function getCaloriesByDay(
  selectors: TodaysData,
): Promise<Workout[]> {
  const response = await fetchData("/api/users/get-calories-by-day", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectors),
  });
  return response.json();
}

export interface UserData {
  id: string;
}

export async function getUserWorkouts(selectors: UserData): Promise<Workout[]> {
  const response = await fetchData("/api/users/get-user-workouts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(selectors),
  });
  return response.json();
}

export async function logout() {
  await fetchData("/api/users/logout", { method: "POST" });
}

export interface NewWorkoutData {
  calories: number;
  date: string;
  id: string;
}

export async function editWorkout(data: NewWorkoutData): Promise<Workout> {
  const response = await fetchData("/api/users/edit-workout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

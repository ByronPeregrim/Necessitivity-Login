import { RequestHandler } from "express";
import UserModel from "../models/user"
import createHttpError from "http-errors";
import mongoose  from "mongoose";
import Workout from "../classes/Workout";

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserModel.find().exec();
        res.status(200).json(users);
    } catch(error) {
        next(error);
    }
}

export const getUser: RequestHandler = async(req, res, next) => {
    const userId = req.params.userId;
    
    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid User Id");
        }

        const user = await UserModel.findById(userId).exec();

        if (!user) {
            throw createHttpError(404, "User not found");
        }

        res.status(200).json(user);
    } catch(error) {
        next(error);
    }
};

interface CreateUserBody {
    username?: string,
    password?: string,
    first?: string,
    last?: string,
    email?: string,
    feet?: number,
    inches?: number,
    weight?: number,
    age?: number,
    admin?: boolean,
    workouts?: Array<Workout>,
}

export const createUser: RequestHandler<unknown, unknown, CreateUserBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;
    const feet = req.body.feet;
    const inches = req.body.inches;
    const weight = req.body.weight;
    const age = req.body.age;
    const admin = req.body.admin;
    const workouts = req.body.workouts;

    try {
        if (!username || !password || !first || !last || !email || !feet ||
            !inches || !weight || !age) {
            throw createHttpError(400, "User registration information incomplete.");
        }

        const newUser = await UserModel.create({
            username: username,
            password: password,
            first: first,
            last: last,
            email: email,
            feet: feet,
            inches: inches,
            weight: weight,
            age: age,
            admin: admin,
            workouts: workouts,
        });

        res.status(201).json(newUser);
    } catch(error) {
        next(error);
    }
};

interface UpdateUserParams {
    userId: string,
}

interface UpdateUserBody {
    username?: string,
    password?: string,
    first?: string,
    last?: string,
    email?: string,
    feet?: number,
    inches?: number,
    weight?: number,
    age?: number,
    admin?: boolean,
    workouts?: Array<Workout>,
}

export const updateUser: RequestHandler<UpdateUserParams, unknown, UpdateUserBody, unknown> =async (req,res,next) => {
    const userId = req.params.userId;
    const newUsername = req.body.username;
    const newPassword = req.body.password;
    const newFirst = req.body.first;
    const newLast = req.body.last;
    const newEmail = req.body.email;
    const newFeet = req.body.feet;
    const newInches = req.body.inches;
    const newWeight = req.body.weight;
    const newAge = req.body.age;
    const newAdmin = req.body.admin;
    const newWorkouts = req.body.workouts;
    
    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid User Id");
        }
        if (!newUsername || !newPassword || !newFirst || !newLast ||
            !newEmail || !newFeet || !newInches || !newWeight || !newAge || !newAdmin
            || !newWorkouts) {
            throw createHttpError(400, "User registration information incomplete.");
        }

        const user = await UserModel.findById(userId).exec();

        if (!user) {
            throw createHttpError(404, "User not found");
        }

        user.username = newUsername;
        user.password = newPassword;
        user.first = newFirst;
        user.last = newLast;
        user.email = newEmail;
        user.feet = newFeet;
        user.inches = newInches;
        user.weight = newWeight;
        user.age = newAge;
        user.admin = newAdmin;
        user.workouts = newWorkouts;

        const updatedUser = await user.save();

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
    const userId = req.params.userId;
    
    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, "Invalid User Id");
        }

        const user = await UserModel.findById(userId).exec();

        if (!user) {
            throw createHttpError(404, "User not found");
        }

        await user.deleteOne();

        res.sendStatus(204);

    } catch(error) {
        next(error);
    }
};
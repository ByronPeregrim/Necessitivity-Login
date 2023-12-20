import { RequestHandler } from "express";
import createHttpError from "http-errors";
import WorkoutModel from "../models/workout";

interface CreateWorkoutBody {
    user: string,
    calories: number,
    date: string,
}

export const createWorkout: RequestHandler<unknown, unknown, CreateWorkoutBody, unknown> = async (req, res, next) => {
    const user = req.body.user;
    const calories = req.body.calories;
    const date = req.body.date;

    try {
        if (!calories || !date || !user) {
                throw createHttpError(400, "Parameters missing");
            }
            // If entry for todays date already exists, add calories to entry. Otherwise, create new entry.
            const todaysWorkout = await WorkoutModel.findOne({user : user, date : date}).exec();
            if (!todaysWorkout) {
                const newWorkout = await WorkoutModel.create({
                    calories: calories,
                    date: date,
                    user: user,
                });
                res.status(201).json(newWorkout);
            } else {
                const todaysCalories = todaysWorkout.calories;
                const updatedWorkout = await WorkoutModel.findOneAndUpdate({user : user, date : date}, {
                    calories: (calories + todaysCalories),
                    date: date,
                    user: user,
                })
                res.status(201).json(updatedWorkout);
            }
            
    } catch (error) {
        next(error);
    }
};

interface TodaysData {
    id?: string,
    dates?: string[],
}

export const getCaloriesByDay: RequestHandler<unknown, unknown, TodaysData, unknown> = async(req, res, next) => {
    const id = req.body.id;
    const dates = req.body.dates;

    try {
        if (!id || !dates) {
            throw createHttpError(400, "Parameters missing");
        }

        // How to search for every possible date in dates array with one query

        const workouts = await WorkoutModel.find({user: id, date: { $in: dates}});
        if (!workouts) {
            throw createHttpError(404, "No workouts found");
        }

        res.status(201).json(workouts);
    } catch (error) {
        next(error);
    }
};
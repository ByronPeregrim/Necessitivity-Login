import { RequestHandler } from "express";
import createHttpError from "http-errors";
import WorkoutModel from "../models/workout";
import { ObjectId } from "mongodb";

interface CreateWorkoutBody {
  user: string;
  calories: number;
  date: string;
}

export const createWorkout: RequestHandler<
  unknown,
  unknown,
  CreateWorkoutBody,
  unknown
> = async (req, res, next) => {
  const user = req.body.user;
  const calories = req.body.calories;
  const date = req.body.date;

  try {
    if (!calories || !date || !user) {
      throw createHttpError(400, "Parameters missing");
    }
    // If entry for todays date already exists, add calories to entry. Otherwise, create new entry.
    const todaysWorkout = await WorkoutModel.findOne({
      user: user,
      date: date,
    }).exec();
    if (!todaysWorkout) {
      const newWorkout = await WorkoutModel.create({
        calories: calories,
        date: date,
        user: user,
      });
      res.status(201).json(newWorkout);
    } else {
      const todaysCalories = todaysWorkout.calories;
      const updatedWorkout = await WorkoutModel.findOneAndUpdate(
        { user: user, date: date },
        {
          calories: calories + todaysCalories,
          date: date,
          user: user,
        }
      );
      res.status(201).json(updatedWorkout);
    }
  } catch (error) {
    next(error);
  }
};

interface TodaysData {
  id?: string;
  dates?: string[];
}

export const getCaloriesByDay: RequestHandler<
  unknown,
  unknown,
  TodaysData,
  unknown
> = async (req, res, next) => {
  const id = req.body.id;
  const dates = req.body.dates;

  try {
    if (!id || !dates) {
      throw createHttpError(400, "Parameters missing");
    }

    const workouts = await WorkoutModel.find({
      user: id,
      date: { $in: dates },
    });
    if (!workouts) {
      throw createHttpError(404, "No workouts found");
    }

    res.status(201).json(workouts);
  } catch (error) {
    next(error);
  }
};

interface UserData {
  id?: string;
}

export const getUserWorkouts: RequestHandler<
  unknown,
  unknown,
  UserData,
  unknown
> = async (req, res, next) => {
  const id = req.body.id;

  try {
    if (!id) {
      throw createHttpError(400, "Parameters missing");
    }
    const objectId = ObjectId.createFromHexString(id);
    const workouts = await WorkoutModel.find({ user: objectId });
    if (!workouts) {
      throw createHttpError(404, "No workouts found");
    }

    res.status(201).json(workouts);
  } catch (error) {
    next(error);
  }
};

interface EditWorkoutData {
  id?: string;
  date?: string;
  calories?: number;
}

export const editWorkout: RequestHandler<
  unknown,
  unknown,
  EditWorkoutData,
  unknown
> = async (req, res, next) => {
  const id = req.body.id;
  const date = req.body.date;
  const calories = req.body.calories;

  try {
    if (!id || !date || !calories) {
      throw createHttpError(400, "Parameters missing");
    }
    const objectId = ObjectId.createFromHexString(id);
    if (calories <= 0) {
      const deletedWorkout = WorkoutModel.deleteOne({
        user: objectId,
        date: date,
      }).exec();
      res.status(201).json(deletedWorkout);
    } else {
      const workout = await WorkoutModel.findOne({
        user: objectId,
        date: date,
      });
      if (!workout) {
        const newWorkout = await WorkoutModel.create({
          calories: calories,
          date: date,
          user: objectId,
        });
        if (!newWorkout) {
          throw createHttpError(404, "Unable to edit workout.");
        }
        res.status(201).json(newWorkout);
      } else {
        const updatedWorkout = await WorkoutModel.findOneAndUpdate(
          { user: objectId, date: date },
          { calories: calories }
        );
        res.status(201).json(updatedWorkout);
      }
    }
  } catch (error) {
    next(error);
  }
};

import "dotenv/config";
import { RequestHandler } from "express";
import UserModel from "../models/user"
import createHttpError from "http-errors";
import Workout from "../classes/Workout";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import env from "../util/validateEnv";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.session.userId).select(["+first", "+last", "+email", "+weight", "+admin", "+workouts"]);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

interface SignUpBody {
    username?: string,
    password?: string,
    first?: string,
    last?: string,
    email?: string,
    weight?: number,
    admin?: boolean,
    workouts?: Array<Workout>,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const passwordRaw = req.body.password;
    const first = req.body.first;
    const last = req.body.last;
    const email = req.body.email;
    const weight = req.body.weight;

    try {
        if (!username || !passwordRaw || !first || !last || !email || !weight) {
                throw createHttpError(400, "Parameters missing");
            }

            const existingUsername = await UserModel.findOne({ username: username}).exec();

            if (existingUsername) {
                throw createHttpError(409, "Username already taken. Please choose a different one.");
            }

            const existingEmail = await UserModel.findOne({email: email}).exec();
            if (existingEmail) {
                throw createHttpError(409, "A user with this email address already exists.");
            }

            const passwordHashed = await bcrypt.hash(passwordRaw, 10);

            const newUser = await UserModel.create({
                username: username,
                password: passwordHashed,
                first: first,
                last: last,
                email: email,
                weight: weight,
            });

            req.session.userId = newUser._id;
            res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await UserModel.findOne({username: username}).select(["+password", "+email"]).exec();

        if (!user) {
            throw createHttpError(401, "Username and/or password are incorrect.");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw createHttpError(401, "Username and/or password are incorrect.");
        }

        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

interface RecoveryBody {
    email?: string,
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.RECOVERY_EMAIL,
      pass: env.RECOVERY_EMAIL_PASS,
    }
  });

export const verifyEmail: RequestHandler<unknown, unknown, RecoveryBody, unknown> =async (req, res, next) => {
    const email = req.body.email;
    try {
        if (!email) {
            throw createHttpError(400, "Parameters missing");
        }

        const user = await UserModel.findOne({email: email}).select(["+username", "+password", "+email"]).exec();

        if (!user) {
            throw createHttpError(401, "Invalid email");
        }

        const mailOptions = {
            from: 'FitnessTracker 5000',
            to: user.email,
            subject: 'FitnessTracker 5000 - Account Recovery',
            text: 'Username: ' + user.username +
                '\nPassword: ' + user.password
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                throw createHttpError(502, "Failed to send recovery email.");
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
    
};

export const logout: RequestHandler = (req,res,next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    })
};
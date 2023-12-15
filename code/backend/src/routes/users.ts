import express from "express";
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser);

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

router.post("/account-recovery", UserController.verifyEmail);

router.post("/admin-search", UserController.adminSearch);

router.post("/delete-user", UserController.deleteUser);

router.post("/edit-user", UserController.editUser);

export default router;
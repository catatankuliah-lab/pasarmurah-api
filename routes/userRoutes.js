import express from "express";
import * as userController from "../controller/userController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/user",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  userController.getAllUsers
);

router.get(
  "/user/:id_user",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  userController.getUserById
);

router.post(
  "/user",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  userController.createUser
);

router.get("/dev/user", userController.getAllUsers);
router.get("/dev/user/:id_user", userController.getUserById);
router.post("/dev/user", userController.createUser);

export default router;

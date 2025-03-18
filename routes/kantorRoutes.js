import express from "express";
import * as kantorController from "../controllers/kantorController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/kantor",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  kantorController.getAllKantor
);


router.get("/dev/kantor", kantorController.getAllKantor);

export default router;

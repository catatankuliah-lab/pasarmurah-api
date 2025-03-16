import express from "express";
import * as itemLoController from "../controllers/itemLoController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get(
  "/rekapall",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  itemLoController.getRekapAll
);

// router.get(
//   "/lo/rekapkantor",
//   authMiddleware.authenticate,
//   authMiddleware.authorizeRole([1, 2, 3, 4]),
//   itemLoController.getRekapKantor
// );

export default router;

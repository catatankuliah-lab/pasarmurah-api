// routes/roleRoutes.js
import express from "express";
import * as roleController from "../controllers/roleController.js";

const router = express.Router();

// Route untuk mendapatkan semua role
router.get("/role", roleController.getAllRoles);

export default router;

import express from "express";
import * as kabupatenKotaController from "../controller/kabupatenkotaController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/kabupaten-kota",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  kabupatenKotaController.getAllKabupatenKota
);

router.get(
  "/kabupaten-kota/:id_kabupaten_kota",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  kabupatenKotaController.getKabupatenKotaById
);

router.get("/dev/kabupaten-kota", kabupatenKotaController.getAllKabupatenKota);
router.get("/dev/kabupaten-kota/:id_kabupaten_kota", kabupatenKotaController.getKabupatenKotaById);

export default router;

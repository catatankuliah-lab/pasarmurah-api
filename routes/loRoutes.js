import express from "express";
import * as loController from "../controllers/loController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
  "/lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.getAllLO
);

router.get(
  "/lo/jumlahlokantor/:id_kantor",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.getJumlahLOKantor
);

router.get(
  "/lo/filter",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]), // Sesuaikan peran yang diizinkan
  loController.getFilteredLO
);

router.get(
  "/lo/:id_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.getLOById
);

router.get(
  "/lo/po/:id_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.getLOByIdPO
);

router.get(
  "/lo/kantor/:id_kantor",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.getLOByIdKantor
);

router.post(
  "/lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.addLO
);

router.put(
  "/lo/upload/:id_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  loController.uploadLO
);

router.put(
  "/lo/:id_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]), // Sesuaikan peran yang diizinkan untuk memperbarui data
  loController.updateLO
);

router.delete(
  "/lo/:id_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]), // Sesuaikan peran yang diizinkan untuk menghapus data
  loController.deleteLO
);

// Routes untuk pengembangan (tanpa otentikasi dan otorisasi)
router.get("/dev/lo", loController.getAllLO);
router.get("/dev/lo/:id_lo", loController.getLOById);
router.get("/dev/lo/po/:id_po", loController.getLOByIdPO);
router.get("/dev/lo/kantor/:id_kantor", loController.getLOByIdKantor);
router.post("/dev/lo", loController.addLO);
router.put("/dev/lo/:id_lo", loController.updateLO);
router.delete("/dev/lo/:id_lo", loController.deleteLO);

export default router;

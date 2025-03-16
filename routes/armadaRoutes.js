import express from "express";
import * as armadaController from "../controller/armadaController.js"; // Make sure the controller file is created
import * as authMiddleware from "../middlewares/authMiddleware.js"; // Make sure the middleware is available

const router = express.Router();

// Routes for Armada with authentication and authorization
router.get(
  "/armada",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 8, 9, 10, 12, 13]), // Adjust roles that are allowed
  armadaController.getAllArmada
);
router.get(
  "/armadas",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 12, 13]), // Adjust roles that are allowed
  armadaController.getAllArmadas
);

router.get(
  "/armada/availability",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 12]),
  armadaController.getArmadaAvailability
);

router.get(
  "/armada/:id_armada",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 8, 9, 10, 12]),
  armadaController.getArmadaById
);

router.get(
  "/armada/jenis/:id_jenis_kendaraan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 12, 13]),
  armadaController.getArmadaByJenisKendaraan
);

router.get(
  "/armada/nopol/:nopol_armada",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 12, 13]),
  armadaController.getArmadaByNopol
);

router.post(
  "/armada",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 12]), // Adjust the roles that are allowed to add data
  armadaController.addArmada
);

router.put(
  "/armada/:id_armada",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 12]), // Adjust roles that are allowed to update data
  armadaController.updateArmada
);

router.delete(
  "/armada/:id_armada",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 12]), // Adjust roles that are allowed to delete data
  armadaController.deleteArmada
);

router.get(
  "/armada/availability",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 12]),
  armadaController.getArmadaRiwayatBulanan
);

// Routes for development (without authentication and authorization)
router.get("/dev/armada", armadaController.getAllArmada);
router.get("/dev/armadas", armadaController.getAllArmadas);
router.get("/dev/armada/:id_armada", armadaController.getArmadaById);
router.get("/dev/armada/jenis/:id_jenis_kendaraan", armadaController.getArmadaByJenisKendaraan);
router.get("/dev/armada/nopol/:nopol_armada", armadaController.getArmadaByNopol);
router.post("/dev/armada", armadaController.addArmada);
router.put("/dev/armada/:id_armada", armadaController.updateArmada);
router.delete("/dev/armada/:id_armada", armadaController.deleteArmada);
router.get("/armada/availability", armadaController.getArmadaAvailability);

export default router;

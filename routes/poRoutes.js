import express from "express";
import * as poController from "../controller/poController.js"; // Ensure the controller file is created
import * as authMiddleware from "../middlewares/authMiddleware.js"; // Ensure the middleware is available

const router = express.Router();

router.get(
  "/po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 13]),
  poController.getAllPO
);

router.get(
  "/po/jumlahpobulanan/:bulan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 13]),
  poController.getJumlahPOBulanan
);

router.get(
  "/po/:id_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 13]),
  poController.getPOById
);

router.get(
  "/po/customer/:id_customer",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 13]),
  poController.getPOByCustomerId
);

router.get(
  "/po/armada/:id_armada",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 13]),
  poController.getPOByArmadaId
);

router.get(
  "/po/driver/:id_driver",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10, 13]),
  poController.getPOByDriverId
);

router.post(
  "/po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10]),
  poController.addPO
);

router.put(
  "/po/status/:id_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10]),
  poController.updateStatusPO
);

router.put(
  "/po/:id_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10]),
  poController.updatePO
);

router.delete(
  "/po/:id_po",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 9, 10]),
  poController.deletePO
);

// Routes for development (without authentication and authorization)
router.get("/dev/po", poController.getAllPO);
router.get("/dev/po/:id_po", poController.getPOById);
router.get("/dev/po/customer/:id_customer", poController.getPOByCustomerId);
router.get("/dev/po/armada/:id_armada", poController.getPOByArmadaId);
router.get("/dev/po/driver/:id_driver", poController.getPOByDriverId);
router.post("/dev/po", poController.addPO);
router.put("/dev/po/:id_po", poController.updatePO);
router.delete("/dev/po/:id_po", poController.deletePO);

export default router;

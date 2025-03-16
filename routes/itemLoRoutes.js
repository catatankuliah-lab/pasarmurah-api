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

router.post(
  "/muatan",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]), // Adjust roles that are allowed to add data
  itemLoController.addMuatan
);

router.get(
  "/muatan/lo/:id_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]),
  itemLoController.getMuatanByLO
);
router.delete(
  "/muatan/:id_item_lo",
  authMiddleware.authenticate,
  authMiddleware.authorizeRole([1, 2, 3, 4]), // Adjust roles that are allowed to delete data
  itemLoController.deleteMuatan
);
// router.get(
//   "/lo/rekapkantor",
//   authMiddleware.authenticate,
//   authMiddleware.authorizeRole([1, 2, 3, 4]),
//   itemLoController.getRekapKantor
// );

export default router;

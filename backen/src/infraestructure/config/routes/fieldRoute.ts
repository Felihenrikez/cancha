import express from "express";
import { FieldController } from "../../adapters/controllers/fieldController";

const router = express.Router();

router.post("/fields", FieldController.create);
router.get("/fields/:id", FieldController.getById);
router.get("/fields/club/:clubId", FieldController.getByClubId);
router.put("/fields/:id", FieldController.update);
router.delete("/fields/:id", FieldController.delete);

export default router;
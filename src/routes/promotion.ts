import { Router } from "express";
import * as promotionController from "../controllers/promotionController";
import { upload } from "../config/multer";

const router = Router();

router.get("/", promotionController.getAllPromotions);
router.get("/:id", promotionController.getPromotionById);
router.post("/", upload.single("image"), promotionController.createPromotion);
router.put("/:id", upload.single("image"), promotionController.updatePromotion);
router.delete("/:id", promotionController.deletePromotion);

export default router;
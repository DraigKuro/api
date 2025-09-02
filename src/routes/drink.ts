import { Router } from "express";
import * as drinkController from "../controllers/drinkController";
import { upload } from "../config/multer";

const router = Router();

router.get("/", drinkController.getAllDrinks);
router.get("/:id", drinkController.getDrinkById);
router.post("/", upload.single("image"), drinkController.createDrink);
router.put("/:id", upload.single("image"), drinkController.updateDrink);
router.delete("/:id", drinkController.deleteDrink);

export default router;

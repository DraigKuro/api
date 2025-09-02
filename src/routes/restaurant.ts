import { Router } from "express";
import * as restaurantController from "../controllers/restaurantController";
import { upload } from "../config/multer";

const router = Router();

router.get("/", restaurantController.getRestaurant);
router.put("/basic", restaurantController.updateBasicInfo);
router.put("/contact", restaurantController.updateContactInfo);
router.put("/address", restaurantController.updateAddressInfo);
router.put("/logo", upload.single("logo"), restaurantController.updateLogo);
router.delete("/logo/:id", restaurantController.deleteLogo);

export default router;

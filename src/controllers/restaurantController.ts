import { Request, Response } from "express";
import * as restaurantService from "../services/restaurantService";
import { asyncHandler } from "../utils/asyncHandler";
import { ControllerError } from "../utils/errors";

export const getRestaurant = asyncHandler(async (_req: Request, res: Response) => {
    const restaurant = await restaurantService.getRestaurant();
    res.json(restaurant);
});

export const updateBasicInfo = asyncHandler(async (req: Request, res: Response) => {
    const updated = await restaurantService.updateBasicInfo(req.body);
    res.json(updated);
});

export const updateContactInfo = asyncHandler(async (req: Request, res: Response) => {
    const updated = await restaurantService.updateContactInfo(req.body);
    res.json(updated);
});

export const updateAddressInfo = asyncHandler(async (req: Request, res: Response) => {
    const updated = await restaurantService.updateAddressInfo(req.body);
    res.json(updated);
});

export const updateLogo = asyncHandler(async (req: Request, res: Response) => {
    if (!req.file) {
        throw ControllerError(400, "No se subió ningún archivo");
    }

    const updated = await restaurantService.updateLogo({}, req.file);
    res.json(updated);
});

export const deleteLogo = asyncHandler(async (req: Request, res: Response) => {
    const restaurantId = req.params.id;
    const updatedRestaurant = await restaurantService.removeLogo(restaurantId);

    res.json({
        message: "Logo eliminado correctamente",
        restaurant: updatedRestaurant,
    });
});

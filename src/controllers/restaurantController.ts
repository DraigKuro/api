import { Request, Response } from "express";
import * as restaurantService from "../services/restaurantService";

export const getRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await restaurantService.getRestaurant();
        res.json(restaurant);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const updateBasicInfo = async (req: Request, res: Response) => {
    try {
        const updated = await restaurantService.updateBasicInfo(req.body);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const updateContactInfo = async (req: Request, res: Response) => {
    try {
        const updated = await restaurantService.updateContactInfo(req.body);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const updateAddressInfo = async (req: Request, res: Response) => {
    try {
        const updated = await restaurantService.updateAddressInfo(req.body);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const updateLogo = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se subió ningún archivo" });
        }

        const logoUrl = `/uploads/${req.file.filename}`;
        const updated = await restaurantService.updateLogo({ logoUrl });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const deleteLogo = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const updatedRestaurant = await restaurantService.removeLogo(restaurantId);

    res.json({
      message: "Logo eliminado correctamente",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    console.error("Error al eliminar logo:", error);
    res.status(500).json({ error: "Error al eliminar logo" });
  }
};

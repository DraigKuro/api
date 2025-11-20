import Restaurant, { IRestaurant } from "../models/restaurant";
import { deleteFile, STORAGE_TYPE } from "../config/multer";
import { ServiceError } from "../utils/errors";

export const getRestaurant = async (): Promise<IRestaurant | null> => {
    try {
        return await Restaurant.findOne();
    } catch {
        throw ServiceError("Error al obtener la información del restaurante");
    }
};

export const updateBasicInfo = async (data: {
    name?: string | null;
    cif?: string | null;
    openingHours?: { open?: string | null; close?: string | null };
}): Promise<IRestaurant> => {
    try {
        return await Restaurant.findOneAndUpdate(
            {},
            {
                name: data.name || "",
                cif: data.cif || "",
                openingHours: {
                    open: data.openingHours?.open || "",
                    close: data.openingHours?.close || "",
                },
            },
            { new: true, upsert: true }
        );
    } catch {
        throw ServiceError("Error al actualizar la información básica del restaurante");
    }
};

export const updateContactInfo = async (data: {
    email?: string;
    phone?: string;
    socialLinks?: {
        facebook?: { enabled: boolean; url?: string | null };
        instagram?: { enabled: boolean; url?: string | null };
        twitter?: { enabled: boolean; url?: string | null };
        tiktok?: { enabled: boolean; url?: string | null };
    };
}): Promise<IRestaurant> => {
    try {
        const socialLinks = {
            facebook: {
                enabled: data.socialLinks?.facebook?.enabled ?? false,
                url: data.socialLinks?.facebook?.url || "",
            },
            instagram: {
                enabled: data.socialLinks?.instagram?.enabled ?? false,
                url: data.socialLinks?.instagram?.url || "",
            },
            twitter: {
                enabled: data.socialLinks?.twitter?.enabled ?? false,
                url: data.socialLinks?.twitter?.url || "",
            },
            tiktok: {
                enabled: data.socialLinks?.tiktok?.enabled ?? false,
                url: data.socialLinks?.tiktok?.url || "",
            },
        };

        return await Restaurant.findOneAndUpdate(
            {},
            {
                email: data.email || "",
                phone: data.phone || "",
                socialLinks,
            },
            { new: true, upsert: true }
        );
    } catch {
        throw ServiceError("Error al actualizar la información de contacto del restaurante");
    }
};

export const updateAddressInfo = async (data: {
    address?: string | null;
    reference?: string | null;
    mapUrl?: string | null;
}): Promise<IRestaurant> => {
    try {
        return await Restaurant.findOneAndUpdate(
            {},
            {
                address: data.address || "",
                reference: data.reference || "",
                mapUrl: data.mapUrl || "",
            },
            { new: true, upsert: true }
        );
    } catch {
        throw ServiceError("Error al actualizar la dirección del restaurante");
    }
};

export const updateLogo = async (data: { logoUrl?: string }, file?: Express.Multer.File): Promise<IRestaurant> => {
    try {
        const updateData = { ...data };

        if (file) {
            updateData.logoUrl = STORAGE_TYPE === 'local'
                ? `/uploads/${file.filename}`
                : (file as any).location;
        }

        return await Restaurant.findOneAndUpdate({}, updateData, { new: true, upsert: true });
    } catch {
        throw ServiceError("Error al actualizar el logo del restaurante");
    }
};

export const removeLogo = async (restaurantId: any) => {
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) throw ServiceError("Restaurante no encontrado");

        if (restaurant.logoUrl) {
            deleteFile(restaurant.logoUrl);
            restaurant.logoUrl = "";
            await restaurant.save();
        }

        return restaurant;
    } catch (err: any) {
        if (err.message === "Restaurante no encontrado") throw err;
        throw ServiceError("Error al eliminar el logo del restaurante");
    }
};

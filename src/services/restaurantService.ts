import Restaurant, { IRestaurant } from "../models/restaurant";
import { deleteFile } from "../config/multer";

export const getRestaurant = async (): Promise<IRestaurant | null> => {
    return await Restaurant.findOne();
};

export const updateBasicInfo = async (data: {
    name?: string | null;
    cif?: string | null;
    openingHours?: { open?: string | null; close?: string | null };
}): Promise<IRestaurant> => {
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
};

export const updateAddressInfo = async (data: {
    address?: string | null;
    reference?: string | null;
    mapUrl?: string | null;
}): Promise<IRestaurant> => {
    return await Restaurant.findOneAndUpdate(
        {},
        {
            address: data.address || "",
            reference: data.reference || "",
            mapUrl: data.mapUrl || "",
        },
        { new: true, upsert: true }
    );
};

export const updateLogo = async (data: { logoUrl?: string }): Promise<IRestaurant> => {
    return await Restaurant.findOneAndUpdate({}, data, { new: true, upsert: true });
};

export const removeLogo = async (restaurantId: any) => {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        throw new Error("Restaurante no encontrado");
    }

    if (restaurant.logoUrl) {
        deleteFile(restaurant.logoUrl);
        restaurant.logoUrl = "";
        await restaurant.save();
    }

    return restaurant;
};

import mongoose, { Schema, Document } from "mongoose";

export interface IRestaurant extends Document {
    name: string;
    cif: string;
    openingHours: { open: string; close: string };

    email?: string;
    phone?: string;
    socialLinks?: {
        facebook?: { enabled: boolean; url?: string };
        instagram?: { enabled: boolean; url?: string };
        twitter?: { enabled: boolean; url?: string };
        tiktok?: { enabled: boolean; url?: string };
    };

    address?: string;
    reference?: string;
    mapUrl?: string;

    logoUrl?: string;
}

const SocialLinkSchema: Schema = new Schema(
    {
        enabled: { type: Boolean, default: false },
        url: { type: String },
    },
    { _id: false }
);

const RestaurantSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        cif: { type: String, required: true },
        openingHours: {
            open: { type: String, required: true },
            close: { type: String, required: true },
        },
        email: { type: String },
        phone: { type: String },
        socialLinks: {
            facebook: { type: SocialLinkSchema, default: {} },
            instagram: { type: SocialLinkSchema, default: {} },
            twitter: { type: SocialLinkSchema, default: {} },
            tiktok: { type: SocialLinkSchema, default: {} },
        },
        address: { type: String },
        reference: { type: String },
        mapUrl: { type: String },
        logoUrl: { type: String },
    },
    { versionKey: false }
);

export default mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

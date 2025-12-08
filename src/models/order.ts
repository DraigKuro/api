import { Schema, model, Document } from "mongoose";

export type OrderStatus = "pending" | "confirmed" | "preparing" | "ready" | "served";

export interface OrderDocument extends Document {
    tableId: string;
    items: Array<{
        type: "dish" | "drink" | "menu" | "promotion";
        itemId: string;
        quantity: number;
        selectedOptions?: {
            entranteId?: string;
            principalId?: string;
            postreId?: string;
            bebidaId?: string;
        };
    }>;
    status: OrderStatus;
    total: number;
    paidAt?: Date | null;
    deletedAt?: Date | null;
}

const orderSchema = new Schema<OrderDocument>(
    {
        tableId: {
            type: String,
            required: true,
            index: true,
        },
        items: [
            {
                type: {
                    type: String,
                    enum: ["dish", "drink", "menu", "promotion"],
                    required: true,
                },
                itemId: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                selectedOptions: {
                    entranteId: String,
                    principalId: String,
                    postreId: String,
                    bebidaId: String,
                },
                _id: false,
            },
        ],
        status: {
            type: String,
            enum: ["pending", "confirmed", "preparing", "ready", "served"],
            default: "pending",
        },
        total: {
            type: Number,
            required: true,
            min: 0,
        },
        paidAt: {
            type: Date,
            default: null,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

orderSchema.index({ tableId: 1, status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ status: 1 });

export const Order = model<OrderDocument>("Order", orderSchema);
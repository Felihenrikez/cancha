import { Schema, model } from "mongoose";
import { Field } from "../../../Domain/entities/field/field";

const FieldSchema = new Schema<Field>({
    clubId: {type: String, required: true },
    name: { type: String, required: true },
    sportType: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const FieldModel = model<Field>("field", FieldSchema);
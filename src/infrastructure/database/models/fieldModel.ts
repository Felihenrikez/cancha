import mongoose, { Schema, Model, Document } from 'mongoose';

interface IFieldModel extends Document {
  clubId: string;
  name: string;
  sportType: string;
  isAvailable: boolean;
  imageUrl?: string;
  description?: string;
}

const fieldSchema = new Schema<IFieldModel>({
  clubId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sportType: {
    type: String,
    required: true,
    trim: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

export const FieldModel: Model<IFieldModel> =
  mongoose.models.Field || mongoose.model<IFieldModel>('Field', fieldSchema);
import mongoose, { Schema, Model, Document } from 'mongoose';

interface IClubModel extends Document {
  userId: string;
  name: string;
  address: string;
  phone: string;
  fieldId?: string[];
  description?: string;
  imageUrl?: string;
}

const clubSchema = new Schema<IClubModel>({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  fieldId: [{
    type: String,
  }],
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
  },
}, { timestamps: true });

export const ClubModel: Model<IClubModel> =
  mongoose.models.Club || mongoose.model<IClubModel>('Club', clubSchema);
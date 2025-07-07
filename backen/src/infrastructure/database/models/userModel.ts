import mongoose, { Schema, Model, Document } from 'mongoose';

interface IUserModel extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string;
  createDate:  string;
  role: string;
  clubId: string;
}

const userSchema = new Schema<IUserModel>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  createDate: {
    type: String,
    required: true,
    default: Date.now.toString,
  },
  role: {
    type: String,
    required: true,
    enum: ['player', 'owner'], // Valores permitidos
  },
  clubId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export const UserModel: Model<IUserModel> =
  mongoose.models.User || mongoose.model<IUserModel>('UserModel', userSchema);

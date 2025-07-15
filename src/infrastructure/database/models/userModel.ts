import mongoose, { Schema, Model, Document } from 'mongoose';

interface IUserModel extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string;
  createDate: string;
  role: string;
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
    default: () => new Date().toISOString(),
  },
  role: {
    type: String,
    required: true,
    enum: ['player', 'owner', 'admin'], // Valores permitidos
  },
}, { timestamps: true });

export const UserModel: Model<IUserModel> =
  mongoose.models.User || mongoose.model<IUserModel>('User', userSchema);

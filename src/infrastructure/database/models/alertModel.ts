import mongoose, { Schema, Model, Document } from 'mongoose';

interface IAlertModel extends Document {
  senderId: string;
  recipientId: string;
  recipientType: 'user' | 'phone';
  message: string;
  createdAt: Date;
  status: 'sent' | 'read' | 'failed';
  type: 'info' | 'query';
  eventId: string;
}

const alertSchema = new Schema<IAlertModel>({
  senderId: {
    type: String,
    required: true,
  },
  recipientId: {
    type: String,
    required: true,
  },
  recipientType: {
    type: String,
    enum: ['user', 'phone'],
    default: 'user',
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    enum: ['sent', 'read', 'failed'],
    default: 'sent',
  },
  type: {
    type: String,
    required: true,
    enum: ['info', 'query'],
    default: 'info',
  },
  eventId: {
    type: String,
    required: false,
    default: '',
  },
}, { timestamps: true });

export const AlertModel: Model<IAlertModel> =
  mongoose.models.Alert || mongoose.model<IAlertModel>('Alert', alertSchema);
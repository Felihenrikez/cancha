import mongoose, { Schema, Model, Document } from 'mongoose';

interface IScheduleModel extends Document {
  fieldId: string;
  clubId: string;
  fieldName: string;
  clubName: string;
  price: number;
  date: string;
  startHour: string;
  isAvailable: boolean;
}

const scheduleSchema = new Schema<IScheduleModel>({
  fieldId: {
    type: String,
    required: true,
  },
  clubId: {
    type: String,
    required: true,
  },
  fieldName: {
    type: String,
    required: true,
    trim: true,
  },
  clubName: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: String,
    required: true,
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Date format must be YYYY-MM-DD'],
  },
  startHour: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, 'Time format must be HH:MM'],
  },
  isAvailable: {
    type: Boolean,
    required: true,
    default: true,
  },
}, { timestamps: true });

export const ScheduleModel: Model<IScheduleModel> =
  mongoose.models.Schedule || mongoose.model<IScheduleModel>('Schedule', scheduleSchema);
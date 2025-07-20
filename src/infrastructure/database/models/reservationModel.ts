import mongoose, { Schema, Model, Document } from 'mongoose';

interface IReservationModel extends Document {
  scheduleId: string;
  userId: string;
  state: 'pendiente' | 'confirmada' | 'cancelada';
  dateReservation: string;
  startHour: string;
  paymentType?: string;
  price: number;
  membersList?: { name: string; number: string; confirmation: boolean }[];
}

const reservationSchema = new Schema<IReservationModel>({
  scheduleId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: ['pendiente', 'confirmada', 'cancelada'],
    default: 'pendiente',
  },
  dateReservation: {
    type: String,
    required: true,
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Date format must be YYYY-MM-DD'],
  },
  startHour: {
    type: String,
    required: true,
    match: [/^\d{2}:\d{2}$/, 'Time format must be HH:MM'],
  },
  paymentType: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  membersList: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    confirmation: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'rejected'],
      default: 'pending',
    }
  }],
}, { timestamps: true });

export const ReservationModel: Model<IReservationModel> =
  mongoose.models.Reservation || mongoose.model<IReservationModel>('Reservation', reservationSchema);
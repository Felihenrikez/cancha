import { Reservation } from '../entities/reservation/reservation';
import { ReservationId } from '../entities/reservation/reservationId';
import { ScheduleId } from '../entities/schedule/scheduleId';
import { UserId } from '../entities/user/userId';

export interface ReservationRepository {
  createReservation(reservation: Reservation): Promise<Reservation>;
  findById(id: ReservationId): Promise<Reservation | null>;
  getAllReservation(): Promise<Reservation[]>;
  findByUserId(userId: UserId): Promise<Reservation[]>;
  findByScheduleId(scheduleId: ScheduleId): Promise<Reservation[]>;
  update(reservation: Reservation): Promise<Reservation>;
  delete(id: ReservationId): Promise<void>;
}
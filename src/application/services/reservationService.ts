import { ReservationRepository } from '../../Domain/repositories/reservationRepositoryInterface';
import { Reservation } from '../../Domain/entities/reservation/reservation';
import { ReservationId } from '../../Domain/entities/reservation/reservationId';
import { ReservationState } from '../../Domain/entities/reservation/reservationState';
import { ReservationDateReservation } from '../../Domain/entities/reservation/reservationDateReservation';
import { ReservationStartHour } from '../../Domain/entities/reservation/reservationStartHour';
import { ReservationPrice } from '../../Domain/entities/reservation/reservationPrice';
import { ReservationPaymentType } from '../../Domain/entities/reservation/reservationPaymentType';
import { ScheduleId } from '../../Domain/entities/schedule/scheduleId';
import { UserId } from '../../Domain/entities/user/userId';

export class ReservationService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async createReservation(reservationData: {
    scheduleId: string;
    userId: string;
    state: 'pendiente' | 'confirmada' | 'cancelada';
    dateReservation: string;
    startHour: string;
    price: number;
    paymentType?: string;
  }): Promise<Reservation> {
    const reservation = new Reservation(
      new ScheduleId(reservationData.scheduleId),
      new UserId(reservationData.userId),
      new ReservationState(reservationData.state),
      new ReservationDateReservation(reservationData.dateReservation),
      new ReservationStartHour(reservationData.startHour),
      new ReservationPrice(reservationData.price),
      reservationData.paymentType ? new ReservationPaymentType(reservationData.paymentType) : undefined
    );

    return await this.reservationRepository.createReservation(reservation);
  }

  async getReservationById(id: string): Promise<Reservation | null> {
    const reservationId = new ReservationId(id);
    return await this.reservationRepository.findById(reservationId);
  }

  async getAllReservation(): Promise<Reservation[]> {
    return await this.reservationRepository.getAllReservation();
  }

  async getReservationsByUserId(userId: string): Promise<Reservation[]> {
    const userIdObj = new UserId(userId);
    return await this.reservationRepository.findByUserId(userIdObj);
  }

  async getReservationsByScheduleId(scheduleId: string): Promise<Reservation[]> {
    const scheduleIdObj = new ScheduleId(scheduleId);
    return await this.reservationRepository.findByScheduleId(scheduleIdObj);
  }

  async updateReservation(reservation: Reservation): Promise<Reservation> {
    return await this.reservationRepository.update(reservation);
  }

  async deleteReservation(id: string): Promise<void> {
    const reservationId = new ReservationId(id);
    return await this.reservationRepository.delete(reservationId);
  }
}
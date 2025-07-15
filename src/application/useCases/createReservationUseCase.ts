import { ReservationRepository } from '../../Domain/repositories/reservationRepositoryInterface';
import { Reservation } from '../../Domain/entities/reservation/reservation';
import { ReservationState } from '../../Domain/entities/reservation/reservationState';
import { ReservationDateReservation } from '../../Domain/entities/reservation/reservationDateReservation';
import { ReservationStartHour } from '../../Domain/entities/reservation/reservationStartHour';
import { ReservationPrice } from '../../Domain/entities/reservation/reservationPrice';
import { ReservationPaymentType } from '../../Domain/entities/reservation/reservationPaymentType';
import { ScheduleId } from '../../Domain/entities/schedule/scheduleId';
import { UserId } from '../../Domain/entities/user/userId';

export interface CreateReservationRequest {
  scheduleId: string;
  userId: string;
  state: 'pendiente' | 'confirmada' | 'cancelada';
  dateReservation: string;
  startHour: string;
  price: number;
  paymentType?: string;
}

export interface CreateReservationResponse {
  id?: string;
  scheduleId: string;
  userId: string;
  state: 'pendiente' | 'confirmada' | 'cancelada';
  dateReservation: string;
  startHour: string;
  price: number;
  paymentType?: string;
}

export class CreateReservationUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(request: CreateReservationRequest): Promise<CreateReservationResponse> {
    const reservation = new Reservation(
      new ScheduleId(request.scheduleId),
      new UserId(request.userId),
      new ReservationState(request.state),
      new ReservationDateReservation(request.dateReservation),
      new ReservationStartHour(request.startHour),
      new ReservationPrice(request.price),
      request.paymentType ? new ReservationPaymentType(request.paymentType) : undefined
    );

    const savedReservation = await this.reservationRepository.createReservation(reservation);

    return {
      id: savedReservation._id?.getValue(),
      scheduleId: savedReservation.scheduleId.getValue(),
      userId: savedReservation.userId.getValue(),
      state: savedReservation.state.getValue(),
      dateReservation: savedReservation.dateReservation.getValue(),
      startHour: savedReservation.startHour.getValue(),
      price: savedReservation.price.getValue(),
      paymentType: savedReservation.paymentType?.getValue()
    };
  }
}
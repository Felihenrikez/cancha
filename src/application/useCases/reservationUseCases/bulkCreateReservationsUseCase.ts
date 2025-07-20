import { ReservationRepository } from '../../../Domain/repositories/reservationRepositoryInterface';
import { Reservation } from '../../../Domain/entities/reservation/reservation';
import { ReservationState } from '../../../Domain/entities/reservation/reservationState';
import { ReservationDateReservation } from '../../../Domain/entities/reservation/reservationDateReservation';
import { ReservationStartHour } from '../../../Domain/entities/reservation/reservationStartHour';
import { ReservationPrice } from '../../../Domain/entities/reservation/reservationPrice';
import { ReservationPaymentType } from '../../../Domain/entities/reservation/reservationPaymentType';
import { ReservationMembersList, Member } from '../../../Domain/entities/reservation/reservationMembersList';
import { ScheduleId } from '../../../Domain/entities/schedule/scheduleId';
import { UserId } from '../../../Domain/entities/user/userId';

export interface BulkCreateReservationsRequest {
  scheduleId: string;
  userId: string;
  state: 'pendiente' | 'confirmada' | 'cancelada';
  dateReservation: string;
  startHour: string;
  price: number;
  paymentType?: string;
  membersList?: Member[];
}

export interface BulkCreateReservationsResponse {
  message: string;
  reservations: {
    id: string;
    scheduleId: string;
    userId: string;
    state: 'pendiente' | 'confirmada' | 'cancelada';
    dateReservation: string;
    startHour: string;
    price: number;
    paymentType?: string;
    membersList?: Member[];
  }[];
}

export class BulkCreateReservationsUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(requests: BulkCreateReservationsRequest[]): Promise<BulkCreateReservationsResponse> {
    const createdReservations = [];

    for (const request of requests) {
      const reservation = new Reservation(
        new ScheduleId(request.scheduleId),
        new UserId(request.userId),
        new ReservationState(request.state),
        new ReservationDateReservation(request.dateReservation),
        new ReservationStartHour(request.startHour),
        new ReservationPrice(request.price),
        request.paymentType ? new ReservationPaymentType(request.paymentType) : undefined,
        request.membersList ? new ReservationMembersList(request.membersList) : undefined
      );

      const savedReservation = await this.reservationRepository.createReservation(reservation);
      createdReservations.push({
        id: savedReservation._id?.getValue() || '',
        scheduleId: savedReservation.scheduleId.getValue(),
        userId: savedReservation.userId.getValue(),
        state: savedReservation.state.getValue(),
        dateReservation: savedReservation.dateReservation.getValue(),
        startHour: savedReservation.startHour.getValue(),
        price: savedReservation.price.getValue(),
        paymentType: savedReservation.paymentType?.getValue(),
        membersList: savedReservation.membersList?.getValue()
      });
    }

    return {
      message: `${createdReservations.length} reservations created successfully`,
      reservations: createdReservations
    };
  }
}
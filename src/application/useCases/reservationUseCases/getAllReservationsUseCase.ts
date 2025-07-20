import { ReservationRepository } from '../../../Domain/repositories/reservationRepositoryInterface';
import { Member } from '../../../Domain/entities/reservation/reservationMembersList';

export interface GetAllReservationsResponse {
  id: string;
  scheduleId: string;
  userId: string;
  state: 'pendiente' | 'confirmada' | 'cancelada';
  dateReservation: string;
  startHour: string;
  price: number;
  paymentType?: string;
  membersList?: Member[];
}

export class GetAllReservationsUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(): Promise<GetAllReservationsResponse[]> {
    const reservations = await this.reservationRepository.getAllReservation();

    return reservations.map(reservation => ({
      id: reservation._id?.getValue() || '',
      scheduleId: reservation.scheduleId.getValue(),
      userId: reservation.userId.getValue(),
      state: reservation.state.getValue(),
      dateReservation: reservation.dateReservation.getValue(),
      startHour: reservation.startHour.getValue(),
      price: reservation.price.getValue(),
      paymentType: reservation.paymentType?.getValue(),
      membersList: reservation.membersList?.getValue()
    }));
  }
}
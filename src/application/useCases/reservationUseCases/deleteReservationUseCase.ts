import { ReservationRepository } from '../../../Domain/repositories/reservationRepositoryInterface';
import { ReservationId } from '../../../Domain/entities/reservation/reservationId';

export class DeleteReservationUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(id: string): Promise<void> {
    const reservationId = new ReservationId(id);
    const reservation = await this.reservationRepository.findById(reservationId);
    
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    // Regla de negocio: Solo se pueden eliminar reservas pendientes
    if (reservation.state.getValue() === 'confirmada') {
      throw new Error('Cannot delete confirmed reservations');
    }

    await this.reservationRepository.delete(reservationId);
  }
}
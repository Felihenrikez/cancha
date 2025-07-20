import { AlertRepository } from '../../../Domain/repositories/alertRepositoryInterface';
import { UserRepository } from '../../../Domain/repositories/userRepositoryInterface';
import { ReservationRepository } from '../../../Domain/repositories/reservationRepositoryInterface';
import { Alert } from '../../../Domain/entities/alert/alert';
import { AlertMessage } from '../../../Domain/entities/alert/alertMessage';
import { AlertStatus } from '../../../Domain/entities/alert/alertStatus';
import { AlertCreatedAt } from '../../../Domain/entities/alert/alertCreatedAt';
import { AlertRecipientId } from '../../../Domain/entities/alert/alertRecipientId';
import { AlertType } from '../../../Domain/entities/alert/alertType';
import { UserId } from '../../../Domain/entities/user/userId';
import { ReservationId } from '../../../Domain/entities/reservation/reservationId';
import { Member } from '../../../Domain/entities/reservation/reservationMembersList';

export interface NotifyReservationMembersRequest {
  reservationId: string;
  members: Member[];
  senderId: string;
  eventType: 'creation' | 'update' | 'reminder';
}

export interface NotifyReservationMembersResponse {
  success: boolean;
  alertsSent: number;
  message: string;
}

export class NotifyReservationMembersUseCase {
  constructor(
    private readonly alertRepository: AlertRepository,
    private readonly userRepository: UserRepository,
    private readonly reservationRepository: ReservationRepository
  ) {}

  async execute(request: NotifyReservationMembersRequest): Promise<NotifyReservationMembersResponse> {
    const { reservationId, members, senderId, eventType } = request;
    
    // 1. Verificar que la reservación existe
    const reservation = await this.reservationRepository.findById(new ReservationId(reservationId));
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    
    // 2. Preparar el remitente
    const senderUserId = new UserId(senderId);
    
    // 3. Contador de alertas enviadas
    let alertsSent = 0;
    
    // 4. Procesar cada miembro
    for (const member of members) {
      try {
        // 4.1 Buscar si el usuario existe por número de teléfono
        const user = await this.userRepository.findByPhone(member.number);
        
        // 4.2 Crear mensaje según el tipo de evento y estado de confirmación
        let message = '';
        switch (eventType) {
          case 'creation':
            message = `Hola ${member.name}, has sido invitado a un partido el ${reservation.dateReservation.getValue()} a las ${reservation.startHour.getValue()}`;
            break;
          case 'update':
            if (member.confirmation === 'confirmed') {
              message = `Hola ${member.name}, has confirmado tu asistencia al partido del ${reservation.dateReservation.getValue()} a las ${reservation.startHour.getValue()}`;
            } else if (member.confirmation === 'rejected') {
              message = `Hola ${member.name}, has rechazado la invitación al partido del ${reservation.dateReservation.getValue()}`;
            } else {
              message = `Hola ${member.name}, tu invitación al partido del ${reservation.dateReservation.getValue()} está pendiente de confirmación`;
            }
            break;
          case 'reminder':
            message = `Hola ${member.name}, te recordamos que tienes un partido programado para mañana a las ${reservation.startHour.getValue()}`;
            break;
        }
        
        // 4.3 Crear la alerta
        const recipientId = user && user._id ? user._id.getValue() : member.number;
        const alert = new Alert(
          senderUserId,
          new AlertRecipientId(recipientId),
          new AlertMessage(message),
          new AlertCreatedAt(new Date()),
          new AlertStatus('sent'),
          new AlertType('query'),
          reservationId
        );
        
        // 4.4 Guardar la alerta con el tipo de destinatario
        await this.alertRepository.createAlert(alert, user && user._id ? 'user' : 'phone');
        
        alertsSent++;
      } catch (error) {
        console.error(`Error sending alert to member ${member.name}:`, error);
      }
    }
    
    return {
      success: alertsSent > 0,
      alertsSent,
      message: `${alertsSent} alerts sent successfully`
    };
  }
}
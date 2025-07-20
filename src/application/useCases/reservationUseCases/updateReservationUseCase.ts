import { ReservationRepository } from '../../../Domain/repositories/reservationRepositoryInterface';
import { AlertRepository } from '../../../Domain/repositories/alertRepositoryInterface';
import { UserRepository } from '../../../Domain/repositories/userRepositoryInterface';
import { Reservation } from '../../../Domain/entities/reservation/reservation';
import { ReservationId } from '../../../Domain/entities/reservation/reservationId';
import { ReservationState } from '../../../Domain/entities/reservation/reservationState';
import { ReservationDateReservation } from '../../../Domain/entities/reservation/reservationDateReservation';
import { ReservationStartHour } from '../../../Domain/entities/reservation/reservationStartHour';
import { ReservationPrice } from '../../../Domain/entities/reservation/reservationPrice';
import { ReservationPaymentType } from '../../../Domain/entities/reservation/reservationPaymentType';
import { ReservationMembersList, Member } from '../../../Domain/entities/reservation/reservationMembersList';
import { Alert } from '../../../Domain/entities/alert/alert';
import { AlertMessage } from '../../../Domain/entities/alert/alertMessage';
import { AlertStatus } from '../../../Domain/entities/alert/alertStatus';
import { AlertCreatedAt } from '../../../Domain/entities/alert/alertCreatedAt';
import { AlertRecipientId } from '../../../Domain/entities/alert/alertRecipientId';
import { AlertType } from '../../../Domain/entities/alert/alertType';
import { UserId } from '../../../Domain/entities/user/userId';

export interface UpdateReservationRequest {
  id: string;
  state?: 'pendiente' | 'confirmada' | 'cancelada';
  dateReservation?: string;
  startHour?: string;
  price?: number;
  paymentType?: string;
  membersList?: Member[];
}

export interface UpdateReservationResponse {
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

export class UpdateReservationUseCase {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly alertRepository: AlertRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(request: UpdateReservationRequest): Promise<UpdateReservationResponse> {
    const reservationId = new ReservationId(request.id);
    const existingReservation = await this.reservationRepository.findById(reservationId);
    
    if (!existingReservation) {
      throw new Error('Reservation not found');
    }

    // Guardar los miembros actuales para comparar después
    const existingMembers = existingReservation.membersList?.getValue() || [];
    
    const updatedReservation = new Reservation(
      existingReservation.scheduleId,
      existingReservation.userId,
      new ReservationState(request.state || existingReservation.state.getValue()),
      new ReservationDateReservation(request.dateReservation || existingReservation.dateReservation.getValue()),
      new ReservationStartHour(request.startHour || existingReservation.startHour.getValue()),
      new ReservationPrice(request.price || existingReservation.price.getValue()),
      request.paymentType ? new ReservationPaymentType(request.paymentType) : existingReservation.paymentType,
      request.membersList ? new ReservationMembersList(request.membersList) : existingReservation.membersList,
      reservationId
    );

    const result = await this.reservationRepository.update(updatedReservation);

    // Verificar si hay nuevos miembros para enviar alertas
    if (request.membersList) {
      const newMembers = this.findNewMembers(existingMembers, request.membersList);
      
      if (newMembers.length > 0) {
        await this.sendAlertsToNewMembers(
          newMembers, 
          existingReservation.userId.getValue(),
          result.dateReservation.getValue(),
          result.startHour.getValue(),
          request.id
        );
      }
    }

    return {
      id: result._id?.getValue() || '',
      scheduleId: result.scheduleId.getValue(),
      userId: result.userId.getValue(),
      state: result.state.getValue(),
      dateReservation: result.dateReservation.getValue(),
      startHour: result.startHour.getValue(),
      price: result.price.getValue(),
      paymentType: result.paymentType?.getValue(),
      membersList: result.membersList?.getValue()
    };
  }

  private findNewMembers(existingMembers: Member[], updatedMembers: Member[]): Member[] {
    // Identificar miembros nuevos comparando por número de teléfono
    const existingPhones = new Set(existingMembers.map(member => member.number));
    return updatedMembers.filter(member => !existingPhones.has(member.number));
  }

  private async sendAlertsToNewMembers(
    newMembers: Member[], 
    senderId: string,
    dateReservation: string,
    startHour: string,
    reservationId: string
  ): Promise<void> {
    const senderUserId = new UserId(senderId);

    for (const member of newMembers) {
      try {
        // Buscar si existe un usuario con este número de teléfono
        const user = await this.userRepository.findByPhone(member.number);
        
        const message = `Hola ${member.name}, has sido invitado a un partido el ${dateReservation} a las ${startHour}`;
        
        let recipientId;
        let recipientType: 'user' | 'phone';
        
        if (user && user._id) {
          // Si existe un usuario, usar su ID
          recipientId = user._id.getValue();
          recipientType = 'user';
        } else {
          // Si no existe, usar el número de teléfono
          recipientId = member.number;
          recipientType = 'phone';
        }
        
        const alert = new Alert(
          senderUserId,
          new AlertRecipientId(recipientId),
          new AlertMessage(message),
          new AlertCreatedAt(new Date()),
          new AlertStatus('sent'),
          new AlertType('query'),
          reservationId // eventId = reservationId
        );
        
        await this.alertRepository.createAlert(alert, recipientType);
      } catch (error) {
        console.error(`Error sending alert to member ${member.name}:`, error);
      }
    }
  }
}
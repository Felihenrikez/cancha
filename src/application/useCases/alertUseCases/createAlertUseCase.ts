import { AlertRepository } from '../../../Domain/repositories/alertRepositoryInterface';
import { Alert } from '../../../Domain/entities/alert/alert';
import { AlertMessage } from '../../../Domain/entities/alert/alertMessage';
import { AlertStatus, AlertStatusType } from '../../../Domain/entities/alert/alertStatus';
import { AlertCreatedAt } from '../../../Domain/entities/alert/alertCreatedAt';
import { AlertRecipientId } from '../../../Domain/entities/alert/alertRecipientId';
import { AlertType, AlertTypeValue } from '../../../Domain/entities/alert/alertType';
import { UserId } from '../../../Domain/entities/user/userId';

export interface CreateAlertRequest {
  senderId: string;
  recipientId: string;
  message: string;
  status?: AlertStatusType;
  type?: AlertTypeValue;
  eventId?: string;
}

export interface CreateAlertResponse {
  id?: string;
  senderId: string;
  recipientId: string;
  message: string;
  createdAt: string;
  status: AlertStatusType;
  type: AlertTypeValue;
  eventId: string;
}

export class CreateAlertUseCase {
  constructor(private readonly alertRepository: AlertRepository) {}

  async execute(request: CreateAlertRequest, recipientType: 'user' | 'phone' = 'user'): Promise<CreateAlertResponse> {
    const alert = new Alert(
      new UserId(request.senderId),
      new AlertRecipientId(request.recipientId),
      new AlertMessage(request.message),
      new AlertCreatedAt(new Date()),
      new AlertStatus(request.status || 'sent'),
      new AlertType(request.type || 'info'),
      request.eventId || ''
    );

    const savedAlert = await this.alertRepository.createAlert(alert, recipientType);

    return {
      id: savedAlert._id?.getValue(),
      senderId: savedAlert.senderId.getValue(),
      recipientId: savedAlert.recipientId.getValue(),
      message: savedAlert.message.getValue(),
      createdAt: savedAlert.createdAt.getValue().toISOString(),
      status: savedAlert.status.getValue(),
      type: savedAlert.type.getValue(),
      eventId: savedAlert.eventId
    };
  }
}
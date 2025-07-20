import { AlertRepository } from '../../../Domain/repositories/alertRepositoryInterface';
import { Alert } from '../../../Domain/entities/alert/alert';
import { AlertMessage } from '../../../Domain/entities/alert/alertMessage';
import { AlertStatus, AlertStatusType } from '../../../Domain/entities/alert/alertStatus';
import { AlertCreatedAt } from '../../../Domain/entities/alert/alertCreatedAt';
import { AlertRecipientId } from '../../../Domain/entities/alert/alertRecipientId';
import { AlertType, AlertTypeValue } from '../../../Domain/entities/alert/alertType';
import { UserId } from '../../../Domain/entities/user/userId';

export interface BulkCreateAlertsRequest {
  senderId: string;
  recipientId: string;
  message: string;
  status?: AlertStatusType;
  type?: AlertTypeValue;
  eventId?: string;
}

export interface BulkCreateAlertsResponse {
  message: string;
  alerts: {
    id: string;
    senderId: string;
    recipientId: string;
    message: string;
    createdAt: string;
    status: AlertStatusType;
    type: AlertTypeValue;
    eventId: string;
  }[];
}

export class BulkCreateAlertsUseCase {
  constructor(private readonly alertRepository: AlertRepository) {}

  async execute(requests: BulkCreateAlertsRequest[]): Promise<BulkCreateAlertsResponse> {
    const createdAlerts = [];

    for (const request of requests) {
      const alert = new Alert(
        new UserId(request.senderId),
        new AlertRecipientId(request.recipientId),
        new AlertMessage(request.message),
        new AlertCreatedAt(new Date()),
        new AlertStatus(request.status || 'sent'),
        new AlertType(request.type || 'info'),
        request.eventId || ''
      );

      const savedAlert = await this.alertRepository.createAlert(alert);
      createdAlerts.push({
        id: savedAlert._id?.getValue() || '',
        senderId: savedAlert.senderId.getValue(),
        recipientId: savedAlert.recipientId.getValue(),
        message: savedAlert.message.getValue(),
        createdAt: savedAlert.createdAt.getValue().toISOString(),
        status: savedAlert.status.getValue(),
        type: savedAlert.type.getValue(),
        eventId: savedAlert.eventId
      });
    }

    return {
      message: `${createdAlerts.length} alerts created successfully`,
      alerts: createdAlerts
    };
  }
}
import { AlertRepository } from '../../../Domain/repositories/alertRepositoryInterface';
import { Alert } from '../../../Domain/entities/alert/alert';
import { AlertId } from '../../../Domain/entities/alert/alertId';
import { AlertMessage } from '../../../Domain/entities/alert/alertMessage';
import { AlertStatus, AlertStatusType } from '../../../Domain/entities/alert/alertStatus';
import { AlertType, AlertTypeValue } from '../../../Domain/entities/alert/alertType';

export interface UpdateAlertRequest {
  id: string;
  message?: string;
  status?: AlertStatusType;
  type?: AlertTypeValue;
}

export interface UpdateAlertResponse {
  id: string;
  senderId: string;
  recipientId: string;
  message: string;
  createdAt: string;
  status: AlertStatusType;
  type: AlertTypeValue;
  eventId: string;
}

export class UpdateAlertUseCase {
  constructor(private readonly alertRepository: AlertRepository) {}

  async execute(request: UpdateAlertRequest): Promise<UpdateAlertResponse> {
    const alertId = new AlertId(request.id);
    const existingAlert = await this.alertRepository.findById(alertId);
    
    if (!existingAlert) {
      throw new Error('Alert not found');
    }

    const updatedAlert = new Alert(
      existingAlert.senderId,
      existingAlert.recipientId,
      new AlertMessage(request.message || existingAlert.message.getValue()),
      existingAlert.createdAt,
      new AlertStatus(request.status || existingAlert.status.getValue()),
      new AlertType(request.type || existingAlert.type.getValue()),
      existingAlert.eventId,
      alertId
    );

    const result = await this.alertRepository.update(updatedAlert);

    return {
      id: result._id?.getValue() || '',
      senderId: result.senderId.getValue(),
      recipientId: result.recipientId.getValue(),
      message: result.message.getValue(),
      createdAt: result.createdAt.getValue().toISOString(),
      status: result.status.getValue(),
      type: result.type.getValue(),
      eventId: result.eventId
    };
  }
}
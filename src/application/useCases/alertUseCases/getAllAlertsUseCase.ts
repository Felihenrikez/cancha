import { AlertRepository } from '../../../Domain/repositories/alertRepositoryInterface';
import { AlertStatusType } from '../../../Domain/entities/alert/alertStatus';
import { AlertTypeValue } from '../../../Domain/entities/alert/alertType';

export interface GetAllAlertsResponse {
  id: string;
  senderId: string;
  recipientId: string;
  message: string;
  createdAt: string;
  status: AlertStatusType;
  type: AlertTypeValue;
  eventId: any;
}

export class GetAllAlertsUseCase {
  constructor(private readonly alertRepository: AlertRepository) {}

  async execute(): Promise<GetAllAlertsResponse[]> {
    const alerts = await this.alertRepository.getAllAlert();

    return alerts.map(alert => ({
      id: alert._id?.getValue() || '',
      senderId: alert.senderId.getValue(),
      recipientId: alert.recipientId.getValue(),
      message: alert.message.getValue(),
      createdAt: alert.createdAt.getValue().toISOString(),
      status: alert.status.getValue(),
      type: alert.type.getValue(),
      eventId: alert.eventId
    }));
  }
}
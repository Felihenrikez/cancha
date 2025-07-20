import { AlertId } from './alertId';
import { AlertMessage } from './alertMessage';
import { AlertStatus } from './alertStatus';
import { AlertCreatedAt } from './alertCreatedAt';
import { AlertRecipientId } from './alertRecipientId';
import { AlertType } from './alertType';
import { UserId } from '../user/userId';

export class Alert {
  constructor(
    public senderId: UserId,
    public recipientId: AlertRecipientId,
    public message: AlertMessage,
    public createdAt: AlertCreatedAt,
    public status: AlertStatus,
    public type: AlertType,
    public eventId: string, // ID del evento que genera la alerta
    public readonly _id?: AlertId
  ) {}
}
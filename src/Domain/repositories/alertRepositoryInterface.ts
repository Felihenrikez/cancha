import { Alert } from '../entities/alert/alert';
import { AlertId } from '../entities/alert/alertId';
import { AlertRecipientId } from '../entities/alert/alertRecipientId';
import { UserId } from '../entities/user/userId';

export interface AlertRepository {
  createAlert(alert: Alert, recipientType?: 'user' | 'phone'): Promise<Alert>;
  findById(id: AlertId): Promise<Alert | null>;
  getAllAlert(): Promise<Alert[]>;
  findBySenderId(senderId: UserId): Promise<Alert[]>;
  findByRecipientId(recipientId: AlertRecipientId): Promise<Alert[]>;
  update(alert: Alert): Promise<Alert>;
  delete(id: AlertId): Promise<void>;
}
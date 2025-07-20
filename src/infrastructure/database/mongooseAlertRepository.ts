import { AlertRepository } from '../../Domain/repositories/alertRepositoryInterface';
import { Alert } from '../../Domain/entities/alert/alert';
import { AlertModel } from './models/alertModel';
import { AlertId } from '../../Domain/entities/alert/alertId';
import { AlertMessage } from '../../Domain/entities/alert/alertMessage';
import { AlertStatus } from '../../Domain/entities/alert/alertStatus';
import { AlertCreatedAt } from '../../Domain/entities/alert/alertCreatedAt';
import { AlertRecipientId } from '../../Domain/entities/alert/alertRecipientId';
import { AlertType } from '../../Domain/entities/alert/alertType';
import { UserId } from '../../Domain/entities/user/userId';

export class MongooseAlertRepository implements AlertRepository {
  async createAlert(alert: Alert, recipientType: 'user' | 'phone' = 'user'): Promise<Alert> {
    const data = {
      senderId: alert.senderId.getValue(),
      recipientId: alert.recipientId.getValue(),
      recipientType: recipientType,
      message: alert.message.getValue(),
      createdAt: alert.createdAt.getValue(),
      status: alert.status.getValue(),
      type: alert.type.getValue(),
      eventId: alert.eventId
    };
    
    const created = await AlertModel.create(data);
    
    return new Alert(
      alert.senderId,
      alert.recipientId,
      alert.message,
      alert.createdAt,
      alert.status,
      alert.type,
      alert.eventId,
      new AlertId((created._id as any).toString())
    );
  }

  async findById(id: AlertId): Promise<Alert | null> {
    const doc = await AlertModel.findById(id.getValue()).exec();
    if (!doc) return null;

    return new Alert(
      new UserId(doc.senderId),
      new AlertRecipientId(doc.recipientId),
      new AlertMessage(doc.message),
      new AlertCreatedAt(doc.createdAt),
      new AlertStatus(doc.status),
      new AlertType(doc.type),
      doc.eventId || '',
      new AlertId((doc._id as any).toString())
    );
  }

  async getAllAlert(): Promise<Alert[]> {
    const docs = await AlertModel.find().exec();
    return docs.map(doc => new Alert(
      new UserId(doc.senderId),
      new AlertRecipientId(doc.recipientId),
      new AlertMessage(doc.message),
      new AlertCreatedAt(doc.createdAt),
      new AlertStatus(doc.status),
      new AlertType(doc.type),
      doc.eventId || '',
      new AlertId((doc._id as any).toString())
    ));
  }

  async findBySenderId(senderId: UserId): Promise<Alert[]> {
    const docs = await AlertModel.find({ senderId: senderId.getValue() }).exec();
    return docs.map(doc => new Alert(
      new UserId(doc.senderId),
      new AlertRecipientId(doc.recipientId),
      new AlertMessage(doc.message),
      new AlertCreatedAt(doc.createdAt),
      new AlertStatus(doc.status),
      new AlertType(doc.type),
      doc.eventId || '',
      new AlertId((doc._id as any).toString())
    ));
  }

  async findByRecipientId(recipientId: AlertRecipientId): Promise<Alert[]> {
    const docs = await AlertModel.find({ recipientId: recipientId.getValue() }).exec();
    return docs.map(doc => new Alert(
      new UserId(doc.senderId),
      new AlertRecipientId(doc.recipientId),
      new AlertMessage(doc.message),
      new AlertCreatedAt(doc.createdAt),
      new AlertStatus(doc.status),
      new AlertType(doc.type),
      doc.eventId || '',
      new AlertId((doc._id as any).toString())
    ));
  }

  async update(alert: Alert): Promise<Alert> {
    if (!alert._id) throw new Error('Alert ID is required for update');

    const updated = await AlertModel.findByIdAndUpdate(
      alert._id.getValue(),
      {
        senderId: alert.senderId.getValue(),
        recipientId: alert.recipientId.getValue(),
        message: alert.message.getValue(),
        createdAt: alert.createdAt.getValue(),
        status: alert.status.getValue(),
        type: alert.type.getValue(),
        eventId: alert.eventId
      },
      { new: true }
    ).exec();

    if (!updated) throw new Error('Alert not found');

    return new Alert(
      new UserId(updated.senderId),
      new AlertRecipientId(updated.recipientId),
      new AlertMessage(updated.message),
      new AlertCreatedAt(updated.createdAt),
      new AlertStatus(updated.status),
      new AlertType(updated.type),
      updated.eventId || '',
      new AlertId((updated._id as any).toString())
    );
  }

  async delete(id: AlertId): Promise<void> {
    const result = await AlertModel.findByIdAndDelete(id.getValue()).exec();
    if (!result) throw new Error('Alert not found');
  }
}
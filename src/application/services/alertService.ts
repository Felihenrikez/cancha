import { CreateAlertUseCase } from '../useCases/alertUseCases/createAlertUseCase';
import { DeleteAlertUseCase } from '../useCases/alertUseCases/deleteAlertUseCase';
import { UpdateAlertUseCase } from '../useCases/alertUseCases/updateAlertUseCase';
import { GetAllAlertsUseCase } from '../useCases/alertUseCases/getAllAlertsUseCase';
import { BulkCreateAlertsUseCase } from '../useCases/alertUseCases/bulkCreateAlertsUseCase';
import { NotifyReservationMembersUseCase } from '../useCases/alertUseCases/notifyReservationMembersUseCase';
import { AlertRepository } from '../../Domain/repositories/alertRepositoryInterface';
import { UserRepository } from '../../Domain/repositories/userRepositoryInterface';
import { ReservationRepository } from '../../Domain/repositories/reservationRepositoryInterface';
import { Alert } from '../../Domain/entities/alert/alert';
import { AlertId } from '../../Domain/entities/alert/alertId';
import { AlertRecipientId } from '../../Domain/entities/alert/alertRecipientId';
import { UserId } from '../../Domain/entities/user/userId';

export class AlertService {
  private createAlertUseCase: CreateAlertUseCase;
  private deleteAlertUseCase: DeleteAlertUseCase;
  private updateAlertUseCase: UpdateAlertUseCase;
  private getAllAlertsUseCase: GetAllAlertsUseCase;
  private bulkCreateAlertsUseCase: BulkCreateAlertsUseCase;
  private notifyReservationMembersUseCase: NotifyReservationMembersUseCase;

  constructor(
    private readonly alertRepository: AlertRepository,
    private readonly userRepository: UserRepository,
    private readonly reservationRepository: ReservationRepository
  ) {
    this.createAlertUseCase = new CreateAlertUseCase(alertRepository);
    this.deleteAlertUseCase = new DeleteAlertUseCase(alertRepository);
    this.updateAlertUseCase = new UpdateAlertUseCase(alertRepository);
    this.getAllAlertsUseCase = new GetAllAlertsUseCase(alertRepository);
    this.bulkCreateAlertsUseCase = new BulkCreateAlertsUseCase(alertRepository);
    this.notifyReservationMembersUseCase = new NotifyReservationMembersUseCase(alertRepository, userRepository, reservationRepository);
  }

  async createAlert(alertData: any, recipientType?: 'user' | 'phone') {
    return await this.createAlertUseCase.execute(alertData, recipientType);
  }

  async getAlertById(id: string): Promise<Alert | null> {
    const alertId = new AlertId(id);
    return await this.alertRepository.findById(alertId);
  }

  async getAllAlert() {
    return await this.getAllAlertsUseCase.execute();
  }

  async getAlertsBySenderId(senderId: string): Promise<Alert[]> {
    const senderIdObj = new UserId(senderId);
    return await this.alertRepository.findBySenderId(senderIdObj);
  }

  async getAlertsByRecipientId(recipientId: string): Promise<Alert[]> {
    const recipientIdObj = new AlertRecipientId(recipientId);
    return await this.alertRepository.findByRecipientId(recipientIdObj);
  }

  async updateAlert(updateData: any) {
    return await this.updateAlertUseCase.execute(updateData);
  }

  async deleteAlert(id: string): Promise<void> {
    return await this.deleteAlertUseCase.execute(id);
  }

  async createBulkAlerts(alertsData: any[]) {
    return await this.bulkCreateAlertsUseCase.execute(alertsData);
  }

  async notifyReservationMembers(data: {
    reservationId: string;
    members: any[];
    senderId: string;
    eventType: 'creation' | 'update' | 'reminder';
  }) {
    return await this.notifyReservationMembersUseCase.execute(data);
  }
}
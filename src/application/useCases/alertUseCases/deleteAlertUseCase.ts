import { AlertRepository } from '../../../Domain/repositories/alertRepositoryInterface';
import { AlertId } from '../../../Domain/entities/alert/alertId';

export class DeleteAlertUseCase {
  constructor(private readonly alertRepository: AlertRepository) {}

  async execute(id: string): Promise<void> {
    const alertId = new AlertId(id);
    const alert = await this.alertRepository.findById(alertId);
    
    if (!alert) {
      throw new Error('Alert not found');
    }

    await this.alertRepository.delete(alertId);
  }
}
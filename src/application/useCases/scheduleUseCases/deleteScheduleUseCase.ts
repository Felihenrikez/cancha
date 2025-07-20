import { ScheduleRepository } from '../../Domain/repositories/scheduleRepositoryInterface';
import { ScheduleId } from '../../Domain/entities/schedule/scheduleId';

export class DeleteScheduleUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(id: string): Promise<void> {
    const scheduleId = new ScheduleId(id);
    const schedule = await this.scheduleRepository.findById(scheduleId);
    
    if (!schedule) {
      throw new Error('Schedule not found');
    }

    await this.scheduleRepository.delete(scheduleId);
  }
}
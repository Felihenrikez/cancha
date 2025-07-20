import { ScheduleRepository } from '../../Domain/repositories/scheduleRepositoryInterface';

export interface GetAllSchedulesResponse {
  id: string;
  fieldId: string;
  clubId: string;
  fieldName: string;
  clubName: string;
  price: number;
  date: string;
  startHour: string;
  isAvailable: boolean;
}

export class GetAllSchedulesUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(): Promise<GetAllSchedulesResponse[]> {
    const schedules = await this.scheduleRepository.getAllSchedule();

    return schedules.map(schedule => ({
      id: schedule._id?.getValue() || '',
      fieldId: schedule.fieldId.getValue(),
      clubId: schedule.clubId.getValue(),
      fieldName: schedule.fieldName.getValue(),
      clubName: schedule.clubName.getValue(),
      price: schedule.price.getValue(),
      date: schedule.date.getValue(),
      startHour: schedule.startHour.getValue(),
      isAvailable: schedule.isAvailable.getValue()
    }));
  }
}
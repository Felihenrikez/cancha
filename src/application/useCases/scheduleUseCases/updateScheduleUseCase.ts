import { ScheduleRepository } from '../../Domain/repositories/scheduleRepositoryInterface';
import { Schedule } from '../../Domain/entities/schedule/schedule';
import { ScheduleId } from '../../Domain/entities/schedule/scheduleId';
import { ScheduleDate } from '../../Domain/entities/schedule/scheduleDate';
import { ScheduleStartHour } from '../../Domain/entities/schedule/scheduleStartHour';
import { SchedulePrice } from '../../Domain/entities/schedule/schedulePrice';
import { ScheduleIsAvailable } from '../../Domain/entities/schedule/scheduleIsAvailable';

export interface UpdateScheduleRequest {
  id: string;
  price?: number;
  date?: string;
  startHour?: string;
  isAvailable?: boolean;
}

export interface UpdateScheduleResponse {
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

export class UpdateScheduleUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(request: UpdateScheduleRequest): Promise<UpdateScheduleResponse> {
    const scheduleId = new ScheduleId(request.id);
    const existingSchedule = await this.scheduleRepository.findById(scheduleId);
    
    if (!existingSchedule) {
      throw new Error('Schedule not found');
    }

    const updatedSchedule = new Schedule(
      existingSchedule.fieldId,
      existingSchedule.clubId,
      existingSchedule.fieldName,
      existingSchedule.clubName,
      new SchedulePrice(request.price || existingSchedule.price.getValue()),
      new ScheduleDate(request.date || existingSchedule.date.getValue()),
      new ScheduleStartHour(request.startHour || existingSchedule.startHour.getValue()),
      new ScheduleIsAvailable(request.isAvailable !== undefined ? request.isAvailable : existingSchedule.isAvailable.getValue()),
      scheduleId
    );

    const result = await this.scheduleRepository.update(updatedSchedule);

    return {
      id: result._id?.getValue() || '',
      fieldId: result.fieldId.getValue(),
      clubId: result.clubId.getValue(),
      fieldName: result.fieldName.getValue(),
      clubName: result.clubName.getValue(),
      price: result.price.getValue(),
      date: result.date.getValue(),
      startHour: result.startHour.getValue(),
      isAvailable: result.isAvailable.getValue()
    };
  }
}
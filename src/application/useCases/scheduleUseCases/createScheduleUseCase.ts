import { ScheduleRepository } from '../../Domain/repositories/scheduleRepositoryInterface';
import { Schedule } from '../../Domain/entities/schedule/schedule';
import { ScheduleDate } from '../../Domain/entities/schedule/scheduleDate';
import { ScheduleStartHour } from '../../Domain/entities/schedule/scheduleStartHour';
import { SchedulePrice } from '../../Domain/entities/schedule/schedulePrice';
import { ScheduleIsAvailable } from '../../Domain/entities/schedule/scheduleIsAvailable';
import { FieldId } from '../../Domain/entities/field/fieldId';
import { ClubId } from '../../Domain/entities/club/clubId';
import { FieldName } from '../../Domain/entities/field/fieldName';
import { ClubName } from '../../Domain/entities/club/clubName';

export interface CreateScheduleRequest {
  fieldId: string;
  clubId: string;
  fieldName: string;
  clubName: string;
  price: number;
  date: string;
  startHour: string;
  isAvailable: boolean;
}

export interface CreateScheduleResponse {
  id?: string;
  fieldId: string;
  clubId: string;
  fieldName: string;
  clubName: string;
  price: number;
  date: string;
  startHour: string;
  isAvailable: boolean;
}

export class CreateScheduleUseCase {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(request: CreateScheduleRequest): Promise<CreateScheduleResponse> {
    const schedule = new Schedule(
      new FieldId(request.fieldId),
      new ClubId(request.clubId),
      new FieldName(request.fieldName),
      new ClubName(request.clubName),
      new SchedulePrice(request.price),
      new ScheduleDate(request.date),
      new ScheduleStartHour(request.startHour),
      new ScheduleIsAvailable(request.isAvailable)
    );

    const savedSchedule = await this.scheduleRepository.createSchedule(schedule);

    return {
      id: savedSchedule._id?.getValue(),
      fieldId: savedSchedule.fieldId.getValue(),
      clubId: savedSchedule.clubId.getValue(),
      fieldName: savedSchedule.fieldName.getValue(),
      clubName: savedSchedule.clubName.getValue(),
      price: savedSchedule.price.getValue(),
      date: savedSchedule.date.getValue(),
      startHour: savedSchedule.startHour.getValue(),
      isAvailable: savedSchedule.isAvailable.getValue()
    };
  }
}
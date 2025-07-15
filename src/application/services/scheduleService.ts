import { ScheduleRepository } from '../../Domain/repositories/scheduleRepositoryInterface';
import { Schedule } from '../../Domain/entities/schedule/schedule';
import { ScheduleId } from '../../Domain/entities/schedule/scheduleId';
import { ScheduleDate } from '../../Domain/entities/schedule/scheduleDate';
import { ScheduleStartHour } from '../../Domain/entities/schedule/scheduleStartHour';
import { SchedulePrice } from '../../Domain/entities/schedule/schedulePrice';
import { ScheduleIsAvailable } from '../../Domain/entities/schedule/scheduleIsAvailable';
import { FieldId } from '../../Domain/entities/field/fieldId';
import { ClubId } from '../../Domain/entities/club/clubId';
import { FieldName } from '../../Domain/entities/field/fieldName';
import { ClubName } from '../../Domain/entities/club/clubName';

export class ScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async createSchedule(scheduleData: {
    fieldId: string;
    clubId: string;
    fieldName: string;
    clubName: string;
    price: number;
    date: string;
    startHour: string;
    isAvailable: boolean;
  }): Promise<Schedule> {
    const schedule = new Schedule(
      new FieldId(scheduleData.fieldId),
      new ClubId(scheduleData.clubId),
      new FieldName(scheduleData.fieldName),
      new ClubName(scheduleData.clubName),
      new SchedulePrice(scheduleData.price),
      new ScheduleDate(scheduleData.date),
      new ScheduleStartHour(scheduleData.startHour),
      new ScheduleIsAvailable(scheduleData.isAvailable)
    );

    return await this.scheduleRepository.createSchedule(schedule);
  }

  async createBulkSchedules(schedulesData: {
    fieldId: string;
    clubId: string;
    fieldName: string;
    clubName: string;
    price: number;
    date: string;
    startHour: string;
    isAvailable: boolean;
  }[]): Promise<Schedule[]> {
    const schedules = schedulesData.map(scheduleData => new Schedule(
      new FieldId(scheduleData.fieldId),
      new ClubId(scheduleData.clubId),
      new FieldName(scheduleData.fieldName),
      new ClubName(scheduleData.clubName),
      new SchedulePrice(scheduleData.price),
      new ScheduleDate(scheduleData.date),
      new ScheduleStartHour(scheduleData.startHour),
      new ScheduleIsAvailable(scheduleData.isAvailable)
    ));

    const createdSchedules = [];
    for (const schedule of schedules) {
      const created = await this.scheduleRepository.createSchedule(schedule);
      createdSchedules.push(created);
    }

    return createdSchedules;
  }

  async getScheduleById(id: string): Promise<Schedule | null> {
    const scheduleId = new ScheduleId(id);
    return await this.scheduleRepository.findById(scheduleId);
  }

  async getAllSchedule(): Promise<Schedule[]> {
    return await this.scheduleRepository.getAllSchedule();
  }

  async getSchedulesByFieldId(fieldId: string): Promise<Schedule[]> {
    const fieldIdObj = new FieldId(fieldId);
    return await this.scheduleRepository.findByFieldId(fieldIdObj);
  }

  async getSchedulesByClubId(clubId: string): Promise<Schedule[]> {
    const clubIdObj = new ClubId(clubId);
    return await this.scheduleRepository.findByClubId(clubIdObj);
  }

  async updateSchedule(schedule: Schedule): Promise<Schedule> {
    return await this.scheduleRepository.update(schedule);
  }

  async deleteSchedule(id: string): Promise<void> {
    const scheduleId = new ScheduleId(id);
    return await this.scheduleRepository.delete(scheduleId);
  }
}
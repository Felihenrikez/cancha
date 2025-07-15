import { Schedule } from '../entities/schedule/schedule';
import { ScheduleId } from '../entities/schedule/scheduleId';
import { FieldId } from '../entities/field/fieldId';
import { ClubId } from '../entities/club/clubId';

export interface ScheduleRepository {
  createSchedule(schedule: Schedule): Promise<Schedule>;
  findById(id: ScheduleId): Promise<Schedule | null>;
  getAllSchedule(): Promise<Schedule[]>;
  findByFieldId(fieldId: FieldId): Promise<Schedule[]>;
  findByClubId(clubId: ClubId): Promise<Schedule[]>;
  update(schedule: Schedule): Promise<Schedule>;
  delete(id: ScheduleId): Promise<void>;
}
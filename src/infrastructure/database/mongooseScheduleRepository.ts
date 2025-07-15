import { ScheduleRepository } from '../../Domain/repositories/scheduleRepositoryInterface';
import { Schedule } from '../../Domain/entities/schedule/schedule';
import { ScheduleModel } from './models/scheduleModel';
import { ScheduleId } from '../../Domain/entities/schedule/scheduleId';
import { ScheduleDate } from '../../Domain/entities/schedule/scheduleDate';
import { ScheduleStartHour } from '../../Domain/entities/schedule/scheduleStartHour';
import { SchedulePrice } from '../../Domain/entities/schedule/schedulePrice';
import { ScheduleIsAvailable } from '../../Domain/entities/schedule/scheduleIsAvailable';
import { FieldId } from '../../Domain/entities/field/fieldId';
import { ClubId } from '../../Domain/entities/club/clubId';
import { FieldName } from '../../Domain/entities/field/fieldName';
import { ClubName } from '../../Domain/entities/club/clubName';

export class MongooseScheduleRepository implements ScheduleRepository {
  async createSchedule(schedule: Schedule): Promise<Schedule> {
    const data = {
      fieldId: schedule.fieldId.getValue(),
      clubId: schedule.clubId.getValue(),
      fieldName: schedule.fieldName.getValue(),
      clubName: schedule.clubName.getValue(),
      price: schedule.price.getValue(),
      date: schedule.date.getValue(),
      startHour: schedule.startHour.getValue(),
      isAvailable: schedule.isAvailable.getValue()
    };
    
    const created = await ScheduleModel.create(data);
    
    return new Schedule(
      schedule.fieldId,
      schedule.clubId,
      schedule.fieldName,
      schedule.clubName,
      schedule.price,
      schedule.date,
      schedule.startHour,
      schedule.isAvailable,
      new ScheduleId((created._id as any).toString())
    );
  }

  async findById(id: ScheduleId): Promise<Schedule | null> {
    const doc = await ScheduleModel.findById(id.getValue()).exec();
    if (!doc) return null;

    return new Schedule(
      new FieldId(doc.fieldId),
      new ClubId(doc.clubId),
      new FieldName(doc.fieldName),
      new ClubName(doc.clubName),
      new SchedulePrice(doc.price),
      new ScheduleDate(doc.date),
      new ScheduleStartHour(doc.startHour),
      new ScheduleIsAvailable(doc.isAvailable),
      new ScheduleId((doc._id as any).toString())
    );
  }

  async getAllSchedule(): Promise<Schedule[]> {
    const docs = await ScheduleModel.find().exec();
    return docs.map(doc => new Schedule(
      new FieldId(doc.fieldId),
      new ClubId(doc.clubId),
      new FieldName(doc.fieldName),
      new ClubName(doc.clubName),
      new SchedulePrice(doc.price),
      new ScheduleDate(doc.date),
      new ScheduleStartHour(doc.startHour),
      new ScheduleIsAvailable(doc.isAvailable),
      new ScheduleId((doc._id as any).toString())
    ));
  }

  async findByFieldId(fieldId: FieldId): Promise<Schedule[]> {
    const docs = await ScheduleModel.find({ fieldId: fieldId.getValue() }).exec();
    return docs.map(doc => new Schedule(
      new FieldId(doc.fieldId),
      new ClubId(doc.clubId),
      new FieldName(doc.fieldName),
      new ClubName(doc.clubName),
      new SchedulePrice(doc.price),
      new ScheduleDate(doc.date),
      new ScheduleStartHour(doc.startHour),
      new ScheduleIsAvailable(doc.isAvailable),
      new ScheduleId((doc._id as any).toString())
    ));
  }

  async findByClubId(clubId: ClubId): Promise<Schedule[]> {
    const docs = await ScheduleModel.find({ clubId: clubId.getValue() }).exec();
    return docs.map(doc => new Schedule(
      new FieldId(doc.fieldId),
      new ClubId(doc.clubId),
      new FieldName(doc.fieldName),
      new ClubName(doc.clubName),
      new SchedulePrice(doc.price),
      new ScheduleDate(doc.date),
      new ScheduleStartHour(doc.startHour),
      new ScheduleIsAvailable(doc.isAvailable),
      new ScheduleId((doc._id as any).toString())
    ));
  }

  async update(schedule: Schedule): Promise<Schedule> {
    if (!schedule._id) throw new Error('Schedule ID is required for update');

    const updated = await ScheduleModel.findByIdAndUpdate(
      schedule._id.getValue(),
      {
        fieldId: schedule.fieldId.getValue(),
        clubId: schedule.clubId.getValue(),
        fieldName: schedule.fieldName.getValue(),
        clubName: schedule.clubName.getValue(),
        price: schedule.price.getValue(),
        date: schedule.date.getValue(),
        startHour: schedule.startHour.getValue(),
        isAvailable: schedule.isAvailable.getValue()
      },
      { new: true }
    ).exec();

    if (!updated) throw new Error('Schedule not found');

    return new Schedule(
      new FieldId(updated.fieldId),
      new ClubId(updated.clubId),
      new FieldName(updated.fieldName),
      new ClubName(updated.clubName),
      new SchedulePrice(updated.price),
      new ScheduleDate(updated.date),
      new ScheduleStartHour(updated.startHour),
      new ScheduleIsAvailable(updated.isAvailable),
      new ScheduleId((updated._id as any).toString())
    );
  }

  async delete(id: ScheduleId): Promise<void> {
    const result = await ScheduleModel.findByIdAndDelete(id.getValue()).exec();
    if (!result) throw new Error('Schedule not found');
  }
}
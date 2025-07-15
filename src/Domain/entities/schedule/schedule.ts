import { ScheduleId } from './scheduleId';
import { ScheduleDate } from './scheduleDate';
import { ScheduleStartHour } from './scheduleStartHour';
import { SchedulePrice } from './schedulePrice';
import { ScheduleIsAvailable } from './scheduleIsAvailable';
import {FieldId} from "../field/fieldId";
import {FieldName} from "../field/fieldName";
import {ClubName} from "../club/clubName";
import {ClubId} from "../club/clubId";

export class Schedule {
  constructor(
    public fieldId: FieldId,
    public clubId: ClubId,
    public fieldName: FieldName,
    public clubName: ClubName,
    public price: SchedulePrice,
    public date: ScheduleDate,
    public startHour: ScheduleStartHour,
    public isAvailable: ScheduleIsAvailable,
    public readonly _id?: ScheduleId
  ) {}
}
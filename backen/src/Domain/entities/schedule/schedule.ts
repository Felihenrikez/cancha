import {ScheduleId} from "./scheduleId";
import {FieldId} from "../field/fieldId";
import {ScheduleDate} from "./scheduleDate";
import {ScheduleStartTime} from "./scheduleStartTime";
import {ScheduleEndTime} from "./scheduleEndTime";
import {ScheduleIsAvalable} from "./scheduleIsAvalable";

export class ISchedule {
  _id: ScheduleId;
  fieldId: FieldId;
  date: ScheduleDate;
  startTime: ScheduleStartTime;
  endTime: ScheduleEndTime;
  isAvailable: ScheduleIsAvalable;

  constructor(
      _id: ScheduleId,
      fieldId: FieldId,
      date: ScheduleDate,
      startTime: ScheduleStartTime,
      endTime: ScheduleEndTime,
      isAvailable: ScheduleIsAvalable
  ) {
    this._id = _id;
    this.fieldId = fieldId;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.isAvailable = isAvailable
  }
}

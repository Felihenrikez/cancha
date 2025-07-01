export interface ISchedule {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  pitchId: string;
}
export class Schedule{
  constructor(
    private readonly id: string,
    private readonly props: ISchedule
    ) {}
}

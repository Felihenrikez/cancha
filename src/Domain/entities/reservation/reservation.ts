import { ReservationId } from './reservationId';
import { ReservationState } from './reservationState';
import { ReservationDateReservation } from './reservationDateReservation';
import { ReservationStartHour } from './reservationStartHour';
import { ReservationPrice } from './reservationPrice';
import { ReservationPaymentType } from './reservationPaymentType';
import { ReservationMembersList } from './reservationMembersList';
import {ScheduleId} from "../schedule/scheduleId";
import {UserId} from "../user/userId";

export class Reservation {
  constructor(
    public scheduleId: ScheduleId,
    public userId: UserId,
    public state: ReservationState,
    public dateReservation: ReservationDateReservation,
    public startHour: ReservationStartHour,
    public price: ReservationPrice,
    public paymentType?: ReservationPaymentType,
    public membersList?: ReservationMembersList,
    public readonly _id?: ReservationId
  ) {}
}
import {ReservationId} from "./reservationId";
import {FieldId} from "../field/fieldId";
import {ReservationStartAt} from "./reservationStartAt";
import {ReservationPrice} from "./reservationPrice";
import {User} from "../user/user";

export class Reservation {
  _id : ReservationId;
  fieldId : FieldId;
  userList: User[];
  startAt: ReservationStartAt;
  price : ReservationPrice

  constructor(
   _id : ReservationId,
   fieldId : FieldId,
   userList : User[],
   startAt : ReservationStartAt,
   price : ReservationPrice
    ){
    this._id = _id;
    this.fieldId = fieldId;
    this.userList = userList;
    this.startAt = startAt;
    this.price = price
  }
}
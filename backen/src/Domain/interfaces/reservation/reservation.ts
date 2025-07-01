export interface IReservation{
  id: string;
  fieldId: string;
  userList: string[];
  startAt: Date;
  status: string;
  price: number;
}
export class Reservation {

  constructor(
    private readonly id: string,
    private readonly props: IReservation
    ) {}
}
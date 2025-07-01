export interface ITicket{
  id: string;
  price: number;
  userCachId: string;
  userSendId: string;
  reservationId: string;
  paymentMethod: 'efectivo' | 'tarjeta' | 'transferencia' | 'paypal';
  state: 'pendiente' | 'pagado' | 'fallido';
  date: Date;

}
export class Ticket {

  constructor(
    private readonly id: string,
    private readonly props: ITicket
    ) {}
}
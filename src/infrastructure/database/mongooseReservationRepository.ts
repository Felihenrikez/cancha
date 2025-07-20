import { ReservationRepository } from '../../Domain/repositories/reservationRepositoryInterface';
import { Reservation } from '../../Domain/entities/reservation/reservation';
import { ReservationModel } from './models/reservationModel';
import { ReservationId } from '../../Domain/entities/reservation/reservationId';
import { ReservationState } from '../../Domain/entities/reservation/reservationState';
import { ReservationDateReservation } from '../../Domain/entities/reservation/reservationDateReservation';
import { ReservationStartHour } from '../../Domain/entities/reservation/reservationStartHour';
import { ReservationPrice } from '../../Domain/entities/reservation/reservationPrice';
import { ReservationPaymentType } from '../../Domain/entities/reservation/reservationPaymentType';
import { ReservationMembersList, Member, MemberConfirmationStatus } from '../../Domain/entities/reservation/reservationMembersList';
import { ScheduleId } from '../../Domain/entities/schedule/scheduleId';
import { UserId } from '../../Domain/entities/user/userId';

export class MongooseReservationRepository implements ReservationRepository {
  async createReservation(reservation: Reservation): Promise<Reservation> {
    const data = {
      scheduleId: reservation.scheduleId.getValue(),
      userId: reservation.userId.getValue(),
      state: reservation.state.getValue(),
      dateReservation: reservation.dateReservation.getValue(),
      startHour: reservation.startHour.getValue(),
      price: reservation.price.getValue(),
      paymentType: reservation.paymentType?.getValue(),
      membersList: reservation.membersList?.getValue()
    };
    
    const created = await ReservationModel.create(data);
    
    return new Reservation(
      reservation.scheduleId,
      reservation.userId,
      reservation.state,
      reservation.dateReservation,
      reservation.startHour,
      reservation.price,
      reservation.paymentType,
      reservation.membersList,
      new ReservationId((created._id as any).toString())
    );
  }

  async findById(id: ReservationId): Promise<Reservation | null> {
    const doc = await ReservationModel.findById(id.getValue()).exec();
    if (!doc) return null;

    return new Reservation(
      new ScheduleId(doc.scheduleId),
      new UserId(doc.userId),
      new ReservationState(doc.state),
      new ReservationDateReservation(doc.dateReservation),
      new ReservationStartHour(doc.startHour),
      new ReservationPrice(doc.price),
      doc.paymentType ? new ReservationPaymentType(doc.paymentType) : undefined,
      doc.membersList ? new ReservationMembersList(this.convertMembersList(doc.membersList)) : undefined,
      new ReservationId((doc._id as any).toString())
    );
  }

  async getAllReservation(): Promise<Reservation[]> {
    const docs = await ReservationModel.find().exec();
    return docs.map(doc => new Reservation(
      new ScheduleId(doc.scheduleId),
      new UserId(doc.userId),
      new ReservationState(doc.state),
      new ReservationDateReservation(doc.dateReservation),
      new ReservationStartHour(doc.startHour),
      new ReservationPrice(doc.price),
      doc.paymentType ? new ReservationPaymentType(doc.paymentType) : undefined,
      doc.membersList ? new ReservationMembersList(this.convertMembersList(doc.membersList)) : undefined,
      new ReservationId((doc._id as any).toString())
    ));
  }

  async findByUserId(userId: UserId): Promise<Reservation[]> {
    const docs = await ReservationModel.find({ userId: userId.getValue() }).exec();
    return docs.map(doc => new Reservation(
      new ScheduleId(doc.scheduleId),
      new UserId(doc.userId),
      new ReservationState(doc.state),
      new ReservationDateReservation(doc.dateReservation),
      new ReservationStartHour(doc.startHour),
      new ReservationPrice(doc.price),
      doc.paymentType ? new ReservationPaymentType(doc.paymentType) : undefined,
      doc.membersList ? new ReservationMembersList(this.convertMembersList(doc.membersList)) : undefined,
      new ReservationId((doc._id as any).toString())
    ));
  }

  async findByScheduleId(scheduleId: ScheduleId): Promise<Reservation[]> {
    const docs = await ReservationModel.find({ scheduleId: scheduleId.getValue() }).exec();
    return docs.map(doc => new Reservation(
      new ScheduleId(doc.scheduleId),
      new UserId(doc.userId),
      new ReservationState(doc.state),
      new ReservationDateReservation(doc.dateReservation),
      new ReservationStartHour(doc.startHour),
      new ReservationPrice(doc.price),
      doc.paymentType ? new ReservationPaymentType(doc.paymentType) : undefined,
      doc.membersList ? new ReservationMembersList(this.convertMembersList(doc.membersList)) : undefined,
      new ReservationId((doc._id as any).toString())
    ));
  }

  async update(reservation: Reservation): Promise<Reservation> {
    if (!reservation._id) throw new Error('Reservation ID is required for update');

    const updated = await ReservationModel.findByIdAndUpdate(
      reservation._id.getValue(),
      {
        scheduleId: reservation.scheduleId.getValue(),
        userId: reservation.userId.getValue(),
        state: reservation.state.getValue(),
        dateReservation: reservation.dateReservation.getValue(),
        startHour: reservation.startHour.getValue(),
        price: reservation.price.getValue(),
        paymentType: reservation.paymentType?.getValue(),
        membersList: reservation.membersList?.getValue()
      },
      { new: true }
    ).exec();

    if (!updated) throw new Error('Reservation not found');

    return new Reservation(
      new ScheduleId(updated.scheduleId),
      new UserId(updated.userId),
      new ReservationState(updated.state),
      new ReservationDateReservation(updated.dateReservation),
      new ReservationStartHour(updated.startHour),
      new ReservationPrice(updated.price),
      updated.paymentType ? new ReservationPaymentType(updated.paymentType) : undefined,
      updated.membersList ? new ReservationMembersList(this.convertMembersList(updated.membersList)) : undefined,
      new ReservationId((updated._id as any).toString())
    );
  }

  async delete(id: ReservationId): Promise<void> {
    const result = await ReservationModel.findByIdAndDelete(id.getValue()).exec();
    if (!result) throw new Error('Reservation not found');
  }

  // Método auxiliar para convertir el tipo de confirmation
  private convertMembersList(membersList: any[]): Member[] {
    return membersList.map(member => ({
      name: member.name,
      number: member.number,
      confirmation: this.convertConfirmation(member.confirmation)
    }));
  }

  private convertConfirmation(confirmation: any): MemberConfirmationStatus {
    if (typeof confirmation === 'string') {
      if (['pending', 'confirmed', 'rejected'].includes(confirmation)) {
        return confirmation as MemberConfirmationStatus;
      }
    }
    
    // Si es boolean o cualquier otro valor, convertir a string
    if (confirmation === true) {
      return 'confirmed';
    }
    
    return 'pending';
  }
}
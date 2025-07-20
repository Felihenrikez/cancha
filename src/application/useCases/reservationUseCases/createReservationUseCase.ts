import { ReservationRepository } from '../../../Domain/repositories/reservationRepositoryInterface';
import { ScheduleRepository } from '../../../Domain/repositories/scheduleRepositoryInterface';
import { Reservation } from '../../../Domain/entities/reservation/reservation';
import { ReservationState } from '../../../Domain/entities/reservation/reservationState';
import { ReservationDateReservation } from '../../../Domain/entities/reservation/reservationDateReservation';
import { ReservationStartHour } from '../../../Domain/entities/reservation/reservationStartHour';
import { ReservationPrice } from '../../../Domain/entities/reservation/reservationPrice';
import { ReservationPaymentType } from '../../../Domain/entities/reservation/reservationPaymentType';
import { ReservationMembersList, Member } from '../../../Domain/entities/reservation/reservationMembersList';
import { ScheduleId } from '../../../Domain/entities/schedule/scheduleId';
import { ScheduleIsAvailable } from '../../../Domain/entities/schedule/scheduleIsAvailable';
import { UserId } from '../../../Domain/entities/user/userId';

export interface CreateReservationRequest {
  scheduleId: string;
  userId: string;
  state: 'pendiente' | 'confirmada' | 'cancelada';
  dateReservation: string;
  startHour: string;
  price: number;
  paymentType?: string;
  membersList?: Member[];
}

export interface CreateReservationResponse {
  id?: string;
  scheduleId: string;
  userId: string;
  state: 'pendiente' | 'confirmada' | 'cancelada';
  dateReservation: string;
  startHour: string;
  price: number;
  paymentType?: string;
  membersList?: Member[];
}

export class CreateReservationUseCase {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly scheduleRepository: ScheduleRepository
  ) {}

  async execute(request: CreateReservationRequest): Promise<CreateReservationResponse> {
    // 1. Verificar si el horario existe y está disponible
    const scheduleId = new ScheduleId(request.scheduleId);
    const schedule = await this.scheduleRepository.findById(scheduleId);
    
    if (!schedule) {
      throw new Error('Schedule not found');
    }
    
    if (!schedule.isAvailable.getValue()) {
      throw new Error('Schedule is not available');
    }
    
    // 2. Actualizar el horario a no disponible
    schedule.isAvailable = new ScheduleIsAvailable(false);
    await this.scheduleRepository.update(schedule);
    
    // 3. Crear la reservación
    const reservation = new Reservation(
      scheduleId,
      new UserId(request.userId),
      new ReservationState(request.state),
      new ReservationDateReservation(request.dateReservation),
      new ReservationStartHour(request.startHour),
      new ReservationPrice(request.price),
      request.paymentType ? new ReservationPaymentType(request.paymentType) : undefined,
      request.membersList ? new ReservationMembersList(request.membersList) : undefined
    );

    const savedReservation = await this.reservationRepository.createReservation(reservation);

    return {
      id: savedReservation._id?.getValue(),
      scheduleId: savedReservation.scheduleId.getValue(),
      userId: savedReservation.userId.getValue(),
      state: savedReservation.state.getValue(),
      dateReservation: savedReservation.dateReservation.getValue(),
      startHour: savedReservation.startHour.getValue(),
      price: savedReservation.price.getValue(),
      paymentType: savedReservation.paymentType?.getValue(),
      membersList: savedReservation.membersList?.getValue()
    };
  }
}
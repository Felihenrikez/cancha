import { CreateReservationUseCase } from '../useCases/reservationUseCases/createReservationUseCase';
import { DeleteReservationUseCase } from '../useCases/reservationUseCases/deleteReservationUseCase';
import { UpdateReservationUseCase } from '../useCases/reservationUseCases/updateReservationUseCase';
import { GetAllReservationsUseCase } from '../useCases/reservationUseCases/getAllReservationsUseCase';
import { BulkCreateReservationsUseCase } from '../useCases/reservationUseCases/bulkCreateReservationsUseCase';
import { ReservationRepository } from '../../Domain/repositories/reservationRepositoryInterface';
import { ScheduleRepository } from '../../Domain/repositories/scheduleRepositoryInterface';
import { AlertRepository } from '../../Domain/repositories/alertRepositoryInterface';
import { UserRepository } from '../../Domain/repositories/userRepositoryInterface';
import { Reservation } from '../../Domain/entities/reservation/reservation';
import { ReservationId } from '../../Domain/entities/reservation/reservationId';
import { UserId } from '../../Domain/entities/user/userId';
import { ScheduleId } from '../../Domain/entities/schedule/scheduleId';

export class ReservationService {
  private createReservationUseCase: CreateReservationUseCase;
  private deleteReservationUseCase: DeleteReservationUseCase;
  private updateReservationUseCase: UpdateReservationUseCase;
  private getAllReservationsUseCase: GetAllReservationsUseCase;
  private bulkCreateReservationsUseCase: BulkCreateReservationsUseCase;

  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly scheduleRepository: ScheduleRepository,
    private readonly alertRepository: AlertRepository,
    private readonly userRepository: UserRepository
  ) {
    this.createReservationUseCase = new CreateReservationUseCase(reservationRepository, scheduleRepository);
    this.deleteReservationUseCase = new DeleteReservationUseCase(reservationRepository);
    this.updateReservationUseCase = new UpdateReservationUseCase(reservationRepository, alertRepository, userRepository);
    this.getAllReservationsUseCase = new GetAllReservationsUseCase(reservationRepository);
    this.bulkCreateReservationsUseCase = new BulkCreateReservationsUseCase(reservationRepository);
  }

  async createReservation(reservationData: any) {
    return await this.createReservationUseCase.execute(reservationData);
  }

  async getReservationById(id: string): Promise<Reservation | null> {
    const reservationId = new ReservationId(id);
    return await this.reservationRepository.findById(reservationId);
  }

  async getAllReservation() {
    return await this.getAllReservationsUseCase.execute();
  }

  async getReservationsByUserId(userId: string): Promise<Reservation[]> {
    const userIdObj = new UserId(userId);
    return await this.reservationRepository.findByUserId(userIdObj);
  }

  async getReservationsByScheduleId(scheduleId: string): Promise<Reservation[]> {
    const scheduleIdObj = new ScheduleId(scheduleId);
    return await this.reservationRepository.findByScheduleId(scheduleIdObj);
  }

  async updateReservation(updateData: any) {
    return await this.updateReservationUseCase.execute(updateData);
  }

  async deleteReservation(id: string): Promise<void> {
    return await this.deleteReservationUseCase.execute(id);
  }

  async createBulkReservations(reservationsData: any[]) {
    return await this.bulkCreateReservationsUseCase.execute(reservationsData);
  }
}
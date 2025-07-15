import { UserRepository } from '../../Domain/repositories/userRepositoryInterface';
import { ClubRepository } from '../../Domain/repositories/clubRepositoryInterface';
import { FieldRepository } from '../../Domain/repositories/fieldRepositoryInterface';
import { ScheduleRepository } from '../../Domain/repositories/scheduleRepositoryInterface';
import { ReservationRepository } from '../../Domain/repositories/reservationRepositoryInterface';

import { MongooseUserRepository } from '../database/mongooseUserRepository';
import { MongooseClubRepository } from '../database/mongooseClubRepository';
import { MongooseFieldRepository } from '../database/mongooseFieldRepository';
import { MongooseScheduleRepository } from '../database/mongooseScheduleRepository';
import { MongooseReservationRepository } from '../database/mongooseReservationRepository';

import { UserService } from '../../application/services/userService';
import { ClubService } from '../../application/services/clubService';
import { FieldService } from '../../application/services/fieldService';
import { ScheduleService } from '../../application/services/scheduleService';
import { ReservationService } from '../../application/services/reservationService';
import { AuthService } from '../../application/services/authService';

export class Container {
  private static instance: Container;
  private userRepository: UserRepository;
  private clubRepository: ClubRepository;
  private fieldRepository: FieldRepository;
  private scheduleRepository: ScheduleRepository;
  private reservationRepository: ReservationRepository;
  
  private userService: UserService;
  private clubService: ClubService;
  private fieldService: FieldService;
  private scheduleService: ScheduleService;
  private reservationService: ReservationService;
  private authService: AuthService;

  private constructor() {
    // Inicializar repositorios
    this.userRepository = new MongooseUserRepository();
    this.clubRepository = new MongooseClubRepository();
    this.fieldRepository = new MongooseFieldRepository();
    this.scheduleRepository = new MongooseScheduleRepository();
    this.reservationRepository = new MongooseReservationRepository();
    
    // Inicializar servicios
    this.userService = new UserService(this.userRepository);
    this.clubService = new ClubService(this.clubRepository);
    this.fieldService = new FieldService(this.fieldRepository, this.clubRepository);
    this.scheduleService = new ScheduleService(this.scheduleRepository);
    this.reservationService = new ReservationService(this.reservationRepository);
    this.authService = new AuthService(this.userRepository);
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  public getUserService(): UserService {
    return this.userService;
  }

  public getClubService(): ClubService {
    return this.clubService;
  }

  public getFieldService(): FieldService {
    return this.fieldService;
  }

  public getScheduleService(): ScheduleService {
    return this.scheduleService;
  }

  public getReservationService(): ReservationService {
    return this.reservationService;
  }

  public getAuthService(): AuthService {
    return this.authService;
  }
} 
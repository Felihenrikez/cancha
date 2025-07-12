import { UserRepository } from '../../Domain/repositories/userRepositoryInterface';
import { MongooseUserRepository } from '../database/mongooseUserRepository';
import { UserService } from '../../application/services/userService';

// Contenedor de dependencias simple
export class Container {
  private static instance: Container;
  private userRepository: UserRepository;
  private userService: UserService;

  private constructor() {
    // Inicializar dependencias
    this.userRepository = new MongooseUserRepository();
    this.userService = new UserService(this.userRepository);
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

  public getUserRepository(): UserRepository {
    return this.userRepository;
  }
} 
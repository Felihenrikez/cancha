import { UserRepository } from '../../Domain/repositories/userRepositoryInterface';
import { User } from '../../Domain/entities/user/user';
import { UserName } from '../../Domain/entities/user/UserName';
import { UserEmail } from '../../Domain/entities/user/userEmail';
import { UserPhone } from '../../Domain/entities/user/userPhone';
import { UserPassword } from '../../Domain/entities/user/userPassword';
import { UserBirthDate } from '../../Domain/entities/user/userBirthDate';
import { UserCreateDate } from '../../Domain/entities/user/userCreateDate';
import { UserRol } from '../../Domain/entities/user/userRol';

export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string;
  role: string;
}

export interface CreateUserResponse {
  id?: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  createDate: string;
  role: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    // Validar que el email no exista
    const userEmail = new UserEmail(request.email);
    const existingUser = await this.userRepository.findByEmail(userEmail);
    if (existingUser) {
      throw new Error('User with that email already exists');
    }

    // Crear la entidad de usuario
    const user = new User(
      new UserName(request.name),
      userEmail,
      new UserPhone(request.phone),
      new UserPassword(request.password),
      new UserBirthDate(request.birthDate),
      new UserCreateDate(new Date()),
      new UserRol(request.role)
    );

    // Guardar en el repositorio
    const savedUser = await this.userRepository.createUser(user);

    // Retornar respuesta
    return {
      id: savedUser._id?.getValue(),
      name: savedUser.name.getValue(),
      email: savedUser.email.getValue(),
      phone: savedUser.phone.getValue(),
      birthDate: savedUser.birthDate.getValue().toISOString(),
      createDate: savedUser.createDate.getValue().toISOString(),
      role: savedUser.role.getValue()
    };
  }
} 
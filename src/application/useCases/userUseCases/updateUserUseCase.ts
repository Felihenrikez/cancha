import { UserRepository } from '../../Domain/repositories/userRepositoryInterface';
import { User } from '../../Domain/entities/user/user';
import { UserId } from '../../Domain/entities/user/userId';
import { UserName } from '../../Domain/entities/user/UserName';
import { UserEmail } from '../../Domain/entities/user/userEmail';
import { UserPhone } from '../../Domain/entities/user/userPhone';
import { UserPassword } from '../../Domain/entities/user/userPassword';
import { UserBirthDate } from '../../Domain/entities/user/userBirthDate';
import { UserRol } from '../../Domain/entities/user/userRol';

export interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  birthDate?: string;
  role?: string;
}

export interface UpdateUserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  createDate: string;
  role: string;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const userId = new UserId(request.id);
    const existingUser = await this.userRepository.findById(userId);
    
    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedUser = new User(
      new UserName(request.name || existingUser.name.getValue()),
      new UserEmail(request.email || existingUser.email.getValue()),
      new UserPhone(request.phone || existingUser.phone.getValue()),
      new UserPassword(request.password || existingUser.password.getValue()),
      new UserBirthDate(request.birthDate || existingUser.birthDate.getValue()),
      existingUser.createDate,
      new UserRol(request.role || existingUser.role.getValue()),
      userId
    );

    const result = await this.userRepository.update(updatedUser);

    return {
      id: result._id?.getValue() || '',
      name: result.name.getValue(),
      email: result.email.getValue(),
      phone: result.phone.getValue(),
      birthDate: result.birthDate.getValue(),
      createDate: result.createDate.getValue().toISOString(),
      role: result.role.getValue()
    };
  }
}
import bcrypt from 'bcrypt';
import { UserRepository } from '../../Domain/repositories/userRepositoryInterface';
import { User } from '../../Domain/entities/user/user';
import { UserName } from '../../Domain/entities/user/UserName';
import { UserEmail } from '../../Domain/entities/user/userEmail';
import { UserPhone } from '../../Domain/entities/user/userPhone';
import { UserPassword } from '../../Domain/entities/user/userPassword';
import { UserBirthDate } from '../../Domain/entities/user/userBirthDate';
import { UserCreateDate } from '../../Domain/entities/user/userCreateDate';
import { UserRol } from '../../Domain/entities/user/userRol';

export interface BulkCreateUsersRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  birthDate: string;
  role: string;
}

export interface BulkCreateUsersResponse {
  message: string;
  users: {
    id: string;
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    createDate: string;
    role: string;
  }[];
}

export class BulkCreateUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(requests: BulkCreateUsersRequest[]): Promise<BulkCreateUsersResponse> {
    const createdUsers = [];

    for (const request of requests) {
      const userEmail = new UserEmail(request.email);
      const existingUser = await this.userRepository.findByEmail(userEmail);
      
      if (existingUser) {
        throw new Error(`User with email ${request.email} already exists`);
      }

      const hashedPassword = await bcrypt.hash(request.password, 10);

      const user = new User(
        new UserName(request.name),
        userEmail,
        new UserPhone(request.phone),
        new UserPassword(hashedPassword),
        new UserBirthDate(request.birthDate),
        new UserCreateDate(new Date()),
        new UserRol(request.role)
      );

      const savedUser = await this.userRepository.createUser(user);
      createdUsers.push({
        id: savedUser._id?.getValue() || '',
        name: savedUser.name.getValue(),
        email: savedUser.email.getValue(),
        phone: savedUser.phone.getValue(),
        birthDate: savedUser.birthDate.getValue(),
        createDate: savedUser.createDate.getValue().toISOString(),
        role: savedUser.role.getValue()
      });
    }

    return {
      message: `${createdUsers.length} users created successfully`,
      users: createdUsers
    };
  }
}
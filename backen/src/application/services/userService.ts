import { UserRepository } from '../../domain/repositories/userRepositoryInterface';
import { User } from '../../domain/entities/user/user';
import { UserName} from "../../domain/entities/user/userName";
import {  UserPhone } from "../../domain/entities/user/userPhone";
import { UserPassword } from "../../domain/entities/user/userPassword";
import { UserBirthDate } from "../../domain/entities/user/userBirthDate";
import { UserCreateDate } from "../../domain/entities/user/userCreateDate";
import { UserRol } from "../../domain/entities/user/userRol";
import { UserEmail } from '../../domain/entities/user/userEmail';
import { UserId } from '../../domain/entities/user/userId';


export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    birthDate: string;
    role: string;
  }): Promise<User> {

    const userEmail = new UserEmail(userData.email);
    const existingUser = await this.userRepository.findByEmail(userEmail);
    if (existingUser) {
      throw new Error('User with that email already exists');
    }

    const user = new User(
      new UserName(userData.name),
      userEmail,
      new UserPhone(userData.phone),
      new UserPassword(userData.password),
      new UserBirthDate(userData.birthDate),
      new UserCreateDate(new Date()),
      new UserRol(userData.role)
    );

    return await this.userRepository.createUser(user);
  }


  async getUserById(id: string): Promise<User | null> {
    const userId = new UserId(id);
    return await this.userRepository.findById(userId);
  }

  async getAllUser(): Promise<User[]> {
    return await this.userRepository.getAllUser();
  }

  async updateUser(user: User): Promise<User> {
    return await this.userRepository.update(user);
  }

  async deleteUser(id: string): Promise<void> {
    const userId = new UserId(id);
    return await this.userRepository.delete(userId);
  }
}
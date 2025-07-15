import bcrypt from 'bcrypt';
import { UserRepository } from '../../Domain/repositories/userRepositoryInterface';
import { User } from '../../Domain/entities/user/user';
import { UserName} from "../../Domain/entities/user/UserName";
import {  UserPhone } from "../../Domain/entities/user/userPhone";
import { UserPassword } from "../../Domain/entities/user/userPassword";
import { UserBirthDate } from "../../Domain/entities/user/userBirthDate";
import { UserCreateDate } from "../../Domain/entities/user/userCreateDate";
import { UserRol } from "../../Domain/entities/user/userRol";
import { UserEmail } from '../../Domain/entities/user/userEmail';
import { UserId } from '../../Domain/entities/user/userId';


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

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User(
      new UserName(userData.name),
      userEmail,
      new UserPhone(userData.phone),
      new UserPassword(hashedPassword),
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
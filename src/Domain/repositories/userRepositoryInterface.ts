import { User } from '../entities/user/user';
import {UserId} from "../entities/user/userId";
import {UserEmail} from "../entities/user/userEmail";

export interface UserRepository {
  createUser(user: User): Promise<User>;
  findByPhone(phone: string): Promise<User | null>;
  findById(id: UserId): Promise<User | null>;
  getAllUser():Promise<User[]>;
  findByEmail(email: UserEmail): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: UserId): Promise<void>;
}
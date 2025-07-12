// src/infrastructure/database/mongoose.user.repository.ts
import {UserRepository} from '../../domain/repositories/userRepositoryInterface';
import {User} from '../../domain/entities/user/user';
import {UserModel} from 'models/userModel';
import {UserId} from '../../domain/entities/user/userId';
import {UserName} from '../../domain/entities/user/userName';
import {UserEmail} from '../../domain/entities/user/userEmail';
import {UserPhone} from '../../domain/entities/user/userPhone';
import {UserPassword} from '../../domain/entities/user/userPassword';
import {UserBirthDate} from '../../domain/entities/user/userBirthDate';
import {UserCreateDate} from '../../domain/entities/user/userCreateDate';
import {UserRol} from '../../domain/entities/user/userRol';

export class MongooseUserRepository implements UserRepository {
  async createUser(user: User): Promise<User> {
    const data = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      birthDate: user.birthDate,
      createDate: user.createDate,
      role: user.role
    };
    await UserModel.create(data);
    return user;
  }

  async findById(id: UserId): Promise<User | null> {
    const doc = await UserModel.findById(id).exec();
    if (!doc) return null;

    return new User(
      new UserName(doc.name),
      new UserEmail(doc.email),
      new UserPhone(doc.phone),
      new UserPassword(doc.password),
      new UserBirthDate(doc.birthDate),
      new UserCreateDate(doc.createDate),
      new UserRol(doc.role)
    );
  }

  async getAllUser(): Promise<User[]> {
    return await UserModel.find().exec()
  }
  async findByEmail(email: UserEmail): Promise<User | null> {
    const doc = await UserModel.findOne({ email }).exec();
    if (!doc) return null;

    return new User(
      new UserName(doc.name),
      new UserEmail(doc.email),
      new UserPhone(doc.phone),
      new UserPassword(doc.password),
      new UserBirthDate(doc.birthDate),
      new UserCreateDate(doc.createDate),
      new UserRol(doc.role)
    );
  }

  async update(user: User): Promise<User> {
    const updated = await UserModel.findByIdAndUpdate(
      user._id,
      {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
        birthDate: user.birthDate,
        role: user.role
      },
      { new: true }
    ).exec();

    if (!updated) throw new Error('User not found');

    return new User(

      new UserName(updated.name),
      new UserEmail(updated.email),
      new UserPhone(updated.phone),
      new UserPassword(updated.password),
      new UserBirthDate(updated.birthDate),
      new UserCreateDate(updated.createDate),
      new UserRol(updated.role)
    );
  }

  async delete(id: UserId): Promise<void> {
    await UserModel.findByIdAndDelete(id).exec();
  }
}
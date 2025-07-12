// src/infrastructure/database/mongoose.user.repository.ts
import { UserRepository } from '../../Domain/repositories/userRepositoryInterface';
import { User } from '../../Domain/entities/user/user';
import { UserModel } from './models/userModel';
import { UserId } from '../../Domain/entities/user/userId';
import { UserName } from '../../Domain/entities/user/UserName';
import { UserEmail } from '../../Domain/entities/user/userEmail';
import { UserPhone } from '../../Domain/entities/user/userPhone';
import { UserPassword } from '../../Domain/entities/user/userPassword';
import { UserBirthDate } from '../../Domain/entities/user/userBirthDate';
import { UserCreateDate } from '../../Domain/entities/user/userCreateDate';
import { UserRol } from '../../Domain/entities/user/userRol';

export class MongooseUserRepository implements UserRepository {
  async createUser(user: User): Promise<User> {
    const data = {
      name: user.name.getValue(),
      email: user.email.getValue(),
      phone: user.phone.getValue(),
      password: user.password.getValue(),
      birthDate: user.birthDate.getValue(),
      createDate: user.createDate.getValue(),
      role: user.role.getValue()
    };
    
    const createdUser = await UserModel.create(data);
    
    return new User(
      user.name,
      user.email,
      user.phone,
      user.password,
      user.birthDate,
      user.createDate,
      user.role,
      new UserId((createdUser._id as any).toString())
    );
  }

  async findById(id: UserId): Promise<User | null> {
    const doc = await UserModel.findById(id.getValue()).exec();
    if (!doc) return null;

    return new User(
      new UserName(doc.name),
      new UserEmail(doc.email),
      new UserPhone(doc.phone),
      new UserPassword(doc.password),
      new UserBirthDate(doc.birthDate),
      new UserCreateDate(new Date(doc.createDate)),
      new UserRol(doc.role),
      new UserId((doc._id as any).toString())
    );
  }

  async getAllUser(): Promise<User[]> {
    const docs = await UserModel.find().exec();

    return docs.map(doc =>
      new User(
        new UserName(doc.name),
        new UserEmail(doc.email),
        new UserPhone(doc.phone),
        new UserPassword(doc.password),
        new UserBirthDate(doc.birthDate),
        new UserCreateDate(new Date(doc.createDate)),
        new UserRol(doc.role),
        new UserId((doc._id as any).toString())
      )
    );
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    const doc = await UserModel.findOne({ email: email.getValue() }).exec();
    if (!doc) return null;

    return new User(
      new UserName(doc.name),
      new UserEmail(doc.email),
      new UserPhone(doc.phone),
      new UserPassword(doc.password),
      new UserBirthDate(doc.birthDate),
      new UserCreateDate(new Date(doc.createDate)),
      new UserRol(doc.role),
      new UserId((doc._id as any).toString())
    );
  }

  async update(user: User): Promise<User> {
    if (!user._id) {
      throw new Error('User ID is required for update');
    }

    const updated = await UserModel.findByIdAndUpdate(
      user._id.getValue(),
      {
        name: user.name.getValue(),
        email: user.email.getValue(),
        phone: user.phone.getValue(),
        password: user.password.getValue(),
        birthDate: user.birthDate.getValue(),
        role: user.role.getValue()
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
      new UserCreateDate(new Date(updated.createDate)),
      new UserRol(updated.role),
      new UserId((updated._id as any).toString())
    );
  }

  async delete(id: UserId): Promise<void> {
    const result = await UserModel.findByIdAndDelete(id.getValue()).exec();
    if (!result) {
      throw new Error('User not found');
    }
  }
}
import { UserId } from './userId';
import { UserName } from './UserName';
import { UserEmail } from './userEmail';
import { UserPhone } from './userPhone';
import { UserPassword } from './userPassword';
import { UserBirthDate } from './userBirthDate';
import { UserCreateDate } from './userCreateDate';
import { UserRol } from './userRol';

export class User {
  constructor(
    public name: UserName,
    public email: UserEmail,
    public phone: UserPhone,
    public password: UserPassword,
    public birthDate: UserBirthDate,
    public createDate: UserCreateDate,
    public role: UserRol,
    public readonly _id?: UserId
  ) {}
}

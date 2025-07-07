import {UserEmail} from "./userEmail";
import {UserName} from "./UserName";
import {UserId} from "./userId";
import {UserPhone} from "./userPhone";
import {UserPassword} from "./userPassword";
import {UserBirthDate} from "./userBirthDate";
import {UserCreateDate} from "./userCreateDate";
import {UserRol} from "./userRol";

export  class User {
  _id: UserId;
  name: UserName;
  email: UserEmail;
  phone: UserPhone;
  password: UserPassword;
  birthDate: UserBirthDate;
  createDate: UserCreateDate;
  role: UserRol;
  clubId: string;

  constructor(
    _id: UserId,
    name: UserName,
    email: UserEmail,
    phone: UserPhone,
    password: UserPassword,
    birthDate: UserBirthDate,
    createDate: UserCreateDate,
    role: UserRol,
    clubId: string
  ) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.birthDate = birthDate;
    this.createDate = createDate;
    this.role = role;
    this.clubId = clubId
  }
}
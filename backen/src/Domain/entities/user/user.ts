export interface IUser {
  id: string;
  email: string;
  phone: string;
  rol: string;
}
export  class User{
  constructor(
    private readonly id: string,
    private readonly props: IUser
  ){}
}
import { UserRepository } from '../../Domain/repositories/userRepositoryInterface';

export interface GetAllUsersResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  createDate: string;
  role: string;
}

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<GetAllUsersResponse[]> {
    const users = await this.userRepository.getAllUser();

    return users.map(user => ({
      id: user._id?.getValue() || '',
      name: user.name.getValue(),
      email: user.email.getValue(),
      phone: user.phone.getValue(),
      birthDate: user.birthDate.getValue(),
      createDate: user.createDate.getValue().toISOString(),
      role: user.role.getValue()
    }));
  }
}
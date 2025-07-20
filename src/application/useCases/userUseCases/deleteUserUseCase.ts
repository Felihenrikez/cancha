import { UserRepository } from '../../Domain/repositories/userRepositoryInterface';
import { UserId } from '../../Domain/entities/user/userId';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const userId = new UserId(id);
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(userId);
  }
}
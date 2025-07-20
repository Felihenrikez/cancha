import { ClubRepository } from '../../Domain/repositories/clubRepositoryInterface';
import { ClubId } from '../../Domain/entities/club/clubId';

export class DeleteClubUseCase {
  constructor(private readonly clubRepository: ClubRepository) {}

  async execute(id: string): Promise<void> {
    const clubId = new ClubId(id);
    const club = await this.clubRepository.findById(clubId);
    
    if (!club) {
      throw new Error('Club not found');
    }

    await this.clubRepository.delete(clubId);
  }
}
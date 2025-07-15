import { ClubRepository } from '../../Domain/repositories/clubRepositoryInterface';
import { Club } from '../../Domain/entities/club/club';
import { ClubId } from '../../Domain/entities/club/clubId';
import { ClubName } from '../../Domain/entities/club/clubName';
import { ClubAddress } from '../../Domain/entities/club/clubAddress';
import { ClubPhone } from '../../Domain/entities/club/clubPhone';
import { ClubDescription } from '../../Domain/entities/club/clubDescription';
import { ClubImageUrl } from '../../Domain/entities/club/clubImageUrl';
import { UserId } from '../../Domain/entities/user/userId';
import { FieldId } from '../../Domain/entities/field/fieldId';

export class ClubService {
  constructor(private readonly clubRepository: ClubRepository) {}

  async createClub(clubData: {
    userId: string;
    name: string;
    address: string;
    phone: string;
    fieldId?: string[];
    description?: string;
    imageUrl?: string;
  }): Promise<Club> {
    const club = new Club(
      new UserId(clubData.userId),
      new ClubName(clubData.name),
      new ClubAddress(clubData.address),
      new ClubPhone(clubData.phone),
      clubData.fieldId?.map(id => new FieldId(id)),
      clubData.description ? new ClubDescription(clubData.description) : undefined,
      clubData.imageUrl ? new ClubImageUrl(clubData.imageUrl) : undefined
    );

    return await this.clubRepository.createClub(club);
  }

  async getClubById(id: string): Promise<Club | null> {
    const clubId = new ClubId(id);
    return await this.clubRepository.findById(clubId);
  }

  async getAllClub(): Promise<Club[]> {
    return await this.clubRepository.getAllClub();
  }

  async getClubsByUserId(userId: string): Promise<Club[]> {
    const userIdObj = new UserId(userId);
    return await this.clubRepository.findByUserId(userIdObj);
  }

  async updateClub(club: Club): Promise<Club> {
    return await this.clubRepository.update(club);
  }

  async deleteClub(id: string): Promise<void> {
    const clubId = new ClubId(id);
    return await this.clubRepository.delete(clubId);
  }
}
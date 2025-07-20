import { ClubRepository } from '../../Domain/repositories/clubRepositoryInterface';

export interface GetAllClubsResponse {
  id: string;
  userId: string;
  name: string;
  address: string;
  phone: string;
  fieldId?: string[];
  description?: string;
  imageUrl?: string;
}

export class GetAllClubsUseCase {
  constructor(private readonly clubRepository: ClubRepository) {}

  async execute(): Promise<GetAllClubsResponse[]> {
    const clubs = await this.clubRepository.getAllClub();

    return clubs.map(club => ({
      id: club._id?.getValue() || '',
      userId: club.userId.getValue(),
      name: club.name.getValue(),
      address: club.address.getValue(),
      phone: club.phone.getValue(),
      fieldId: club.fieldId?.map(id => id.getValue()),
      description: club.description?.getValue(),
      imageUrl: club.imageUrl?.getValue()
    }));
  }
}
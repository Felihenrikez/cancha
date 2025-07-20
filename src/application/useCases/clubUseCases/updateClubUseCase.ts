import { ClubRepository } from '../../Domain/repositories/clubRepositoryInterface';
import { Club } from '../../Domain/entities/club/club';
import { ClubId } from '../../Domain/entities/club/clubId';
import { ClubName } from '../../Domain/entities/club/clubName';
import { ClubAddress } from '../../Domain/entities/club/clubAddress';
import { ClubPhone } from '../../Domain/entities/club/clubPhone';
import { ClubDescription } from '../../Domain/entities/club/clubDescription';
import { ClubImageUrl } from '../../Domain/entities/club/clubImageUrl';
import { FieldId } from '../../Domain/entities/field/fieldId';

export interface UpdateClubRequest {
  id: string;
  name?: string;
  address?: string;
  phone?: string;
  fieldId?: string[];
  description?: string;
  imageUrl?: string;
}

export interface UpdateClubResponse {
  id: string;
  userId: string;
  name: string;
  address: string;
  phone: string;
  fieldId?: string[];
  description?: string;
  imageUrl?: string;
}

export class UpdateClubUseCase {
  constructor(private readonly clubRepository: ClubRepository) {}

  async execute(request: UpdateClubRequest): Promise<UpdateClubResponse> {
    const clubId = new ClubId(request.id);
    const existingClub = await this.clubRepository.findById(clubId);
    
    if (!existingClub) {
      throw new Error('Club not found');
    }

    const updatedClub = new Club(
      existingClub.userId,
      new ClubName(request.name || existingClub.name.getValue()),
      new ClubAddress(request.address || existingClub.address.getValue()),
      new ClubPhone(request.phone || existingClub.phone.getValue()),
      request.fieldId?.map(id => new FieldId(id)) || existingClub.fieldId,
      request.description ? new ClubDescription(request.description) : existingClub.description,
      request.imageUrl ? new ClubImageUrl(request.imageUrl) : existingClub.imageUrl,
      clubId
    );

    const result = await this.clubRepository.update(updatedClub);

    return {
      id: result._id?.getValue() || '',
      userId: result.userId.getValue(),
      name: result.name.getValue(),
      address: result.address.getValue(),
      phone: result.phone.getValue(),
      fieldId: result.fieldId?.map(id => id.getValue()),
      description: result.description?.getValue(),
      imageUrl: result.imageUrl?.getValue()
    };
  }
}
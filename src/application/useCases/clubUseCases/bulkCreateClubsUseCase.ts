import { ClubRepository } from '../../Domain/repositories/clubRepositoryInterface';
import { Club } from '../../Domain/entities/club/club';
import { ClubName } from '../../Domain/entities/club/clubName';
import { ClubAddress } from '../../Domain/entities/club/clubAddress';
import { ClubPhone } from '../../Domain/entities/club/clubPhone';
import { ClubDescription } from '../../Domain/entities/club/clubDescription';
import { ClubImageUrl } from '../../Domain/entities/club/clubImageUrl';
import { UserId } from '../../Domain/entities/user/userId';
import { FieldId } from '../../Domain/entities/field/fieldId';

export interface BulkCreateClubsRequest {
  userId: string;
  name: string;
  address: string;
  phone: string;
  fieldId?: string[];
  description?: string;
  imageUrl?: string;
}

export interface BulkCreateClubsResponse {
  message: string;
  clubs: {
    id: string;
    userId: string;
    name: string;
    address: string;
    phone: string;
    fieldId?: string[];
    description?: string;
    imageUrl?: string;
  }[];
}

export class BulkCreateClubsUseCase {
  constructor(private readonly clubRepository: ClubRepository) {}

  async execute(requests: BulkCreateClubsRequest[]): Promise<BulkCreateClubsResponse> {
    const createdClubs = [];

    for (const request of requests) {
      const club = new Club(
        new UserId(request.userId),
        new ClubName(request.name),
        new ClubAddress(request.address),
        new ClubPhone(request.phone),
        request.fieldId?.map(id => new FieldId(id)),
        request.description ? new ClubDescription(request.description) : undefined,
        request.imageUrl ? new ClubImageUrl(request.imageUrl) : undefined
      );

      const savedClub = await this.clubRepository.createClub(club);
      createdClubs.push({
        id: savedClub._id?.getValue() || '',
        userId: savedClub.userId.getValue(),
        name: savedClub.name.getValue(),
        address: savedClub.address.getValue(),
        phone: savedClub.phone.getValue(),
        fieldId: savedClub.fieldId?.map(id => id.getValue()),
        description: savedClub.description?.getValue(),
        imageUrl: savedClub.imageUrl?.getValue()
      });
    }

    return {
      message: `${createdClubs.length} clubs created successfully`,
      clubs: createdClubs
    };
  }
}
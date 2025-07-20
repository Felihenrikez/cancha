import { FieldRepository } from '../../Domain/repositories/fieldRepositoryInterface';
import { ClubRepository } from '../../Domain/repositories/clubRepositoryInterface';
import { Field } from '../../Domain/entities/field/field';
import { Club } from '../../Domain/entities/club/club';
import { FieldName } from '../../Domain/entities/field/fieldName';
import { FieldSportType } from '../../Domain/entities/field/fieldSportType';
import { FieldDescription } from '../../Domain/entities/field/fieldDescription';
import { FieldIsAvailable } from '../../Domain/entities/field/fieldIsAvailable';
import { FieldImageUrl } from '../../Domain/entities/field/fieldImageUrl';
import { ClubId } from '../../Domain/entities/club/clubId';

export interface BulkCreateFieldsRequest {
  clubId: string;
  name: string;
  sportType: string;
  isAvailable: boolean;
  imageUrl?: string;
  description?: string;
}

export interface BulkCreateFieldsResponse {
  message: string;
  fields: {
    id: string;
    clubId: string;
    name: string;
    sportType: string;
    isAvailable: boolean;
    imageUrl?: string;
    description?: string;
  }[];
}

export class BulkCreateFieldsUseCase {
  constructor(
    private readonly fieldRepository: FieldRepository,
    private readonly clubRepository: ClubRepository
  ) {}

  async execute(requests: BulkCreateFieldsRequest[]): Promise<BulkCreateFieldsResponse> {
    const createdFields = [];

    for (const request of requests) {
      const field = new Field(
        new ClubId(request.clubId),
        new FieldName(request.name),
        new FieldSportType(request.sportType),
        new FieldIsAvailable(request.isAvailable),
        request.description ? new FieldDescription(request.description) : undefined,
        request.imageUrl ? new FieldImageUrl(request.imageUrl) : undefined
      );

      const createdField = await this.fieldRepository.createField(field);

      // Actualizar el club agregando el fieldId
      const clubId = new ClubId(request.clubId);
      const club = await this.clubRepository.findById(clubId);
      
      if (club && createdField._id) {
        const currentFieldIds = club.fieldId || [];
        const updatedFieldIds = [...currentFieldIds, createdField._id];
        
        const updatedClub = new Club(
          club.userId,
          club.name,
          club.address,
          club.phone,
          updatedFieldIds,
          club.description,
          club.imageUrl,
          club._id
        );
        
        await this.clubRepository.update(updatedClub);
      }

      createdFields.push({
        id: createdField._id?.getValue() || '',
        clubId: createdField.clubId.getValue(),
        name: createdField.name.getValue(),
        sportType: createdField.sportType.getValue(),
        isAvailable: createdField.isAvailable.getValue(),
        imageUrl: createdField.imageUrl?.getValue(),
        description: createdField.description?.getValue()
      });
    }

    return {
      message: `${createdFields.length} fields created successfully`,
      fields: createdFields
    };
  }
}
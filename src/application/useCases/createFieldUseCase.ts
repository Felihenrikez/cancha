import { FieldRepository } from '../../Domain/repositories/fieldRepositoryInterface';
import { Field } from '../../Domain/entities/field/field';
import { FieldName } from '../../Domain/entities/field/fieldName';
import { FieldSportType } from '../../Domain/entities/field/fieldSportType';
import { FieldDescription } from '../../Domain/entities/field/fieldDescription';
import { FieldIsAvailable } from '../../Domain/entities/field/fieldIsAvailable';
import { FieldImageUrl } from '../../Domain/entities/field/fieldImageUrl';
import { ClubId } from '../../Domain/entities/club/clubId';

export interface CreateFieldRequest {
  clubId: string;
  name: string;
  sportType: string;
  isAvailable: boolean;
  imageUrl?: string;
  description?: string;
}

export interface CreateFieldResponse {
  id?: string;
  clubId: string;
  name: string;
  sportType: string;
  isAvailable: boolean;
  imageUrl?: string;
  description?: string;
}

export class CreateFieldUseCase {
  constructor(private readonly fieldRepository: FieldRepository) {}

  async execute(request: CreateFieldRequest): Promise<CreateFieldResponse> {
    const field = new Field(
      new ClubId(request.clubId),
      new FieldName(request.name),
      new FieldSportType(request.sportType),
      new FieldIsAvailable(request.isAvailable),
      request.description ? new FieldDescription(request.description) : undefined,
      request.imageUrl ? new FieldImageUrl(request.imageUrl) : undefined
    );

    const savedField = await this.fieldRepository.createField(field);

    return {
      id: savedField._id?.getValue(),
      clubId: savedField.clubId.getValue(),
      name: savedField.name.getValue(),
      sportType: savedField.sportType.getValue(),
      isAvailable: savedField.isAvailable.getValue(),
      imageUrl: savedField.imageUrl?.getValue(),
      description: savedField.description?.getValue()
    };
  }
}
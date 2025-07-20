import { FieldRepository } from '../../Domain/repositories/fieldRepositoryInterface';
import { Field } from '../../Domain/entities/field/field';
import { FieldId } from '../../Domain/entities/field/fieldId';
import { FieldName } from '../../Domain/entities/field/fieldName';
import { FieldSportType } from '../../Domain/entities/field/fieldSportType';
import { FieldDescription } from '../../Domain/entities/field/fieldDescription';
import { FieldIsAvailable } from '../../Domain/entities/field/fieldIsAvailable';
import { FieldImageUrl } from '../../Domain/entities/field/fieldImageUrl';

export interface UpdateFieldRequest {
  id: string;
  name?: string;
  sportType?: string;
  isAvailable?: boolean;
  imageUrl?: string;
  description?: string;
}

export interface UpdateFieldResponse {
  id: string;
  clubId: string;
  name: string;
  sportType: string;
  isAvailable: boolean;
  imageUrl?: string;
  description?: string;
}

export class UpdateFieldUseCase {
  constructor(private readonly fieldRepository: FieldRepository) {}

  async execute(request: UpdateFieldRequest): Promise<UpdateFieldResponse> {
    const fieldId = new FieldId(request.id);
    const existingField = await this.fieldRepository.findById(fieldId);
    
    if (!existingField) {
      throw new Error('Field not found');
    }

    const updatedField = new Field(
      existingField.clubId,
      new FieldName(request.name || existingField.name.getValue()),
      new FieldSportType(request.sportType || existingField.sportType.getValue()),
      new FieldIsAvailable(request.isAvailable !== undefined ? request.isAvailable : existingField.isAvailable.getValue()),
      request.description ? new FieldDescription(request.description) : existingField.description,
      request.imageUrl ? new FieldImageUrl(request.imageUrl) : existingField.imageUrl,
      fieldId
    );

    const result = await this.fieldRepository.update(updatedField);

    return {
      id: result._id?.getValue() || '',
      clubId: result.clubId.getValue(),
      name: result.name.getValue(),
      sportType: result.sportType.getValue(),
      isAvailable: result.isAvailable.getValue(),
      imageUrl: result.imageUrl?.getValue(),
      description: result.description?.getValue()
    };
  }
}
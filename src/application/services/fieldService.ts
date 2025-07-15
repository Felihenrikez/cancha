import { FieldRepository } from '../../Domain/repositories/fieldRepositoryInterface';
import { ClubRepository } from '../../Domain/repositories/clubRepositoryInterface';
import { Field } from '../../Domain/entities/field/field';
import { Club } from '../../Domain/entities/club/club';
import { FieldId } from '../../Domain/entities/field/fieldId';
import { FieldName } from '../../Domain/entities/field/fieldName';
import { FieldSportType } from '../../Domain/entities/field/fieldSportType';
import { FieldDescription } from '../../Domain/entities/field/fieldDescription';
import { FieldIsAvailable } from '../../Domain/entities/field/fieldIsAvailable';
import { FieldImageUrl } from '../../Domain/entities/field/fieldImageUrl';
import { ClubId } from '../../Domain/entities/club/clubId';

export class FieldService {
  constructor(
    private readonly fieldRepository: FieldRepository,
    private readonly clubRepository: ClubRepository
  ) {}

  async createField(fieldData: {
    clubId: string;
    name: string;
    sportType: string;
    isAvailable: boolean;
    imageUrl?: string;
    description?: string;
  }): Promise<Field> {
    const field = new Field(
      new ClubId(fieldData.clubId),
      new FieldName(fieldData.name),
      new FieldSportType(fieldData.sportType),
      new FieldIsAvailable(fieldData.isAvailable),
      fieldData.description ? new FieldDescription(fieldData.description) : undefined,
      fieldData.imageUrl ? new FieldImageUrl(fieldData.imageUrl) : undefined
    );

    const createdField = await this.fieldRepository.createField(field);

    // Actualizar el club agregando el fieldId
    const clubId = new ClubId(fieldData.clubId);
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

    return createdField;
  }

  async getFieldById(id: string): Promise<Field | null> {
    const fieldId = new FieldId(id);
    return await this.fieldRepository.findById(fieldId);
  }

  async getAllField(): Promise<Field[]> {
    return await this.fieldRepository.getAllField();
  }

  async getFieldsByClubId(clubId: string): Promise<Field[]> {
    const clubIdObj = new ClubId(clubId);
    return await this.fieldRepository.findByClubId(clubIdObj);
  }

  async updateField(field: Field): Promise<Field> {
    return await this.fieldRepository.update(field);
  }

  async deleteField(id: string): Promise<void> {
    const fieldId = new FieldId(id);
    return await this.fieldRepository.delete(fieldId);
  }
}
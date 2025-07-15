import { Field } from '../entities/field/field';
import { FieldId } from '../entities/field/fieldId';
import { ClubId } from '../entities/club/clubId';

export interface FieldRepository {
  createField(field: Field): Promise<Field>;
  findById(id: FieldId): Promise<Field | null>;
  getAllField(): Promise<Field[]>;
  findByClubId(clubId: ClubId): Promise<Field[]>;
  update(field: Field): Promise<Field>;
  delete(id: FieldId): Promise<void>;
}
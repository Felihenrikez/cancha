import { Field } from '../../entities/field/field';
import { FieldId } from '../../entities/field/fieldId';

export interface FieldRepository {
    create(field: Field): Promise<Field>;
    findById(id: FieldId): Promise<Field | null>;
    findByClubId(clubId: string): Promise<Field[]>;
    update(field: Field): Promise<Field>;
    delete(id: FieldId): Promise<void>;
}
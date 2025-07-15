import { FieldRepository } from '../../Domain/repositories/fieldRepositoryInterface';
import { Field } from '../../Domain/entities/field/field';
import { FieldModel } from './models/fieldModel';
import { FieldId } from '../../Domain/entities/field/fieldId';
import { FieldName } from '../../Domain/entities/field/fieldName';
import { FieldSportType } from '../../Domain/entities/field/fieldSportType';
import { FieldDescription } from '../../Domain/entities/field/fieldDescription';
import { FieldIsAvailable } from '../../Domain/entities/field/fieldIsAvailable';
import { FieldImageUrl } from '../../Domain/entities/field/fieldImageUrl';
import { ClubId } from '../../Domain/entities/club/clubId';

export class MongooseFieldRepository implements FieldRepository {
  async createField(field: Field): Promise<Field> {
    const data = {
      clubId: field.clubId.getValue(),
      name: field.name.getValue(),
      sportType: field.sportType.getValue(),
      isAvailable: field.isAvailable.getValue(),
      imageUrl: field.imageUrl?.getValue(),
      description: field.description?.getValue()
    };
    
    const created = await FieldModel.create(data);
    
    return new Field(
      field.clubId,
      field.name,
      field.sportType,
      field.isAvailable,
      field.description,
      field.imageUrl,
      new FieldId((created._id as any).toString())
    );
  }

  async findById(id: FieldId): Promise<Field | null> {
    const doc = await FieldModel.findById(id.getValue()).exec();
    if (!doc) return null;

    return new Field(
      new ClubId(doc.clubId),
      new FieldName(doc.name),
      new FieldSportType(doc.sportType),
      new FieldIsAvailable(doc.isAvailable),
      doc.description ? new FieldDescription(doc.description) : undefined,
      doc.imageUrl ? new FieldImageUrl(doc.imageUrl) : undefined,
      new FieldId((doc._id as any).toString())
    );
  }

  async getAllField(): Promise<Field[]> {
    const docs = await FieldModel.find().exec();
    return docs.map(doc => new Field(
      new ClubId(doc.clubId),
      new FieldName(doc.name),
      new FieldSportType(doc.sportType),
      new FieldIsAvailable(doc.isAvailable),
      doc.description ? new FieldDescription(doc.description) : undefined,
      doc.imageUrl ? new FieldImageUrl(doc.imageUrl) : undefined,
      new FieldId((doc._id as any).toString())
    ));
  }

  async findByClubId(clubId: ClubId): Promise<Field[]> {
    const docs = await FieldModel.find({ clubId: clubId.getValue() }).exec();
    return docs.map(doc => new Field(
      new ClubId(doc.clubId),
      new FieldName(doc.name),
      new FieldSportType(doc.sportType),
      new FieldIsAvailable(doc.isAvailable),
      doc.description ? new FieldDescription(doc.description) : undefined,
      doc.imageUrl ? new FieldImageUrl(doc.imageUrl) : undefined,
      new FieldId((doc._id as any).toString())
    ));
  }

  async update(field: Field): Promise<Field> {
    if (!field._id) throw new Error('Field ID is required for update');

    const updated = await FieldModel.findByIdAndUpdate(
      field._id.getValue(),
      {
        clubId: field.clubId.getValue(),
        name: field.name.getValue(),
        sportType: field.sportType.getValue(),
        isAvailable: field.isAvailable.getValue(),
        imageUrl: field.imageUrl?.getValue(),
        description: field.description?.getValue()
      },
      { new: true }
    ).exec();

    if (!updated) throw new Error('Field not found');

    return new Field(
      new ClubId(updated.clubId),
      new FieldName(updated.name),
      new FieldSportType(updated.sportType),
      new FieldIsAvailable(updated.isAvailable),
      updated.description ? new FieldDescription(updated.description) : undefined,
      updated.imageUrl ? new FieldImageUrl(updated.imageUrl) : undefined,
      new FieldId((updated._id as any).toString())
    );
  }

  async delete(id: FieldId): Promise<void> {
    const result = await FieldModel.findByIdAndDelete(id.getValue()).exec();
    if (!result) throw new Error('Field not found');
  }
}
import { ClubRepository } from '../../Domain/repositories/clubRepositoryInterface';
import { Club } from '../../Domain/entities/club/club';
import { ClubModel } from './models/clubModel';
import { ClubId } from '../../Domain/entities/club/clubId';
import { ClubName } from '../../Domain/entities/club/clubName';
import { ClubAddress } from '../../Domain/entities/club/clubAddress';
import { ClubPhone } from '../../Domain/entities/club/clubPhone';
import { ClubDescription } from '../../Domain/entities/club/clubDescription';
import { ClubImageUrl } from '../../Domain/entities/club/clubImageUrl';
import { UserId } from '../../Domain/entities/user/userId';
import { FieldId } from '../../Domain/entities/field/fieldId';

export class MongooseClubRepository implements ClubRepository {
  async createClub(club: Club): Promise<Club> {
    const data = {
      userId: club.userId.getValue(),
      name: club.name.getValue(),
      address: club.address.getValue(),
      phone: club.phone.getValue(),
      fieldId: club.fieldId?.map(id => id.getValue()),
      description: club.description?.getValue(),
      imageUrl: club.imageUrl?.getValue()
    };
    
    const created = await ClubModel.create(data);
    
    return new Club(
      club.userId,
      club.name,
      club.address,
      club.phone,
      club.fieldId,
      club.description,
      club.imageUrl,
      new ClubId((created._id as any).toString())
    );
  }

  async findById(id: ClubId): Promise<Club | null> {
    const doc = await ClubModel.findById(id.getValue()).exec();
    if (!doc) return null;

    return new Club(
      new UserId(doc.userId),
      new ClubName(doc.name),
      new ClubAddress(doc.address),
      new ClubPhone(doc.phone),
      doc.fieldId?.map(id => new FieldId(id)),
      doc.description ? new ClubDescription(doc.description) : undefined,
      doc.imageUrl ? new ClubImageUrl(doc.imageUrl) : undefined,
      new ClubId((doc._id as any).toString())
    );
  }

  async getAllClub(): Promise<Club[]> {
    const docs = await ClubModel.find().exec();
    return docs.map(doc => new Club(
      new UserId(doc.userId),
      new ClubName(doc.name),
      new ClubAddress(doc.address),
      new ClubPhone(doc.phone),
      doc.fieldId?.map(id => new FieldId(id)),
      doc.description ? new ClubDescription(doc.description) : undefined,
      doc.imageUrl ? new ClubImageUrl(doc.imageUrl) : undefined,
      new ClubId((doc._id as any).toString())
    ));
  }

  async findByUserId(userId: UserId): Promise<Club[]> {
    const docs = await ClubModel.find({ userId: userId.getValue() }).exec();
    return docs.map(doc => new Club(
      new UserId(doc.userId),
      new ClubName(doc.name),
      new ClubAddress(doc.address),
      new ClubPhone(doc.phone),
      doc.fieldId?.map(id => new FieldId(id)),
      doc.description ? new ClubDescription(doc.description) : undefined,
      doc.imageUrl ? new ClubImageUrl(doc.imageUrl) : undefined,
      new ClubId((doc._id as any).toString())
    ));
  }

  async update(club: Club): Promise<Club> {
    if (!club._id) throw new Error('Club ID is required for update');

    const updated = await ClubModel.findByIdAndUpdate(
      club._id.getValue(),
      {
        userId: club.userId.getValue(),
        name: club.name.getValue(),
        address: club.address.getValue(),
        phone: club.phone.getValue(),
        fieldId: club.fieldId?.map(id => id.getValue()),
        description: club.description?.getValue(),
        imageUrl: club.imageUrl?.getValue()
      },
      { new: true }
    ).exec();

    if (!updated) throw new Error('Club not found');

    return new Club(
      new UserId(updated.userId),
      new ClubName(updated.name),
      new ClubAddress(updated.address),
      new ClubPhone(updated.phone),
      updated.fieldId?.map(id => new FieldId(id)),
      updated.description ? new ClubDescription(updated.description) : undefined,
      updated.imageUrl ? new ClubImageUrl(updated.imageUrl) : undefined,
      new ClubId((updated._id as any).toString())
    );
  }

  async delete(id: ClubId): Promise<void> {
    const result = await ClubModel.findByIdAndDelete(id.getValue()).exec();
    if (!result) throw new Error('Club not found');
  }
}
import { FieldRepository } from '../../Domain/repositories/fieldRepositoryInterface';

export interface GetAllFieldsResponse {
  id: string;
  clubId: string;
  name: string;
  sportType: string;
  isAvailable: boolean;
  imageUrl?: string;
  description?: string;
}

export class GetAllFieldsUseCase {
  constructor(private readonly fieldRepository: FieldRepository) {}

  async execute(): Promise<GetAllFieldsResponse[]> {
    const fields = await this.fieldRepository.getAllField();

    return fields.map(field => ({
      id: field._id?.getValue() || '',
      clubId: field.clubId.getValue(),
      name: field.name.getValue(),
      sportType: field.sportType.getValue(),
      isAvailable: field.isAvailable.getValue(),
      imageUrl: field.imageUrl?.getValue(),
      description: field.description?.getValue()
    }));
  }
}
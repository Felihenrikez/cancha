import { FieldRepository } from '../../Domain/repositories/fieldRepositoryInterface';
import { FieldId } from '../../Domain/entities/field/fieldId';

export class DeleteFieldUseCase {
  constructor(private readonly fieldRepository: FieldRepository) {}

  async execute(id: string): Promise<void> {
    const fieldId = new FieldId(id);
    const field = await this.fieldRepository.findById(fieldId);
    
    if (!field) {
      throw new Error('Field not found');
    }

    await this.fieldRepository.delete(fieldId);
  }
}
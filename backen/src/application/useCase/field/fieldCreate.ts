import { FieldRepository } from "../../../Domain/ports/field/fieldRepository";
import { Field } from "../../../Domain/entities/field/field";

export class CreateField {
    constructor(private readonly fieldRepo: FieldRepository) {}

    async execute(field: Field): Promise<Field> {
        return this.fieldRepo.create(field);
    }
}
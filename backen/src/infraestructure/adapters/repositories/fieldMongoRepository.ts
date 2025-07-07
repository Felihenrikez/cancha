import { FieldRepository } from "../../../Domain/ports/field/fieldRepository";
import { Field } from "../../../Domain/entities/field/field";
import { FieldId} from "../../../Domain/entities/field/fieldId";
import { FieldModel } from "../../models/field/FieldModel";
import {Types} from "mongoose";

export class FieldMongoRepository implements FieldRepository {
    async create(field: Field): Promise<Field> {
        const newField = await FieldModel.create(field);
        return newField.toObject();
    }

    async findById(id: FieldId): Promise<Field | null> {
        const idStr = id.value;  // Accedes al string interno
        if (!Types.ObjectId.isValid(idStr)) return null;
        return FieldModel.findById(idStr).lean().exec();
    }

    async findByClubId(clubId: string): Promise<Field[]> {
        return FieldModel.find({ clubId }).lean().exec(); // Asume que Field tiene un campo `clubId`
    }

    async update(field: Field): Promise<Field> {
        if (!field.id) throw new Error("ID de field no proporcionado");
        const updated = await FieldModel.findByIdAndUpdate(
            field.id,
            { $set: field },
            { new: true }
        ).lean().exec();
        if (!updated) throw new Error("Field no encontrada");
        return updated;
    }

    async delete(id: FieldId): Promise<void> {
        const idStr = id.value;
        if (!Types.ObjectId.isValid(idStr)) throw new Error("ID inválido");
        const result = await FieldModel.findByIdAndDelete(idStr).exec();
        if (!result) throw new Error("Field no encontrada");
    }
}

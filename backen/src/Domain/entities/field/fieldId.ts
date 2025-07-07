// En tu clase FieldId (fieldId.ts)
import { Types } from "mongoose";

export class FieldId {
    value: string;

    constructor(value: string | Types.ObjectId) {
        this.value = value.toString(); // Acepta string u ObjectId
    }

    // Método para convertir a ObjectId cuando lo necesites
    toObjectId(): Types.ObjectId {
        return new Types.ObjectId(this.value);
    }
}

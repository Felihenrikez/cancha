import {ClubId} from "../club/clubId";
import {FieldName} from "./fieldName";
import {FieldSportType} from "./fieldSportType";
import {FieldDescription} from "./fieldDescription";
import {FieldIsAvailable} from "./fieldIsAvailable";
import {FieldImageUrl} from "./fieldImageUrl";
import {FieldId} from "./fieldId";

export class Field {

  constructor(
    public clubId: ClubId,
    public name: FieldName,
    public sportType: FieldSportType,
    public isAvailable: FieldIsAvailable,
    public description?: FieldDescription,
    public imageUrl?: FieldImageUrl,
    public readonly _id?: FieldId
  ) {
  }
}
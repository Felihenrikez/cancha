import {FieldId} from "./fieldId";
import {ClubId} from "../club/clubId";
import {FieldName} from "./fieldName";
import {FieldSportType} from "./fieldSportType";
import {FieldDescription} from "./fieldDescription";
import {FieldImage} from "./fieldImage";

export interface Field {
  id? : FieldId;
  clubId : ClubId;
  name : FieldName;
  sportType : FieldSportType;
  description : FieldDescription;
  image : FieldImage;
  createdAt : String;
}

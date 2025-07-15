import { UserId } from "../user/userId";
import { FieldId } from "../field/fieldId";
import { ClubId } from "./clubId";
import { ClubAddress } from "./clubAddress";
import { ClubName } from "./clubName";
import { ClubDescription } from "./clubDescription";
import { ClubPhone } from "./clubPhone";
import { ClubImageUrl } from "./clubImageUrl";

export class Club  {

  constructor(
    public userId: UserId,
    public name: ClubName,
    public address: ClubAddress,
    public phone: ClubPhone,
    public fieldId?: FieldId[],
    public description?: ClubDescription,
    public imageUrl?: ClubImageUrl,
    public readonly _id?: ClubId

  ) {}
}

import {ClubId} from "./clubId";
import {ClubName} from "./clubName";
import {ClubAddress} from "./clubAddress";
import {ClubPhone} from "./clubPhone";
import {ClubEmail} from "./clubEmail";

export interface IClub {
  id?: ClubId;
  name: ClubName;
  address: ClubAddress;
  phone: ClubPhone;
  email: ClubEmail;
}
export class Club{
  constructor(
    public  readonly id: string,
    public  readonly props: IClub
    ){}
}

import { ClubId } from "./clubId";
import { ClubName } from "./clubName";
import { ClubAddress } from "./clubAddress";
import { ClubPhone } from "./clubPhone";
import { ClubEmail } from "./clubEmail";
import { ClubDescription } from "./clubDescription";
import { ClubImage } from "./clubImage";

export class Club {
  _id: ClubId;
  name: ClubName;
  address: ClubAddress;
  phone: ClubPhone;
  email: ClubEmail;
  description: ClubDescription;
  image: ClubImage;

  constructor(
      _id : ClubId,
      name : ClubName,
      address : ClubAddress,
      phone : ClubPhone,
      email: ClubEmail,
      description: ClubDescription,
      image: ClubImage
    ){
    this._id = _id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.description = description;
    this.image = image
  }
}
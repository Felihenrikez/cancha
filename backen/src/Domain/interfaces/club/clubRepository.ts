import {Club} from "../../entities/club/club";
import {ClubId} from "../../entities/club/clubId";

export interface ClubRepository{
  create(club: Club) : Promise<void>;
  getAll(): Promise<Club[]>;
  getOnlyOne(id: ClubId): Promise<Club | null>;
  update(club: Club):Promise<void>;
  delete(id: ClubId): Promise<void>
}
import { Club } from '../entities/club/club';
import { ClubId } from '../entities/club/clubId';
import { UserId } from '../entities/user/userId';

export interface ClubRepository {
  createClub(club: Club): Promise<Club>;
  findById(id: ClubId): Promise<Club | null>;
  getAllClub(): Promise<Club[]>;
  findByUserId(userId: UserId): Promise<Club[]>;
  update(club: Club): Promise<Club>;
  delete(id: ClubId): Promise<void>;
}
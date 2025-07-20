export type MemberConfirmationStatus = 'pending' | 'confirmed' | 'rejected';

export interface Member {
  name: string;
  number: string;
  confirmation: MemberConfirmationStatus;
}

export class ReservationMembersList {
  constructor(private readonly value: Member[]) {
    this.validate();
  }

  private validate(): void {
    if (!Array.isArray(this.value)) {
      throw new Error('Members list must be an array');
    }

    for (const member of this.value) {
      if (!member.name || !member.number || !member.confirmation) {
        throw new Error('Each member must have name, number and confirmation');
      }
      if (typeof member.name !== 'string' || typeof member.number !== 'string') {
        throw new Error('Member name and number must be strings');
      }
      if (typeof member.confirmation !== 'string' || 
          !['pending', 'confirmed', 'rejected'].includes(member.confirmation)) {
        throw new Error('Member confirmation must be "pending", "confirmed", or "rejected"');
      }
    }
  }

  getValue(): Member[] {
    return this.value;
  }
}
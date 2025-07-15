export class ClubId {
  constructor(private readonly value: string) {
    if (!value || typeof value !== 'string') {
      throw new Error('Invalid user ID');
    }
  }

  getValue(): string {
    return this.value;
  }
}

export class ClubAddress {
  constructor(private readonly value: string) {
    if (!value || value.trim().length < 2) {
      throw new Error('Address must be at least 10 characters');
    }
  }

  getValue(): string {
    return this.value;
  }
}

export class ClubDescription {
  constructor(private readonly value: string) {
    if (!value || value.trim().length < 2) {
      throw new Error('Description must be at least 2 characters');
    }
  }

  getValue(): string {
    return this.value;
  }
}

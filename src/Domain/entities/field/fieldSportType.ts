export class FieldSportType {
  constructor(private readonly value: string) {
    if (!value || value.trim().length < 2) {
      throw new Error('Name must be at least 2 characters');
    }
  }

  getValue(): string {
    return this.value;
  }
}

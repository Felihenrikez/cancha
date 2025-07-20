export class AlertCreatedAt {
  constructor(private readonly value: Date) {
    this.validate();
  }

  private validate(): void {
    if (!(this.value instanceof Date) || isNaN(this.value.getTime())) {
      throw new Error('Alert created date must be a valid date');
    }
  }

  getValue(): Date {
    return this.value;
  }
}
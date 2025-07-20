export class AlertMessage {
  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('Alert message cannot be empty');
    }
    if (this.value.length > 500) {
      throw new Error('Alert message cannot exceed 500 characters');
    }
  }

  getValue(): string {
    return this.value;
  }
}
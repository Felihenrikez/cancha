export class AlertRecipientId {
  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('Alert recipient ID cannot be empty');
    }
  }

  getValue(): string {
    return this.value;
  }
}
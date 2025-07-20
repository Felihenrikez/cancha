export class AlertId {
  constructor(private readonly value: string) {
    this.validate();
  }

  private validate(): void {
    if (!this.value || this.value.trim().length === 0) {
      throw new Error('Alert ID cannot be empty');
    }
  }

  getValue(): string {
    return this.value;
  }
}
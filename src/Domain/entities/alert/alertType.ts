export type AlertTypeValue = 'info' | 'query';

export class AlertType {
  constructor(private readonly value: AlertTypeValue) {
    this.validate();
  }

  private validate(): void {
    const validTypes: AlertTypeValue[] = ['info', 'query'];
    if (!validTypes.includes(this.value)) {
      throw new Error('Alert type must be info or query');
    }
  }

  getValue(): AlertTypeValue {
    return this.value;
  }
}
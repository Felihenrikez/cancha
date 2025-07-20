export type AlertStatusType = 'sent' | 'read' | 'failed';

export class AlertStatus {
  constructor(private readonly value: AlertStatusType) {
    this.validate();
  }

  private validate(): void {
    const validStatuses: AlertStatusType[] = ['sent', 'read', 'failed'];
    if (!validStatuses.includes(this.value)) {
      throw new Error('Alert status must be sent, read, or failed');
    }
  }

  getValue(): AlertStatusType {
    return this.value;
  }
}
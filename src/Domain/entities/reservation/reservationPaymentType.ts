export class ReservationPaymentType {
    constructor(private readonly value?: string) {
        if (value !== undefined && (!value || value.trim().length === 0)) {
            throw new Error('Payment type cannot be empty if provided');
        }
    }

    getValue(): string | undefined {
        return this.value;
    }
}
export class ReservationId {
    constructor(private readonly value: string) {
        if (!value || typeof value !== 'string') {
            throw new Error('Invalid reservation ID');
        }
    }

    getValue(): string {
        return this.value;
    }
}
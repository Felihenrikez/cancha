export class ReservationDateReservation {
    constructor(private readonly value: string) {
        if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            throw new Error('Date format must be YYYY-MM-DD');
        }
    }

    getValue(): string {
        return this.value;
    }
}
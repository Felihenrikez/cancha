export class ReservationStartHour {
    constructor(private readonly value: string) {
        if (!value || !/^\d{2}:\d{2}$/.test(value)) {
            throw new Error('Time format must be HH:MM');
        }
    }

    getValue(): string {
        return this.value;
    }
}
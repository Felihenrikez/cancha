export class SchedulePrice {
    constructor(private readonly value: number) {
        if (value < 0 || typeof value !== 'number') {
            throw new Error('Price must be a positive number');
        }
    }

    getValue(): number {
        return this.value;
    }
}
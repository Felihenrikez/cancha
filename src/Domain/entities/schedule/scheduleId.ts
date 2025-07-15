export class ScheduleId {
    constructor(private readonly value: string) {
        if (!value || typeof value !== 'string') {
            throw new Error('Invalid schedule ID');
        }
    }

    getValue(): string {
        return this.value;
    }
}
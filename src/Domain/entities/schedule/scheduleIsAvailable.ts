export class ScheduleIsAvailable {
    constructor(private readonly value: boolean) {
        if (typeof value !== 'boolean') {
            throw new Error('IsAvailable must be a boolean');
        }
    }

    getValue(): boolean {
        return this.value;
    }
}
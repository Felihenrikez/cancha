export class UserCreateDate {
    constructor(private readonly value: Date) {
        const today = new Date();
        if (value > today) {
            throw new Error('Create date cannot be in the future');
        }
    }

    getValue(): Date {
        return this.value;
    }
}

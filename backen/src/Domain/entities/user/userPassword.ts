export class UserPassword {
    constructor(private readonly value: string) {
        if (value.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
    }

    getValue(): string {
        return this.value;
    }
}
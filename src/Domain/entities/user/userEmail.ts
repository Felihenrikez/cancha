export class UserEmail {
    constructor(private readonly value: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error('Invalid email format');
        }
    }

    getValue(): string {
        return this.value;
    }
}

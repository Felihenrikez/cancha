export class UserBirthDate {
    private readonly value: string;

    constructor(value: string) {
        // Validamos que el formato sea una fecha válida
        if (!this.isValidDateFormat(value)) {
            throw new Error('Invalid date format. Expected YYYY-MM-DD');
        }

        const inputDate = new Date(value);
        const today = new Date();

        // Ajustamos "today" para ignorar la hora y comparar solo fechas
        today.setHours(0, 0, 0, 0);
        inputDate.setHours(0, 0, 0, 0);

        if (inputDate > today) {
            throw new Error('Birth date cannot be in the future');
        }

        this.value = value;
    }

    // Método auxiliar para validar el formato YYYY-MM-DD
    private isValidDateFormat(dateString: string): boolean {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dateString)) return false;

        const date = new Date(dateString);
        return date.toString() !== 'Invalid Date' && !isNaN(date.getTime());
    }

    getValue(): Date {
        return new Date(this.value);
    }

    getValueAsString(): string {
        return this.value;
    }
}
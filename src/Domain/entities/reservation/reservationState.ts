export class ReservationState {
    constructor(private readonly value: 'pendiente' | 'confirmada' | 'cancelada') {
        if (!['pendiente', 'confirmada', 'cancelada'].includes(value)) {
            throw new Error('Invalid reservation state');
        }
    }

    getValue(): 'pendiente' | 'confirmada' | 'cancelada' {
        return this.value;
    }
}
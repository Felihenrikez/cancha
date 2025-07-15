export class ClubPhone {
  constructor(private readonly value: string) {
    // Puedes ajustar la validación según tu país
    const phoneRegex = /^\+?[0-9]{8,15}$/;
    if (!phoneRegex.test(value)) {
      throw new Error('Invalid phone number');
    }
  }

  getValue(): string {
    return this.value;
  }
}

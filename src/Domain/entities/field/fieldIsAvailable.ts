export class FieldIsAvailable {
  constructor(private readonly value: boolean) {

  }

  getValue(): boolean {
    return this.value;
  }
}

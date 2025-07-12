export class Field {
  constructor(
    public clubId: string,
    public name: string,
    public sportType: string,
    public isAvalable: boolean,
    public description?: string,
    public imageURL?: string
    private _id: string
  ) {
  }
}
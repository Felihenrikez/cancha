export class Club {
  constructor(
    public name: string,
    public addres: string,
    public phone: string,
    public fieldsId: string[],
    public description?: string,
    public ImagenUrl?: string,
    public userId: string,
    public readonly _id: string
  ) {
  }
}
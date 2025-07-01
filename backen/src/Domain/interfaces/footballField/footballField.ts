export interface IFootballField{
  id: string;
  name: string;
  capacity: number;
  clubId: string;
}
export class FootballField {

   constructor(
     private readonly id: string,
     private  readonly props: IFootballField
   ) {}
}
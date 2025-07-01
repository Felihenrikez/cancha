import {FootballFieldId} from "./footballFieldId";

export interface IFootballField{
  id: FootballFieldId;
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
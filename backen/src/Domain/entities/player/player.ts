export interface IPlayer{
  id: string;
  username: string;
  wallet: string;
}
export class Player {

  constructor(
    private readonly id: string,
    private  readonly  props: IPlayer
  ) {}
}
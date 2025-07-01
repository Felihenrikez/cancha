export interface  ITeam{
  id: string;
  teamMembers: string[];
}
export class Team{
  constructor(
    private readonly id:string,
    private readonly props:ITeam
  ) {}
}

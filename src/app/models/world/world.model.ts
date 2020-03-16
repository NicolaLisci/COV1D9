export class Country {
  public cases: number;
  public todayCases: number;
  public deaths: number;
  public todayDeaths: number;
  public recovered: number;
  public active: number;
  public critical: number;
}

export class WorldData {
  public confirmed: number;
  public deaths: number;
  public recovered: number;
}


export enum WorldLabels {
  confirmed = 'Casi',
  todayCases = 'Casi totali',
  deaths = 'Deceduti',
  todayDeaths = 'Deceduti oggi',
  recovered = 'Guariti',
  active = 'Positivi',
  critical = 'Casi critici'
}

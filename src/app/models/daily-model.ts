export class Daily {
  public data: string;
  public deceduti: number;
  public dimessi_guariti: number;
  public isolamento_domiciliare: number;
  public nuovi_attualmente_positivi: number;
  public ricoverati_con_sintomi: number;
  public stato: string;
  public tamponi: number;
  public terapia_intensiva: number;
  public totale_attualmente_positivi: number;
  public totale_casi: number;
  public totale_ospedalizzati: number;
}


export enum DailyLabel {
  deceduti = 'Deceduti',
  dimessi_guariti = 'Guariti',
  isolamento_domiciliare = 'Isolamento domiciliare',
  nuovi_attualmente_positivi = 'Nuovi positivi',
  ricoverati_con_sintomi = 'Ricoverati con sintomi',
  tamponi = 'Tamponi',
  terapia_intensiva = 'Terapia intensiva',
  totale_attualmente_positivi = 'Totale positivi',
  totale_casi = 'Totale casi',
  totale_ospedalizzati = 'Totale ospedalizzati',
}



import {Daily} from './daily-model';

export class Regioni {
  public geometry: Geometry;
  public properties: Daily;
  public type: Type.FEATURE;
}


export class Geometry {
  public coordinates: Coordinates;
  public type: Type.POINT;
}


export class Coordinates {
  public latitude: string;
  public longitude: string;
}


export enum Type {
  POINT = 'Point',
  FEATURE = 'Feature'
}

export class Region {
  public codice_regione: string;
  public data: string;
  public regione: string;
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


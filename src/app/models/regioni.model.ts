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

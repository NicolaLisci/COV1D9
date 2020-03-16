export interface Chart {
  type: string;
  data: any[];
  options: Option;
}

export interface Option {
  region: string;
  displayMode: string;
  datalessRegionColor: string;
  backgroundColor: string;
  colorAxis: ColorAxis;
  dynamicResize : boolean;
}

export interface ColorAxis {
  colors: string[];
}

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
}

export interface ColorAxis {
  colors: string[];
}

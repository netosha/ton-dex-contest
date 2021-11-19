export interface GraphProps {
  data: GraphData;
}

// Todo: Make types for other properties
export interface GraphData {
  columns: Array<Array<string | number>>;
  types: any;
  names: any;
  colors: any;
}

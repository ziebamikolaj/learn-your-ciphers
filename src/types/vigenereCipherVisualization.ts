export interface VisualizationStep {
  text: string;
  key: string;
  result: string;
  row: number;
  col: number;
}

export interface CurrentVisualization {
  text: string;
  key: string;
  cipher: string;
  row: number;
  col: number;
}

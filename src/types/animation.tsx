export type Animation = {
  id: number;
  layerId: number;
  ref: React.RefObject<HTMLCanvasElement>;
  color: string;
  lineWidth: number;
  x: number[];
  y: number[];
  isVisible: boolean;
};

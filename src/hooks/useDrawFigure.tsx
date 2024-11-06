import { CANVAS_HEIGHT, CANVAS_WIDTH, MARGIN, SIZE, SPEED_2 } from "../config/constants.tsx";
import { Direction } from "../types/direction.tsx";
import { Layer } from "../types/layer.tsx";
import { ChangeColorToTrueColor } from "./useColorToTrueColor.tsx";

export const drawFigure00 = (context: CanvasRenderingContext2D | null, layer: Layer, x:number, y:number) => {
  if (!context || !layer) return;

  const size = SIZE; // 正方形のサイズ
  const halfSize = size / 2;
  const centerX = (x > CANVAS_WIDTH - halfSize - MARGIN) ? CANVAS_WIDTH - halfSize - MARGIN 
        : (x < halfSize + MARGIN) ? halfSize + MARGIN 
        : x;
  const centerY = (y > CANVAS_HEIGHT - halfSize - MARGIN) ? CANVAS_HEIGHT - halfSize - MARGIN 
        : (y < halfSize + MARGIN) ? halfSize + MARGIN 
        : y;

  context.strokeStyle = ChangeColorToTrueColor(layer.color);
  context.lineWidth = layer.lineWidth;
  context.beginPath();
  context.moveTo(centerX + halfSize, centerY);
  context.lineTo(centerX - halfSize, centerY);
  context.lineTo(centerX - halfSize, centerY - halfSize);
  context.lineTo(centerX, centerY - halfSize);
  context.lineTo(centerX, centerY + halfSize);
  context.lineTo(centerX + halfSize, centerY + halfSize);
  context.lineTo(centerX + halfSize, centerY);
  context.stroke();
}

export const drawFigure01 = (context: CanvasRenderingContext2D | null, layer: Layer, x:number, y:number) => {
  if (!context || !layer) return;

  const size = SIZE;
  const halfSize = size / 2;
  const centerX = (x > CANVAS_WIDTH - halfSize - MARGIN) ? CANVAS_WIDTH - halfSize - MARGIN 
        : (x < halfSize + MARGIN) ? halfSize + MARGIN 
        : x;
  const centerY = (y > CANVAS_HEIGHT - halfSize - MARGIN) ? CANVAS_HEIGHT - halfSize - MARGIN 
        : (y < halfSize + MARGIN) ? halfSize + MARGIN 
        : y;

  context.strokeStyle = ChangeColorToTrueColor(layer.color);
  context.lineWidth = layer.lineWidth;
  context.beginPath();
  context.moveTo(centerX, centerY);
  context.lineTo(centerX - halfSize, centerY);
  context.lineTo(centerX - halfSize, centerY + halfSize);
  context.lineTo(centerX + halfSize, centerY + halfSize);
  context.lineTo(centerX + halfSize, centerY - halfSize);
  context.lineTo(centerX, centerY - halfSize);
  context.lineTo(centerX, centerY);
  context.stroke();
}

export const drawFigure02 = (context: CanvasRenderingContext2D | null, layer: Layer, x:number, y:number) => {
  if (!context || !layer) return;

  const size = SIZE;
  const halfSize = size / 2;
  const centerX = (x > CANVAS_WIDTH - halfSize - MARGIN) ? CANVAS_WIDTH - halfSize - MARGIN 
        : (x < halfSize + MARGIN) ? halfSize + MARGIN 
        : x;
  const centerY = (y > CANVAS_HEIGHT - halfSize - MARGIN) ? CANVAS_HEIGHT - halfSize - MARGIN 
        : (y < halfSize + MARGIN) ? halfSize + MARGIN 
        : y;

  context.strokeStyle = ChangeColorToTrueColor(layer.color);
  context.lineWidth = layer.lineWidth;
  context.beginPath();
  context.moveTo(centerX - halfSize, centerY - halfSize);
  context.lineTo(centerX + halfSize, centerY - halfSize);
  context.lineTo(centerX + halfSize, centerY + halfSize);
  context.lineTo(centerX - halfSize, centerY + halfSize);
  context.lineTo(centerX - halfSize, centerY - halfSize);
  context.stroke();
}

export const drawFigure03 = (context: CanvasRenderingContext2D | null, layer: Layer, x:number, y:number) => {
  if (!context || !layer) return;

  const size = SIZE;
  const halfSize = size / 2;
  const centerX = (x > CANVAS_WIDTH - halfSize - MARGIN) ? CANVAS_WIDTH - halfSize - MARGIN 
        : (x < halfSize + MARGIN) ? halfSize + MARGIN 
        : x;
  const centerY = (y > CANVAS_HEIGHT - halfSize - MARGIN) ? CANVAS_HEIGHT - halfSize - MARGIN 
        : (y < halfSize + MARGIN) ? halfSize + MARGIN 
        : y;

  context.strokeStyle = ChangeColorToTrueColor(layer.color);
  context.lineWidth = layer.lineWidth;
  context.beginPath();
  context.moveTo(centerX + halfSize, centerY - halfSize);
  context.lineTo(centerX + halfSize/2, centerY - halfSize);
  context.lineTo(centerX + halfSize/2, centerY + halfSize);
  context.lineTo(centerX - halfSize, centerY + halfSize);
  context.lineTo(centerX - halfSize, centerY + halfSize / 2);
  context.lineTo(centerX + halfSize, centerY + halfSize / 2);
  context.lineTo(centerX + halfSize, centerY - halfSize);
  context.stroke();
}

export const drawFrame = (layer?: Layer, x?: number, y?: number) => {
  if (!layer) return { x: 0, y: 0 };
  const canvas = layer.ref.current;
  if (!canvas) return { x: 0, y: 0 };
  const context = canvas.getContext("2d");
  if (!context) return { x: 0, y: 0 };

  const size = SIZE * 2;
  const halfSize = size / 2;
  const centerX = x || Math.floor(Math.random() * ((CANVAS_WIDTH - halfSize - MARGIN) - (halfSize + MARGIN) + 1)) + halfSize + MARGIN;
  const centerY = y || Math.floor(Math.random() * ((CANVAS_HEIGHT - halfSize - MARGIN) - (halfSize + MARGIN) + 1)) + halfSize + MARGIN;

  context.strokeStyle = "#F0F0F0";
  context.lineWidth = layer.lineWidth;
  context.beginPath();
  context.moveTo(centerX - halfSize, centerY - halfSize);
  context.lineTo(centerX + halfSize, centerY - halfSize);
  context.lineTo(centerX + halfSize, centerY + halfSize);
  context.lineTo(centerX - halfSize, centerY + halfSize);
  context.lineTo(centerX - halfSize, centerY - halfSize);
  context.stroke();
  return { x: centerX, y: centerY };
}

export const RedrawFigure = (context: CanvasRenderingContext2D | null, layer: Layer, figure_id: number, x:number, y:number) => {
  switch (figure_id) {
    case 0:
      drawFigure00(context, layer, x, y);
      break;
    case 1:
      drawFigure01(context, layer, x, y);
      break;
    case 2:
      drawFigure02(context, layer, x, y);
      break;
    case 3:
      drawFigure03(context, layer, x, y);
      break;
    default:
      break;
  }
}

export const RedrawFreeFigure = (context: CanvasRenderingContext2D | null, directionArray: (Direction | null)[], layer: Layer, x:number, y:number, is_end: boolean) => {
  if (!context) return;

  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const frameContext = layer.ref.current?.getContext("2d");
  if (frameContext) {
    frameContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  if (!is_end){
    drawFrame(layer, x, y);
  }

  let currentX = x - SIZE;
  let currentY = y - SIZE;
  
  context.strokeStyle = ChangeColorToTrueColor(layer.color);
  context.lineWidth = layer.lineWidth;

  context.beginPath();
  context.moveTo(currentX, currentY);

  for (let i = 0; i < directionArray.length; i++) {
    if(directionArray[i] === Direction.Down){
      currentY += SPEED_2;
      context.lineTo(currentX, currentY);
    }
    else if(directionArray[i] === Direction.Up){
      currentY -= SPEED_2;
      context.lineTo(currentX, currentY);
    }
    else if(directionArray[i] === Direction.Right){
      currentX += SPEED_2;
      context.lineTo(currentX, currentY);
    }
    else if(directionArray[i] === Direction.Left){
      currentX -= SPEED_2;
      context.lineTo(currentX, currentY);
    }
    if(directionArray[i] == null){
      break;
    }
  }
  context.stroke();

  // 移動する点を描画
  if (!is_end){
    context.beginPath();
    context.arc(currentX, currentY, layer.lineWidth * 1.25, 0, Math.PI * 2);
    context.fillStyle = ChangeColorToTrueColor(layer.color);
    context.fill();
  }
}


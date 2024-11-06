import { PROCESS_SPAN, SIZE } from "../config/constants.tsx";

const ANIMATION_LENGTH = PROCESS_SPAN * 2;

export const setFigureAnimation = (figure_id: number, centerX: number, centerY: number) => {
  const x: number[] = Array(ANIMATION_LENGTH).fill(-1);
  const y: number[] = Array(ANIMATION_LENGTH).fill(-1);
  switch (figure_id) {
    case 0:
      return setFigure00Animation(centerX, centerY);
    case 1:
      return setFigure01Animation(centerX, centerY);
    case 2:
      return setFigure02Animation(centerX, centerY);
    case 3:
      return setFigure03Animation(centerX, centerY);
    default:
      return { x, y };
  }
}

const setFigure00Animation = (centerX: number, centerY: number) => {
  const x: number[] = Array(ANIMATION_LENGTH).fill(-1);
  const y: number[] = Array(ANIMATION_LENGTH).fill(-1);
  const halfSize = SIZE / 2;
  const speed = SIZE / ANIMATION_LENGTH * 8;

  for (let i = 0; i < ANIMATION_LENGTH / 16; i++) {
    x[i] = centerX - halfSize;
    y[i] = centerY - halfSize + i * speed;
  }
  for (let i = 0; i < ANIMATION_LENGTH * 2 / 16; i++) {
    x[i + ANIMATION_LENGTH / 16] = centerX - halfSize + i * speed;
    y[i + ANIMATION_LENGTH / 16] = centerY;
  }
  for (let i = 0; i < ANIMATION_LENGTH  / 16; i++) {
    x[i + ANIMATION_LENGTH * 3 / 16] = centerX + halfSize;
    y[i + ANIMATION_LENGTH * 3 / 16] = centerY + i * speed;
  }
  for (let i = 0; i < ANIMATION_LENGTH  / 16; i++) {
    x[i + ANIMATION_LENGTH * 4 / 16] = centerX + halfSize - i * speed;
    y[i + ANIMATION_LENGTH * 4 / 16] = centerY + halfSize;
  }
  for (let i = 0; i < ANIMATION_LENGTH * 2 / 16; i++) {
    x[i + ANIMATION_LENGTH * 5 / 16] = centerX;
    y[i + ANIMATION_LENGTH * 5 / 16] = centerY + halfSize - i * speed;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 16; i++) {
    x[i + ANIMATION_LENGTH * 7 / 16] = centerX - i * speed;
    y[i + ANIMATION_LENGTH * 7 / 16] = centerY - halfSize;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 2; i++) {
    x[i + ANIMATION_LENGTH / 2] = x[i];
    y[i + ANIMATION_LENGTH / 2] = y[i];
  }
  return { x, y };
}

const setFigure01Animation = (centerX: number, centerY: number) => {
  const x: number[] = Array(ANIMATION_LENGTH).fill(-1);
  const y: number[] = Array(ANIMATION_LENGTH).fill(-1);

  const halfSize = SIZE / 2;
  const speed = SIZE / ANIMATION_LENGTH * 8;

  for (let i = 0; i < ANIMATION_LENGTH / 16; i++) {
    x[i] = centerX;
    y[i] = centerY - halfSize + i * speed;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 16; i++) {
    x[i + ANIMATION_LENGTH / 16] = centerX -  i * speed;
    y[i + ANIMATION_LENGTH / 16] = centerY;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 16; i++) {
    x[i + ANIMATION_LENGTH / 8] = centerX - halfSize;
    y[i + ANIMATION_LENGTH / 8] = centerY + i * speed;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 8; i++) {
    x[i + ANIMATION_LENGTH / 16 * 3] = centerX - halfSize + i * speed;
    y[i + ANIMATION_LENGTH / 16 * 3] = centerY + halfSize;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 8; i++) {
    x[i + ANIMATION_LENGTH / 16 * 5] = centerX + halfSize;
    y[i + ANIMATION_LENGTH / 16 * 5] = centerY + halfSize - i * speed;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 16; i++) {
    x[i + ANIMATION_LENGTH / 16 * 7] = centerX + halfSize - i * speed;
    y[i + ANIMATION_LENGTH / 16 * 7] = centerY - halfSize;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 2; i++) {
    x[i + ANIMATION_LENGTH / 2] = x[i];
    y[i + ANIMATION_LENGTH / 2] = y[i];
  }
  return { x, y };
}

const setFigure02Animation = (centerX: number, centerY: number) => {
  const x: number[] = Array(ANIMATION_LENGTH).fill(-1);
  const y: number[] = Array(ANIMATION_LENGTH).fill(-1);

  const halfSize = SIZE / 2;
  const speed = SIZE / ANIMATION_LENGTH * 8;

  for (let i = 0; i < ANIMATION_LENGTH / 8; i++) {
    x[i] = centerX - halfSize;
    y[i] = centerY - halfSize + i * speed;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 8; i++) {
    x[i + ANIMATION_LENGTH / 8] = centerX - halfSize + i * speed;
    y[i + ANIMATION_LENGTH / 8] = centerY + halfSize;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 8; i++) {
    x[i + ANIMATION_LENGTH / 8 * 2] = centerX + halfSize;
    y[i + ANIMATION_LENGTH / 8 * 2] = centerY + halfSize - i * speed;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 8; i++) {
    x[i + ANIMATION_LENGTH / 8 * 3] = centerX + halfSize - i * speed;
    y[i + ANIMATION_LENGTH / 8 * 3] = centerY - halfSize;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 2; i++) {
    x[i + ANIMATION_LENGTH / 2] = x[i];
    y[i + ANIMATION_LENGTH / 2] = y[i];
  }
  return { x, y };
}

const setFigure03Animation = (centerX: number, centerY: number) => {
  const x: number[] = Array(ANIMATION_LENGTH).fill(-1);
  const y: number[] = Array(ANIMATION_LENGTH).fill(-1);

  const halfSize = SIZE / 2;
  const speed = SIZE / ANIMATION_LENGTH * 8;

  for (let i = 0; i < ANIMATION_LENGTH / 32; i++) {
    x[i] = centerX + halfSize - i * speed;
    y[i] = centerY - halfSize;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 8; i++) {
    x[i + ANIMATION_LENGTH / 32] = centerX + halfSize / 2;
    y[i + ANIMATION_LENGTH / 32] = centerY - halfSize + i * speed;
  }
  for (let i = 0; i < ANIMATION_LENGTH * 3 / 32; i++) {
    x[i + ANIMATION_LENGTH / 32 * 5] = centerX + halfSize / 2 - i * speed;
    y[i + ANIMATION_LENGTH / 32 * 5] = centerY + halfSize;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 32; i++) {
    x[i + ANIMATION_LENGTH / 4 ] = centerX - halfSize;
    y[i + ANIMATION_LENGTH / 4 ] = centerY + halfSize - i * speed;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 8; i++) {
    x[i + ANIMATION_LENGTH / 32 * 9] = centerX - halfSize + i * speed;
    y[i + ANIMATION_LENGTH / 32 * 9] = centerY + halfSize / 2;
  }
  for (let i = 0; i < ANIMATION_LENGTH * 3 / 32; i++) {
    x[i + ANIMATION_LENGTH / 32 * 13] = centerX + halfSize;
    y[i + ANIMATION_LENGTH / 32 * 13] = centerY + halfSize / 2 - i * speed;
  }
  for (let i = 0; i < ANIMATION_LENGTH / 2; i++) {
    x[i + ANIMATION_LENGTH / 2] = x[i];
    y[i + ANIMATION_LENGTH / 2] = y[i];
  }
  return { x, y };
}

export const setFreeAnimation = (edge: number[], centerX: number, centerY: number) => {
  const x: number[] = Array(ANIMATION_LENGTH).fill(-1);
  const y: number[] = Array(ANIMATION_LENGTH).fill(-1);

  let currentX = centerX - SIZE;
  let currentY = centerY - SIZE;
  const speed = SIZE / ANIMATION_LENGTH * 8;
  const framePerEdge = ANIMATION_LENGTH / edge.length;

  let preDirecrtion = -1;
  for (let i = 0; i < 2; i++) {
    let directionNumber = preDirecrtion;

    for (let j = 0; j < edge.length / 2; j++) {
      //方向の反転
      if (edge[j + i * edge.length / 2] !== 0) {
        directionNumber *= -1;
      }
      for (let k = 0; k < framePerEdge; k++) {
        x[k + i * ANIMATION_LENGTH / 2 + j * framePerEdge] = currentX;
        y[k + i * ANIMATION_LENGTH / 2 + j * framePerEdge] = currentY;
        
        if (directionNumber === 1){
          if (i === 0){
            currentY += speed;
          }
          else{
            currentY -= speed;
          }
        }
        else{
          if (i === 0){
            currentX += speed;
          }
          else{
            currentX -= speed;
          }
        }
      }
      if (j === edge.length / 2 - 1){
        preDirecrtion = directionNumber;
      }
    }
  }
  return {x, y};
}

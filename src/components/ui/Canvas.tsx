// Canvas.ts
'use client'
export const createCanvas = (
  width: number,
  height: number
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

export function createImageData(
  width: number,
  height: number
): ImageData {
  // ImageData adalah GLOBAL, jangan di-define sendiri
  return new ImageData(width, height);
}

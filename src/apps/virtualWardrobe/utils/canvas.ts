import { TouchEvent } from "react";

import { Coords } from "VW_types/other";
import { Clothes, DraggableImage } from "VW_types/stores";

export const isFingerOnCanvas = (touchEvent: TouchEvent): boolean => {
  const imageCoords = {
    x: touchEvent.changedTouches[0].clientX,
    y: touchEvent.changedTouches[0].clientY,
  };

  const canvasRect: DOMRect = (
    document.getElementById("canvas-area") as HTMLDivElement
  ).getBoundingClientRect();

  return (
    imageCoords.x > canvasRect.x &&
    imageCoords.x < canvasRect.x + canvasRect.width &&
    imageCoords.y > canvasRect.y &&
    imageCoords.y < canvasRect.y + canvasRect.height
  );
};

export const scaleClothes = (
  clothes: (Clothes & DraggableImage & Coords)[],
  currentCanvasSize: number,
  previousCanvasSize?: number,
): (DraggableImage & Coords)[] => {
  const scale: number =
    currentCanvasSize / (previousCanvasSize || currentCanvasSize);

  return clothes.map((cloth) => {
    const {
      id,
      image,
      idOnCanvas,
      width,
      height,
      offsetX,
      offsetY,
      x,
      y,
      zIndex,
    } = cloth;

    return {
      id,
      src: image,
      idOnCanvas,
      zIndex,
      width: width * scale,
      height: height * scale,
      offsetX: offsetX * scale,
      offsetY: offsetY * scale,
      x: x * scale,
      y: y * scale,
    };
  });
};

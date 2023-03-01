import { TouchEvent } from "react";

export const isFingerOnCanvas = (touchEvent: TouchEvent): boolean => {
  const imageCoords = {
    x: touchEvent.changedTouches[0].clientX,
    y: touchEvent.changedTouches[0].clientY,
  };

  const canvasRect = (
    document.getElementById("canvas-area") as HTMLDivElement
  ).getBoundingClientRect();

  return (
    imageCoords.x > canvasRect.x &&
    imageCoords.x < canvasRect.x + canvasRect.width &&
    imageCoords.y > canvasRect.y &&
    imageCoords.y < canvasRect.y + canvasRect.height
  );
};

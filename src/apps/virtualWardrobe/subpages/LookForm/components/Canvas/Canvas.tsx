import React, { DragEvent, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { Image, Layer, Stage } from "react-konva";

import { useStore } from "effector-react";
import Konva from "konva";
import useImage from "use-image";

import {
  $changedLook,
  $draggableImage,
  updateChangedLook,
} from "VW_models/look";
import { CanvasImageProps } from "VW_types/props";
import { ChangedLook, DraggableImage } from "VW_types/stores";

import "./Canvas.scss";

export const Canvas: React.FC = () => {
  const draggableImage = useStore<DraggableImage | null>($draggableImage);
  const changedLook = useStore<ChangedLook>($changedLook);
  const stageRef = useRef<Konva.Stage>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop(() => ({ accept: "clothes" }));
  const canvasRect: DOMRect = (
    document.getElementById("canvas-area") as HTMLDivElement
  )?.getBoundingClientRect();

  const CanvasImage: React.FC<CanvasImageProps> = ({ image }) => {
    const [img] = useImage(image.src);

    return (
      <Image
        image={img}
        x={image.x}
        y={image.y}
        offsetX={image.offsetX}
        offsetY={image.offsetY}
        width={image.width}
        height={image.height}
      />
    );
  };

  const dropImage = (event: DragEvent<HTMLImageElement>) => {
    event.preventDefault();
    stageRef.current?.setPointersPositions(event);
    const coords = stageRef.current?.getPointerPosition();

    draggableImage &&
      updateChangedLook({
        ...changedLook,
        clothes: [
          ...changedLook.clothes,
          {
            ...draggableImage,
            x: coords?.x || 0,
            y: coords?.y || 0,
          },
        ],
      });
  };

  useEffect(() => {
    window._organizer.virtualWardrobe.stageRef = stageRef;
  }, []);

  console.log("changedLook", changedLook);

  return (
    <div className="vw_look_form_canvas" ref={canvasRef}>
      <div
        id="canvas-area"
        ref={drop}
        onDrop={dropImage}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          width={canvasRect?.width - 1}
          height={canvasRect?.height - 2}
          ref={stageRef}
        >
          <Layer>
            {changedLook.clothes.map((image) => {
              return (
                <CanvasImage
                  key={`${image.src}${image.x}${image.y}`}
                  image={image}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

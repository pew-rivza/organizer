import React, { DragEvent, useRef } from "react";
import { useDrop } from "react-dnd";
import { Image, Layer, Stage } from "react-konva";

import Konva from "konva";
import useImage from "use-image";

import { DraggableObject } from "VW_types/other";
import { CanvasImageProps, CanvasProps, Coords } from "VW_types/props";

import "./Canvas.scss";

export const Canvas: React.FC<CanvasProps> = ({ draggableObject }) => {
  const stageRef = useRef<Konva.Stage>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = React.useState<(DraggableObject & Coords)[]>([]);
  const [, drop] = useDrop(() => ({ accept: "clothes" }));

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
    setImages(
      images.concat([
        {
          x: coords?.x || 0,
          y: coords?.y || 0,
          src: draggableObject.current?.src || "",
          width: draggableObject.current?.width || 0,
          height: draggableObject.current?.height || 0,
          offsetX: draggableObject.current?.offsetX || 0,
          offsetY: draggableObject.current?.offsetY || 0,
        },
      ]),
    );
  };

  return (
    <div className="vw_look_form_canvas" ref={canvasRef}>
      <div ref={drop} onDrop={dropImage} onDragOver={(e) => e.preventDefault()}>
        <Stage
          width={canvasRef.current?.offsetWidth}
          height={(canvasRef.current?.offsetHeight || 0) - 2}
          ref={stageRef}
        >
          <Layer>
            {images.map((image) => {
              return <CanvasImage key={image.src} image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

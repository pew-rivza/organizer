import React, { DragEvent, useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { Layer, Stage } from "react-konva";

import { useStore } from "effector-react";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";

import {
  $changedLook,
  $draggableImage,
  $stageRef,
  updateChangedLook,
  updateStageRef,
} from "VW_models/look";
import { ChangedLook, DraggableImage } from "VW_types/stores";

import { CanvasImage } from "../CanvasImage";

import "./Canvas.scss";

export const Canvas: React.FC = () => {
  const draggableImage = useStore<DraggableImage | null>($draggableImage);
  const changedLook = useStore<ChangedLook>($changedLook);
  const stage = useRef<Konva.Stage>(null);
  const stageRef = useStore<React.RefObject<Konva.Stage> | null>($stageRef);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop(() => ({ accept: "clothes" }));
  const [selectedId, selectImage] = React.useState<string | null>(null);
  const canvasRect: DOMRect = (
    document.getElementById("canvas-area") as HTMLDivElement
  )?.getBoundingClientRect();

  useEffect(() => {
    updateStageRef(stage);
  }, []);

  const checkDeselect = (
    e: KonvaEventObject<MouseEvent | TouchEvent>,
  ): void => {
    if (e.target === e.target.getStage()) {
      selectImage(null);
    }
  };

  const dropImage = (event: DragEvent<HTMLImageElement>): void => {
    if (stageRef) {
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
    }
  };

  return (
    <div className="vw_look_form_canvas" ref={canvasRef}>
      <div
        id="canvas-area"
        ref={drop}
        onDrop={dropImage}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          width={canvasRect?.width - 2}
          height={canvasRect?.height - 2}
          ref={stageRef}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {changedLook.clothes.map((image) => {
              return (
                <CanvasImage
                  key={image.idOnCanvas}
                  image={image}
                  isSelected={image.idOnCanvas === selectedId}
                  onSelect={() => selectImage(image.idOnCanvas)}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

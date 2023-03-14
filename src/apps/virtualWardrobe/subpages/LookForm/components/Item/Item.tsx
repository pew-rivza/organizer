import React, { DragEvent, TouchEvent, useCallback } from "react";
import { useDrag } from "react-dnd";
import { Preview } from "react-dnd-multi-backend";

import { useStore } from "effector-react";
import Konva from "konva";
import { nanoid } from "nanoid";

import {
  $changedLook,
  $draggableImage,
  $stageRef,
  updateChangedLook,
  updateDraggableImage,
} from "VW_models/look";
import { ClothesItemProps, PreviewProps } from "VW_types/props";
import { ChangedLook, DraggableImage } from "VW_types/stores";
import { isFingerOnCanvas } from "VW_utils/canvas";

import "./Item.scss";

export const Item: React.FC<ClothesItemProps> = ({ clothes }) => {
  const stageRef = useStore<React.RefObject<Konva.Stage> | null>($stageRef);
  const draggableImage = useStore<DraggableImage | null>($draggableImage);
  const changedLook = useStore<ChangedLook>($changedLook);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "clothes",
    item: { ...clothes },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const generatePreview = (props: PreviewProps) => {
    const { style, item } = props;
    return <img style={style} src={item.image} alt="" />;
  };

  const setDraggableParams = (
    event: DragEvent<HTMLImageElement> & TouchEvent<HTMLImageElement>,
  ) => {
    const target = event.target as HTMLImageElement;
    const rect = target.getBoundingClientRect();

    updateDraggableImage({
      idOnCanvas: nanoid(4),
      id: clothes.id,
      src: target.src,
      width: target.offsetWidth,
      height: target.offsetHeight,
      offsetX: (event.touches?.[0] || event).clientX - rect.left,
      offsetY: (event.touches?.[0] || event).clientY - rect.top,
    });
  };

  const dropImage = useCallback(
    (event: TouchEvent<HTMLImageElement>) => {
      if (isFingerOnCanvas(event)) {
        event.preventDefault();

        stageRef?.current?.setPointersPositions(event);
        const coords = stageRef?.current?.getPointerPosition();

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
    },
    [changedLook, draggableImage, stageRef],
  );

  return (
    <div
      className="vw_look_form_sidebar-body-item"
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <Preview>{generatePreview}</Preview>
      <img
        src={clothes.image}
        alt=""
        ref={drag}
        onDragStart={setDraggableParams}
        onTouchStart={setDraggableParams}
        onTouchEnd={dropImage}
      />
    </div>
  );
};

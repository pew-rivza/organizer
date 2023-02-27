import React, { DragEvent } from "react";
import { useDrag } from "react-dnd";
import { Preview } from "react-dnd-multi-backend";

import { ClothesItemProps } from "VW_types/props";

import "./Item.scss";

export const Item: React.FC<ClothesItemProps> = ({
  clothes,
  draggableObject,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "clothes",
    item: { ...clothes },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const generatePreview = (props: any) => {
    const { style, item } = props;
    return <img style={style} src={item.image} alt="" />;
  };

  const setDraggableParams = (event: DragEvent<HTMLImageElement>) => {
    const target = event.target as HTMLImageElement;
    const rect = target.getBoundingClientRect();

    draggableObject.current = {
      src: target.src,
      width: target.offsetWidth,
      height: target.offsetHeight,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
  };

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
      />
    </div>
  );
};

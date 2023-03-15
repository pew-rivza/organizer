import React from "react";
import { Group, Image, Rect } from "react-konva";

import { useStore } from "effector-react";
import { KonvaEventObject } from "konva/lib/Node";
import useImage from "use-image";

import { findObject } from "utils/objects";

import { $changedLook, updateChangedLook } from "VW_models/look";
import { Coords } from "VW_types/other";
import { CloseButtonProps } from "VW_types/props";
import { ChangedLook, DraggableImage } from "VW_types/stores";

export const CloseButton: React.FC<CloseButtonProps> = ({ image }) => {
  const changedLook = useStore<ChangedLook>($changedLook);
  const closeButtonSize: number = 17;
  const closeButtonX: number = image.width - 8.5;
  const closeButtonY: number = -8.5;
  const closeIconX: number = 2;
  const closeIconY: number = 2;
  const [closeIcon] = useImage(
    "https://api.iconify.design/ri/delete-bin-line.svg?color=%238c2e2e&height=13",
  );

  const changeCursor = (
    event: KonvaEventObject<MouseEvent>,
    cursor: string,
  ): void => {
    const container = event.target.getStage()?.container();
    if (container) {
      container.style.cursor = cursor;
    }
  };

  const deleteImage = (): void => {
    const deletedClothes: DraggableImage & Coords =
      findObject<string, DraggableImage & Coords>(
        changedLook.clothes,
        "idOnCanvas",
        image.idOnCanvas,
      ) || ({} as DraggableImage & Coords);

    const index = changedLook.clothes.indexOf(deletedClothes);
    const clothes = [...changedLook.clothes];
    clothes.splice(index, 1);
    const indexedClothes: (DraggableImage & Coords)[] = clothes.map(
      (cloth, zIndex) => ({
        ...cloth,
        zIndex,
      }),
    );
    updateChangedLook({ ...changedLook, clothes: indexedClothes });
  };

  return (
    <Group
      x={closeButtonX}
      y={closeButtonY}
      onMouseOver={(event) => changeCursor(event, "pointer")}
      onMouseOut={(event) => changeCursor(event, "default")}
      onClick={deleteImage}
    >
      <Rect
        width={closeButtonSize}
        height={closeButtonSize}
        fill="#ddc0c0"
        stroke="#8c2e2e"
        strokeWidth={1}
      />
      <Image image={closeIcon} x={closeIconX} y={closeIconY} />
    </Group>
  );
};

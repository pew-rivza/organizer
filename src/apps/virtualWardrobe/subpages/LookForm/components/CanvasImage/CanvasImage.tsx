import React from "react";
import { Image, Transformer } from "react-konva";

import { useStore } from "effector-react";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Box } from "konva/lib/shapes/Transformer";
import useImage from "use-image";

import { findObject } from "utils/objects";

import { TRANSFORMER_CONFIG } from "VW_const/dnd-config";
import { $changedLook, updateChangedLook } from "VW_models/look";
import { CloseButton } from "VW_subpages/LookForm/components/CloseButton";
import { Coords } from "VW_types/other";
import { CanvasImageProps } from "VW_types/props";
import { ChangedLook, DraggableImage } from "VW_types/stores";

export const CanvasImage: React.FC<CanvasImageProps> = ({
  image,
  isSelected,
  onSelect,
}) => {
  const [img] = useImage(image.src);
  const imageRef = React.useRef<Konva.Image>(null);
  const transformerRef = React.useRef<Konva.Transformer>(null);
  const changedLook = useStore<ChangedLook>($changedLook);

  React.useEffect(() => {
    if (isSelected && transformerRef.current) {
      transformerRef.current.nodes(imageRef.current ? [imageRef.current] : []);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const moveImage = (event: KonvaEventObject<DragEvent>): void => {
    updateImage({
      ...image,
      x: event.target.x(),
      y: event.target.y(),
    });
  };

  const resizeImage = (): void => {
    const resizedImage = imageRef.current;

    if (resizedImage) {
      const scaleX = resizedImage.scaleX();
      const scaleY = resizedImage.scaleY();

      resizedImage.scaleX(1);
      resizedImage.scaleY(1);

      updateImage({
        ...image,
        x: resizedImage.x(),
        y: resizedImage.y(),
        width: Math.max(30, resizedImage.width() * scaleX),
        height: Math.max(resizedImage.height() * scaleY),
        offsetX: image.offsetX * scaleX,
        offsetY: image.offsetY * scaleY,
      });
    }
  };

  const updateImage = (image: DraggableImage & Coords): void => {
    const changedClothes: DraggableImage & Coords =
      findObject<string, DraggableImage & Coords>(
        changedLook.clothes,
        "idOnCanvas",
        image.idOnCanvas,
      ) || ({} as DraggableImage & Coords);

    const index = changedLook.clothes.indexOf(changedClothes);
    const clothes = [...changedLook.clothes];
    clothes[index] = { ...image };
    updateChangedLook({ ...changedLook, clothes });
  };

  const restrictSize = (oldBox: Box, newBox: Box): Box => {
    if (newBox.width < 30 || newBox.height < 30) {
      return oldBox;
    }
    return newBox;
  };

  const moveImageToTop = (): void => {
    const movingClothes: DraggableImage & Coords =
      findObject<string, DraggableImage & Coords>(
        changedLook.clothes,
        "idOnCanvas",
        image.idOnCanvas,
      ) || ({} as DraggableImage & Coords);

    const index = changedLook.clothes.indexOf(movingClothes);
    const clothes = [...changedLook.clothes];
    clothes.splice(index, 1);
    clothes.push(movingClothes);
    updateChangedLook({ ...changedLook, clothes });
  };

  return (
    <React.Fragment>
      <Image
        ref={imageRef}
        image={img}
        x={image.x}
        y={image.y}
        offsetX={image.offsetX}
        offsetY={image.offsetY}
        width={image.width}
        height={image.height}
        onClick={onSelect}
        onDblClick={moveImageToTop}
        onDblTap={moveImageToTop}
        onTap={onSelect}
        draggable
        onDragEnd={moveImage}
        onTransform={resizeImage}
        onTransformEnd={resizeImage}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={restrictSize}
          {...TRANSFORMER_CONFIG}
        >
          <CloseButton image={image} />
        </Transformer>
      )}
    </React.Fragment>
  );
};

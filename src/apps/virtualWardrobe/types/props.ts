import { CSSProperties } from "react";

import { Coords } from "VW_types/other";
import { Clothes, DraggableImage } from "VW_types/stores";

export type AppProps = {
  page: "clothes" | "looks";
};

export type TabsProps = {
  selected: number | null;
  onSelect: React.Dispatch<React.SetStateAction<number | null>>;
};

export type ClothesListProps = {
  category: number | null;
};

export type ClothesItemProps = {
  clothes: Clothes;
};

export type CanvasImageProps = {
  image: DraggableImage & Coords;
  isSelected: boolean;
  onSelect: () => void;
};

export type PreviewProps = {
  style: CSSProperties | undefined;
  item: Clothes;
};

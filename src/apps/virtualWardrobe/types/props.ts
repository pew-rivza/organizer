import { CSSProperties } from "react";

import { Coords } from "VW_types/other";
import { Clothes, DraggableImage } from "VW_types/stores";

type Page = "clothes" | "looks";

export type AppProps = {
  page: Page;
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

export type CloseButtonProps = {
  image: DraggableImage & Coords;
};

export type ToolbarProps = {
  page: Page;
};

import { MutableRefObject } from "react";

import { DraggableObject } from "VW_types/other";
import { Clothes } from "VW_types/stores";

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
  draggableObject: MutableRefObject<DraggableObject | undefined>;
};

export type SidebarProps = {
  draggableObject: MutableRefObject<DraggableObject | undefined>;
};

export type CanvasProps = {
  draggableObject: MutableRefObject<DraggableObject | undefined>;
};

export type Coords = { x: number; y: number };

export type CanvasImageProps = {
  image: DraggableObject & Coords;
};

import { ImageType } from "react-images-uploading";

import { Coords } from "./other";

export interface ChangedClothes {
  image: ImageType | null;
  category: number | null;
}

export interface Clothes {
  id: number;
  image: string;
  VWCategoryId: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface GroupedClothes {
  [id: number]: Clothes[];
}

export type DraggableImage = {
  id: number;
  src: string;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
};

export interface ChangedLook {
  clothes: (DraggableImage & Coords)[];
  background: string | null;
  canvasSize: number;
}

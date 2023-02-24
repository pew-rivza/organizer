import { ImageType } from "react-images-uploading";

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

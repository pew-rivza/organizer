import { ImageType } from "react-images-uploading";

export interface ChangedClothes {
  image: ImageType | null;
  category: number | null;
}

export interface Clothes {
  image: string;
  category: number;
}

export interface Category {
  id: number;
  name: string;
}

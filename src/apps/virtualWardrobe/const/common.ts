import { ChangedClothes, ChangedLook } from "VW_types/stores";

export const EMPTY_CLOTHES: ChangedClothes = {
  image: null,
  category: null,
};

export const EMPTY_LOOK: ChangedLook = {
  clothes: [],
  background: null,
  canvasSize: 0,
};

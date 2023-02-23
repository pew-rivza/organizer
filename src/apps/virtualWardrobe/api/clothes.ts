import { CLOTHES_URL } from "VW_const/api";
import { ChangedClothes, Clothes } from "VW_types/stores";

export const API_FETCH_CLOTHES = (): Promise<Clothes[]> =>
  fetch(CLOTHES_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());

export const API_ADD_CLOTHES = (clothes: ChangedClothes): Promise<Clothes> => {
  const formData = new FormData();
  clothes?.image?.file && formData.append("image", clothes.image.file);
  formData.append("categoryId", clothes.category?.toString() || "");

  return fetch(CLOTHES_URL, {
    method: "POST",
    body: formData,
  }).then((response) => response.json());
};

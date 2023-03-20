import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useStore } from "effector-react";

import { findObject } from "utils/objects";

import { $clothes, updateChangedClothes } from "VW_models/clothes";
import { ClothesParams } from "VW_types/other";
import { Clothes } from "VW_types/stores";

import { Category } from "./components/Category";
import { Toolbar } from "./components/Toolbar";
import { Uploader } from "./components/Uploader";

import "./ClothesForm.scss";

export const ClothesForm: React.FC = () => {
  const { id } = useParams() as ClothesParams;
  const clothes = useStore<Clothes[]>($clothes);

  useEffect(() => {
    if (id) {
      const editedClothes = findObject<number, Clothes>(clothes, "id", +id);
      updateChangedClothes({
        category: editedClothes?.VWCategoryId || null,
        image: editedClothes?.image ? { dataURL: editedClothes.image } : null,
      });
    }
  }, [clothes, id]);

  return (
    <div className="vw_clothes_form">
      <Toolbar />
      <Category />
      <Uploader />
    </div>
  );
};

import React from "react";

import { useStore } from "effector-react";

import { $clothes } from "VW_models/clothes";
import { Clothes as ClothesType } from "VW_types/stores";

import "./Clothes.scss";

export const Clothes: React.FC = () => {
  const clothes = useStore<ClothesType[]>($clothes);

  return (
    <div className="vw_clothes">
      {clothes.map((cloth) => (
        <div className="vw_clothes-item" key={cloth.id}>
          <img alt="" src={cloth.image} />
        </div>
      ))}
    </div>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";

import { useStore } from "effector-react";

import { $clothes, $groupedClothes } from "VW_models/clothes";
import { ClothesListProps } from "VW_types/props";
import { Clothes as ClothesType, GroupedClothes } from "VW_types/stores";

import "./List.scss";

export const List: React.FC<ClothesListProps> = ({ category }) => {
  const navigate = useNavigate();
  const clothes = useStore<ClothesType[]>($clothes);
  const groupedClothes = useStore<GroupedClothes>($groupedClothes);

  return (
    <div className="vw_clothes_list">
      {(category === null ? clothes : groupedClothes[category] || []).map(
        (cloth) => (
          <div
            className="vw_clothes_list-item"
            key={cloth.id}
            onClick={() => navigate(`edit/${cloth.id}`)}
          >
            <img alt="" src={cloth.image} />
          </div>
        ),
      )}
    </div>
  );
};

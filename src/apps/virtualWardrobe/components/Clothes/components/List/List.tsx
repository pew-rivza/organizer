import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";

import { API_DELETE_CLOTHES } from "VW_api/clothes";
import { $clothes, $groupedClothes, fetchClothesFx } from "VW_models/clothes";
import { ClothesListProps } from "VW_types/props";
import {
  Clothes,
  Clothes as ClothesType,
  GroupedClothes,
} from "VW_types/stores";

import "./List.scss";

export const List: React.FC<ClothesListProps> = ({ category }) => {
  const navigate = useNavigate();
  const clothes = useStore<ClothesType[]>($clothes);
  const groupedClothes = useStore<GroupedClothes>($groupedClothes);
  const fetchClothes = useEvent<Clothes[]>(fetchClothesFx);

  const deleteClothes = async (id: number): Promise<void> => {
    await API_DELETE_CLOTHES(id);
    fetchClothes();
    toast("Вещь удалена!", {
      toastId: 13,
      type: "success",
    });
  };

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

            <Icon
              icon="ri:delete-bin-line"
              className="vw_clothes_list-item-delete"
              onClick={async (event) => {
                event.stopPropagation();
                await deleteClothes(cloth.id);
              }}
            />
          </div>
        ),
      )}
    </div>
  );
};

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";

import { API_ADD_CLOTHES, API_UPDATE_CLOTHES } from "VW_api/clothes";
import {
  $changedClothes,
  cancelChangedClothes,
  fetchClothesFx,
} from "VW_models/clothes";
import { ClothesParams } from "VW_types/other";
import { ChangedClothes, Clothes } from "VW_types/stores";

import "./Toolbar.scss";

export const Toolbar: React.FC = () => {
  const changedClothes = useStore<ChangedClothes>($changedClothes);
  const fetchClothes = useEvent<Clothes[]>(fetchClothesFx);
  const { id } = useParams() as ClothesParams;
  const navigate = useNavigate();

  const changeClothes = async (): Promise<void> => {
    if (changedClothes.image && changedClothes.category) {
      if (id) {
        await API_UPDATE_CLOTHES(changedClothes, +id);
      } else {
        await API_ADD_CLOTHES(changedClothes);
      }

      navigate(-1);
      fetchClothes();

      toast(id ? "Вещь отредактирована" : "Новая вещь добавлена!", {
        toastId: 10,
        type: "success",
        onClose: () => {
          cancelChangedClothes();
        },
      });
    } else {
      toast("Заполните все поля", {
        toastId: 9,
        type: "warning",
      });
    }
  };

  const goBack = () => {
    navigate(-1);
    cancelChangedClothes();
  };

  return (
    <div className="vw_clothes_form-toolbar">
      <Icon
        icon="material-symbols:arrow-back-ios-new"
        onClick={goBack}
        className={"vw_clothes_form-toolbar-back"}
      />
      <button
        className="vw_clothes_form-toolbar-save icon-button"
        onClick={changeClothes}
      >
        <Icon icon="uil:save" />
      </button>
    </div>
  );
};

import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";

import { API_ADD_CLOTHES } from "VW_api/clothes";
import {
  $changedClothes,
  cancelChangedClothes,
  fetchClothesFx,
} from "VW_models/clothes";
import { ChangedClothes, Clothes } from "VW_types/stores";

import "./Toolbar.scss";

export const Toolbar: React.FC = () => {
  const changedClothes = useStore<ChangedClothes>($changedClothes);
  const fetchClothes = useEvent<Clothes[]>(fetchClothesFx);
  const navigate = useNavigate();

  const changeClothes = async (): Promise<void> => {
    if (changedClothes.image && changedClothes.category) {
      await API_ADD_CLOTHES(changedClothes);
      fetchClothes();
      navigate(-1);

      toast("Новая вещь добавлена!", {
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

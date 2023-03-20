import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";
import Konva from "konva";

import { LookParams } from "apps/virtualWardrobe/types/other";

import { API_ADD_LOOK, API_UPDATE_LOOK } from "VW_api/look";
import {
  $changedLook,
  $stageRef,
  cancelChangedLook,
  fetchLooksFx,
} from "VW_models/look";
import { ChangedLook, Look } from "VW_types/stores";

import "./Toolbar.scss";

export const Toolbar: React.FC = () => {
  const fetchLooks = useEvent<Look[]>(fetchLooksFx);
  const { id } = useParams() as LookParams;
  const stageRef = useStore<React.RefObject<Konva.Stage> | null>($stageRef);
  const changedLook = useStore<ChangedLook>($changedLook);
  const navigate = useNavigate();

  const changeLook = async (): Promise<void> => {
    if (changedLook.clothes.length) {
      const image = stageRef?.current?.toDataURL();

      if (id) {
        await API_UPDATE_LOOK({ ...changedLook, image, id: +id });
      } else {
        await API_ADD_LOOK({
          ...changedLook,
          image,
        });
      }

      toast(id ? "Образ отредактирован" : "Новый образ добавлен!", {
        toastId: 11,
        type: "success",
      });

      fetchLooks();
      goBack();
    } else {
      toast("Добавьте хотя бы одну вещь", {
        toastId: 12,
        type: "warning",
      });
    }
  };

  const goBack = () => {
    navigate(-1);
    cancelChangedLook();
  };

  return (
    <div className="vw_look_form-toolbar">
      <Icon
        icon="material-symbols:arrow-back-ios-new"
        onClick={goBack}
        className={"vw_clothes_form-toolbar-back"}
      />
      <button
        className="vw_clothes_form-toolbar-save icon-button"
        onClick={changeLook}
      >
        <Icon icon="uil:save" />
      </button>
    </div>
  );
};

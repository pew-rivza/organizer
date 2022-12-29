import React from "react";
import "./Toolbar.scss";
import {
  $editedAreaValues,
  $editMode,
  cancelEditedAreaValues,
  editModeOff, saveEditedAreasValues,
} from "BW_models/areaValue";
import {useEvent, useStore} from "effector-react";
import { Icon } from "@iconify/react";
import {API_DELETE_WHEEL} from "../../api/wheel";
import {Wheel as WheelType, Wheel, EditedAreaValues} from "BW_types";
import {$isNewWheel, $wheel, fetchWheelsFx} from "BW_models/wheel";
import {toast} from "react-toastify";
import {API_UPDATE_AREA_VALUES} from "../../api/areaValue";
import { nanoid } from "nanoid";

export const Toolbar: React.FC = () => {
  const editMode = useStore<boolean>($editMode);
  const editedAreaValues = useStore<EditedAreaValues>($editedAreaValues);
  const wheel = useStore<Wheel>($wheel);
  const fetchWheels = useEvent<WheelType[]>(fetchWheelsFx);
  const isNewWheel = useStore<boolean>($isNewWheel);

  const cancelEditing = (): void => {
    cancelEditedAreaValues();
    editModeOff();
  };

  const deleteWheel = async (): Promise<void> => {
    await API_DELETE_WHEEL(wheel.id)
    toast("Колесо удалено!", {
      toastId: nanoid(4),
      type: "success"
    });
    fetchWheels();
  };

  const updateAreValues = async (): Promise<void> => {
    await API_UPDATE_AREA_VALUES(wheel.id, editedAreaValues);
    toast("Новые значения сохранены!", {
      toastId: nanoid(4),
      type: "success"
    });
    saveEditedAreasValues(editedAreaValues);
    cancelEditedAreaValues();
    editModeOff();
  }

  return (
    <div className="bw_toolbar">
      {
        editMode ? (
          <React.Fragment>
            <button key={1} className="bw_toolbar-save icon-button" onClick={updateAreValues}>
              <Icon icon="uil:save"/>
            </button>
            <button key={2} className="bw_toolbar-cancel icon-button" onClick={cancelEditing}>
              <Icon icon="radix-icons:cross-2"/>
            </button>
          </React.Fragment>
        ) : (
          !isNewWheel && (
            <button key={3} className="bw_toolbar-delete icon-button" onClick={deleteWheel}>
              <Icon icon="ic:sharp-delete-outline"/>
            </button>
          )
        )
      }
    </div>
  )
}

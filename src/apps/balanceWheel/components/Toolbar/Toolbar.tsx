import React from "react";
import "./Toolbar.scss";
import {
  $editedAreaValues,
  cancelEditedAreaValues,
  saveEditedAreasValues,
} from "BW_models/areaValue";
import {useEvent, useStore} from "effector-react";
import { Icon } from "@iconify/react";
import {API_DELETE_WHEEL, API_UPDATE_DATE} from "../../api/wheel";
import {Wheel as WheelType, Wheel, EditedAreaValues} from "BW_types";
import {
  $editedDate,
  $isNewWheel,
  $wheel,
  cancelEditedDate,
  fetchWheelsFx,
  saveEditedDate
} from "BW_models/wheel";
import {toast} from "react-toastify";
import {API_UPDATE_AREA_VALUES} from "../../api/areaValue";
import { nanoid } from "nanoid";
import { $editMode, editModeOff } from "BW_models/common";
import {dateRegExp} from "BW_const/index";

export const Toolbar: React.FC = () => {
  const editMode = useStore<boolean>($editMode);
  const editedAreaValues = useStore<EditedAreaValues>($editedAreaValues);
  const wheel = useStore<Wheel>($wheel);
  const fetchWheels = useEvent<WheelType[]>(fetchWheelsFx);
  const isNewWheel = useStore<boolean>($isNewWheel);
  const editedDate = useStore<string | false>($editedDate);

  const cancelEditing = (): void => {
    cancelEditedAreaValues();
    cancelEditedDate();
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

  const updateWheel = async (): Promise<void> => {
    if (Object.keys(editedAreaValues).length) {
      await API_UPDATE_AREA_VALUES(wheel.id, editedAreaValues);
      saveEditedAreasValues(editedAreaValues);
      cancelEditedAreaValues();
    }

    if (typeof editedDate === "string") {
      const [wheelMonth, wheelYear] = editedDate.split(".");
      const revertedDate = `${wheelYear}.${wheelMonth}`;
      await API_UPDATE_DATE(wheel.id, revertedDate);
      fetchWheels();
      saveEditedDate(revertedDate);
      cancelEditedDate();
    }

    toast("Изменения сохранены!", {
      toastId: nanoid(4),
      type: "success"
    });
    editModeOff();
  }

  return (
    <div className="bw_toolbar">
      {
        editMode ? (
          <React.Fragment>
            <button key={1} className="bw_toolbar-save icon-button" onClick={updateWheel} disabled={(typeof editedDate === "string") && !dateRegExp.test(editedDate || "")}>
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

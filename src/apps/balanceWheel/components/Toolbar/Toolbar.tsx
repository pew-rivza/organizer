import React from "react";
import { toast } from "react-toastify";

import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";

import { API_UPDATE_AREA_VALUES } from "BW_api/areaValue";
import { API_DELETE_WHEEL, API_UPDATE_DATE } from "BW_api/wheel";
import { DATE_REGEXP } from "BW_const/common";
import {
  $editedAreaValues,
  cancelEditedAreaValues,
  fetchAreaValuesFx,
  updateAreaValues,
} from "BW_models/areaValue";
import { $editMode, editModeOff } from "BW_models/common";
import {
  $editedDate,
  $isNewWheel,
  $wheel,
  cancelEditedDate,
  fetchWheelsFx,
} from "BW_models/wheel";
import {
  AreaValue,
  EditedAreaValues,
  Wheel,
  Wheel as WheelType,
} from "BW_types/stores";

import "./Toolbar.scss";

export const Toolbar: React.FC = () => {
  const editMode = useStore<boolean>($editMode);
  const editedAreaValues = useStore<EditedAreaValues>($editedAreaValues);
  const wheel = useStore<Wheel>($wheel);
  const fetchWheels = useEvent<WheelType[]>(fetchWheelsFx);
  const fetchAreaValues = useEvent<number | void, AreaValue[]>(
    fetchAreaValuesFx,
  );
  const isNewWheel = useStore<boolean>($isNewWheel);
  const editedDate = useStore<string | false>($editedDate);

  const cancelEditing = (): void => {
    cancelEditedAreaValues();
    cancelEditedDate();
    editModeOff();
  };

  const deleteWheel = async (): Promise<void> => {
    await API_DELETE_WHEEL(wheel.id);
    toast("Колесо удалено!", {
      toastId: 1,
      type: "success",
    });
    fetchWheels();
  };

  const updateWheel = async (): Promise<void> => {
    if (Object.keys(editedAreaValues).length) {
      await API_UPDATE_AREA_VALUES(wheel.id, editedAreaValues);
      const areaValues = await fetchAreaValues(wheel.id);
      updateAreaValues(areaValues);
      cancelEditedAreaValues();
    }

    if (typeof editedDate === "string") {
      const [wheelMonth, wheelYear] = editedDate.split(".");
      const revertedDate = `${wheelYear}.${wheelMonth}`;
      await API_UPDATE_DATE(wheel.id, revertedDate);
      fetchWheels();
      cancelEditedDate();
    }

    toast("Изменения сохранены!", {
      toastId: 2,
      type: "success",
    });
    editModeOff();
  };

  return (
    <div className="bw_toolbar">
      {editMode ? (
        <React.Fragment>
          <button
            key={1}
            className="bw_toolbar-save icon-button"
            onClick={updateWheel}
            disabled={
              typeof editedDate === "string" &&
              !DATE_REGEXP.test(editedDate || "")
            }
          >
            <Icon icon="uil:save" />
          </button>
          <button
            key={2}
            className="bw_toolbar-cancel icon-button"
            onClick={cancelEditing}
          >
            <Icon icon="radix-icons:cross-2" />
          </button>
        </React.Fragment>
      ) : (
        !isNewWheel && (
          <button
            key={3}
            className="bw_toolbar-delete icon-button"
            onClick={deleteWheel}
          >
            <Icon icon="ri:delete-bin-line" />
          </button>
        )
      )}
    </div>
  );
};

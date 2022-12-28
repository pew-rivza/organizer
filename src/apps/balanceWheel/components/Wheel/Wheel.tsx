import React from "react";
import {useEvent, useStore} from "effector-react";
import { toast } from 'react-toastify';
import { Radar } from "react-chartjs-2";
import ChartJSPluginDragData from "chartjs-plugin-dragdata";
import {$areasFullInfo} from "BW_models/area";
import {AreasFullInfo, EditedAreaValues, Wheel as WheelType} from "BW_types";
import "./Wheel.scss";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import {
  $editedAreaValues,
  $editMode,
  cancelEditedAreaValues,
  editModeOff
} from "BW_models/areaValue";
import {AREA_COUNT, DEFAULT_AREAS} from "BW_const/index";
import {$isNewWheel, $newDate, fetchWheelsFx} from "BW_models/wheel";
import {AREA_VALUES_DATA, PREVIOUS_AREA_VALUES_DATA, WHEEL_OPTIONS} from "BW_const/wheel-config";
import {API_ADD_WHEEL} from "../../api/wheel";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ChartJSPluginDragData
);

export const Wheel: React.FC = () => {
  const areasFullInfo = useStore<AreasFullInfo[]>($areasFullInfo);
  const editMode = useStore<boolean>($editMode);
  const editedAreaValues = useStore<EditedAreaValues>($editedAreaValues);
  const isNewWheel = useStore<boolean>($isNewWheel);
  const newDate = useStore<string>($newDate);
  const fetchWheels = useEvent<WheelType[]>(fetchWheelsFx);
  const dateRegExp = /^(0[1-9])|(1[1-2]).[1-9][0-9][0-9][0-9]$/;

  const data = {
    labels: areasFullInfo.length
      ? areasFullInfo.map((area) => area.name)
      : DEFAULT_AREAS,
    datasets: [
      {
        ...AREA_VALUES_DATA,
        data: areasFullInfo.length
          ? areasFullInfo.map((area, index) => {
            return editedAreaValues[index] ?? area.value;
          })
          : new Array(AREA_COUNT).fill(0),
      },
      {
        ...PREVIOUS_AREA_VALUES_DATA,
        data: areasFullInfo.length
          ? areasFullInfo.map((area) => area.previousValue)
          : new Array(AREA_COUNT).fill(0),
        animation: !editMode,
      },
    ],
  };

  const addWheelHandler = async () => {
    const [month, year] = newDate.split(".");
    const date = `${year}.${month}`;
    await API_ADD_WHEEL(date);
    toast("Новое колесо добавлено!", {
      toastId: 1,
      type: "success"
    });
    fetchWheels();
  }

  const cancelEditing = (): void => {
    cancelEditedAreaValues();
    editModeOff();
  };

  return (
    <React.Fragment>
      <div className="bw_wheel">
        {
          isNewWheel ? (
            <button className="bw_wheel-add" onClick={addWheelHandler} disabled={!dateRegExp.test(newDate)}>+</button>
          ) : (
            // @ts-ignore
            <Radar data={data} options={WHEEL_OPTIONS} datasetIdKey='id' />
          )
        }
      </div>
      {editMode && (
        <div className="bw_wheel-edit-toolbar">
          <button className="bw_wheel-save">Сохранить</button>
          <button className="bw_wheel-cancel" onClick={cancelEditing}>
            Отмена
          </button>
        </div>
      )
      // TODO: (1) этот тулбар с кнопками относится не только к колесу, но и к дате, нужно вынести
      }
    </React.Fragment>
  );
};

// TODO: (2) а еще кек, нужно удалять колесо, было бы славно)))

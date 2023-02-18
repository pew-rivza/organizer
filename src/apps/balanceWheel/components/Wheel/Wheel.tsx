import React from "react";
import { Radar } from "react-chartjs-2";
import { toast } from "react-toastify";

import { Icon } from "@iconify/react";
import type { ChartData } from "chart.js";
import {
  Chart as ChartJS,
  Filler,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import ChartJSPluginDragData from "chartjs-plugin-dragdata";
import { useEvent, useStore } from "effector-react";

import { API_ADD_WHEEL } from "BW_api/wheel";
import { Toolbar } from "BW_components/Toolbar";
import { AREA_COUNT, DATE_REGEXP, DEFAULT_AREAS } from "BW_const/common";
import {
  AREA_VALUES_DATA,
  PREVIOUS_AREA_VALUES_DATA,
  WHEEL_OPTIONS,
} from "BW_const/wheel-config";
import { $areasFullInfo } from "BW_models/area";
import { $editedAreaValues } from "BW_models/areaValue";
import { $isNewWheel, $newDate, fetchWheelsFx } from "BW_models/wheel";
import {
  AreaFullInfo,
  EditedAreaValues,
  Wheel as WheelType,
} from "BW_types/stores";

import "./Wheel.scss";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ChartJSPluginDragData,
);

export const Wheel: React.FC = () => {
  const areasFullInfo = useStore<AreaFullInfo[]>($areasFullInfo);
  const editedAreaValues = useStore<EditedAreaValues>($editedAreaValues);
  const isNewWheel = useStore<boolean>($isNewWheel);
  const newDate = useStore<string>($newDate);
  const fetchWheels = useEvent<WheelType[]>(fetchWheelsFx);

  window._organizer.balanceWheel.areasFullInfo = areasFullInfo;

  const data: ChartData<"radar"> = {
    labels: areasFullInfo.length
      ? areasFullInfo.map((area) => area.name)
      : DEFAULT_AREAS,
    datasets: [
      {
        ...AREA_VALUES_DATA,
        data: areasFullInfo.length
          ? areasFullInfo.map((area, index) => {
              return editedAreaValues[index]?.value ?? area.value;
            })
          : new Array(AREA_COUNT).fill(0),
      },
      {
        ...PREVIOUS_AREA_VALUES_DATA,
        data: areasFullInfo.length
          ? areasFullInfo.map((area) => area.previousValue)
          : new Array(AREA_COUNT).fill(0),
      },
    ],
  };

  const addWheel = async () => {
    const [month, year] = newDate.split(".");
    const date = `${year}.${month}`;
    await API_ADD_WHEEL(date);
    toast("Новое колесо добавлено!", {
      toastId: 5,
      type: "success",
    });
    fetchWheels();
  };

  return (
    <div className="bw_wheel">
      {isNewWheel ? (
        <button
          className="bw_wheel-add icon-button"
          onClick={addWheel}
          disabled={!DATE_REGEXP.test(newDate)}
        >
          <Icon icon="material-symbols:add" />
        </button>
      ) : (
        <Radar data={data} options={WHEEL_OPTIONS} datasetIdKey="id" />
      )}
      <Toolbar />
    </div>
  );
};

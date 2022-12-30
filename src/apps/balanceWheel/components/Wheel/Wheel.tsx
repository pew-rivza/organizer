import React from "react";
import {useEvent, useStore} from "effector-react";
import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { Radar } from "react-chartjs-2";
import ChartJSPluginDragData from "chartjs-plugin-dragdata";
import {$areasFullInfo} from "BW_models/area";
import {AreaFullInfo, EditedAreaValues, Wheel as WheelType} from "BW_types";
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
} from "BW_models/areaValue";
import {AREA_COUNT, dateRegExp, DEFAULT_AREAS} from "BW_const/index";
import {$isNewWheel, $newDate, fetchWheelsFx} from "BW_models/wheel";
import {AREA_VALUES_DATA, PREVIOUS_AREA_VALUES_DATA, WHEEL_OPTIONS} from "BW_const/wheel-config";
import {API_ADD_WHEEL} from "../../api/wheel";
import {Toolbar} from "BW_components/Toolbar";
import { Icon } from "@iconify/react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ChartJSPluginDragData
);

export const Wheel: React.FC = () => {
  const areasFullInfo = useStore<AreaFullInfo[]>($areasFullInfo);
  const editedAreaValues = useStore<EditedAreaValues>($editedAreaValues);
  const isNewWheel = useStore<boolean>($isNewWheel);
  const newDate = useStore<string>($newDate);
  const fetchWheels = useEvent<WheelType[]>(fetchWheelsFx);

  window._organizer.balanceWheel.areasFullInfo = areasFullInfo;

  const data = {
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
      toastId: nanoid(4),
      type: "success"
    });
    fetchWheels();
  }

  return (
    <React.Fragment>
      <div className="bw_wheel">
        {
          isNewWheel ? (
            <button className="bw_wheel-add icon-button" onClick={addWheel} disabled={!dateRegExp.test(newDate)}>
              <Icon icon="material-symbols:add" />
            </button>
          ) : (
            // @ts-ignore
            <Radar data={data} options={WHEEL_OPTIONS} datasetIdKey='id' />
          )
        }
        <Toolbar/>
      </div>
    </React.Fragment>
  );
};

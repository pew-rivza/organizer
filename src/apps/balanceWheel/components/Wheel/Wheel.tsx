import React from "react";
import { useStore } from "effector-react";
import { Radar } from "react-chartjs-2";
import ChartJSPluginDragData from "chartjs-plugin-dragdata";
import { $areasWithValues } from "BW_models/area";
import { AreaWithValue, EditedAreaValues } from "BW_types";
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
  editModeOff,
  editModeOn,
  updateEditedAreaValues,
} from "BW_models/areaValue";
import { AREA_COUNT } from "BW_const/index";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ChartJSPluginDragData
);

export const Wheel: React.FC<{}> = () => {
  const areasWithValues = useStore<AreaWithValue[]>($areasWithValues);
  const editMode = useStore<boolean>($editMode);
  const editedAreaValues = useStore<EditedAreaValues>($editedAreaValues);

  const data = {
    labels: areasWithValues.length
      ? areasWithValues.map((area) => area.name)
      : new Array(AREA_COUNT).fill(""),
    datasets: [
      {
        data: areasWithValues.length
          ? areasWithValues.map((area, index) => {
              return typeof editedAreaValues[index] === "number"
                ? editedAreaValues[index]
                : area.value;
            })
          : new Array(AREA_COUNT).fill(0),
        backgroundColor: "rgba(146,166,154,0.2)",
        borderColor: "rgb(146,166,154)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      dragData: {
        round: 0,
        onDragEnd: (e: MouseEvent, i: number, index: number, value: number) => {
          updateEditedAreaValues({ index, value });
          editModeOn();
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 10,
      },
    },
  };

  const cancelEditing = (): void => {
    cancelEditedAreaValues();
    editModeOff();
  };

  return (
    <React.Fragment>
      <div className="bw_wheel">
        {/* @ts-ignore */}
        <Radar data={data} options={options} />
      </div>
      {editMode && (
        <div className="bw_wheel-edit-toolbar">
          <button className="bw_wheel-save">Сохранить</button>
          <button className="bw_wheel-cancel" onClick={cancelEditing}>
            Отмена
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

// TODO: короче, идея на миллион: можно в каждом колесе показывать еле заметно предыдущее колесо

// TODO: а еще кек, нужно удалять колесо, было бы славно)))

// TODO: сначала тудушки нужно сделать, а потом добавление колеса уже

// TODO: разгрести депенденсис в пэкедж жсон

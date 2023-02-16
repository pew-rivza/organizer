import { updateEditedAreaValues } from "BW_models/areaValue";
import { editModeOn } from "BW_models/common";
import { DragData } from "BW_types/other";

import type { ChartOptions } from "chart.js";

export const WHEEL_OPTIONS: ChartOptions<"radar"> & DragData = {
  plugins: {
    tooltip: {
      filter: (tooltip) => tooltip.datasetIndex === 0,
      backgroundColor: "rgba(70, 133, 140, 0.7)",
      cornerRadius: 0,
      displayColors: false,
      titleMarginBottom: 0,
      callbacks: {
        title: (tooltipItems): string => {
          if (!!tooltipItems.length) {
            return `${tooltipItems[0]?.label}: ${tooltipItems[0]?.formattedValue}`;
          }
          return "";
        },
        label: () => {
          return [];
        },
      },
    },
    dragData: {
      round: 0,
      onDragEnd: (
        e: MouseEvent,
        datasetIndex: number,
        index: number,
        value: number,
      ) => {
        const areaId = window._organizer.balanceWheel.areasFullInfo[index].id;
        updateEditedAreaValues({ index, value, areaId });
        editModeOn();
      },
    },
  },
  scales: {
    r: {
      min: 0,
      max: 10,
      ticks: {
        backdropColor: "transparent",
      },
      pointLabels: {
        font: {
          size: 12,
        },
      },
    },
  },
  responsive: true,
  maintainAspectRatio: true,
};

export const AREA_VALUES_DATA = {
  id: 1,
  backgroundColor: "rgba(146,166,154,0.2)",
  borderColor: "rgb(146,166,154)",
  borderWidth: 1,
  elements: {
    point: {
      pointBackgroundColor: "#92a69a",
      pointBorderWidth: 0,
      pointRadius: 3,
      hitRadius: 6,
    },
  },
};

export const PREVIOUS_AREA_VALUES_DATA = {
  id: 2,
  dragData: false,
  backgroundColor: "rgba(200, 200, 200, 0.2)",
  borderColor: "rgb(200,200,200, 0.5)",
  borderWidth: 1,
  elements: {
    point: {
      pointBackgroundColor: "transparent",
      pointBorderWidth: 1,
      pointRadius: 2,
      hoverRadius: 2,
      hitRadius: 0,
    },
  },
};

import {editModeOn, updateEditedAreaValues} from "BW_models/areaValue";

export const WHEEL_OPTIONS = {
  plugins: {
    tooltip: {
      filter: (tooltip: {datasetIndex: number}) => tooltip.datasetIndex === 0,
      backgroundColor: "rgba(70, 133, 140, 0.8)",
      cornerRadius: 0,
      displayColors: false,
      titleMarginBottom: 0,
      callbacks: {
        title: (context: any) => {
          if (context.length) return `${context[0]?.label}: ${context[0]?.formattedValue}`;
          return null;
        },
        label: () => null
      }

    },
    dragData: {
      round: 0,
      onDragEnd: (e: MouseEvent, datasetIndex: number, index: number, value: number) => {
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
        backdropColor: "transparent"
      },
      pointLabels: {
        font: {
          size: "12px"
        }
      }
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
      hitRadius: 6
    }
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
    }
  },
};

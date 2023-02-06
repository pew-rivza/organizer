import { useStore } from "effector-react";
import React from "react";

import { DatePicker } from "components/DatePicker";

import { $changedMedications } from "MT_models/medication";
import { PeriodItemVariantProps } from "MT_types/props";
import { ChangedMedication } from "MT_types/stores";

import { ItemTemplate } from "./../../../ItemTemplate";

export const IntervalVariant: React.FC<PeriodItemVariantProps> = ({
  variantSelectHandler,
  name,
  selected,
  index,
  changeHandler,
}) => {
  const changedMedications = useStore<ChangedMedication[]>($changedMedications);
  const { periodDateStart, periodDateEnd } = changedMedications[index || 0];

  const onPeriodChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    changeHandler("periodDateStart", start);
    changeHandler("periodDateEnd", end);
  };

  return (
    <ItemTemplate.Variant
      selected={selected}
      onChange={variantSelectHandler}
      name={name}
      isDisabled={!selected}
    >
      <DatePicker<true>
        onChange={onPeriodChange}
        startDate={periodDateStart}
        endDate={periodDateEnd}
        selectsRange
        popperPlacement="bottom-end"
        disabled={!selected}
      />
    </ItemTemplate.Variant>
  );
};

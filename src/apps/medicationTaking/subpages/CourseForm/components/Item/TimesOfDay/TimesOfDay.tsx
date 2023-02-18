import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useStore } from "effector-react";

import { Select } from "components/Select";
import { SelectOption } from "types/other";
import { findObject } from "utils/objects";

import { DEFAULT } from "MT_const/common";
import { $changedMedications } from "MT_models/medication";
import { $options } from "MT_models/option";
import { CourseParams, NullableNumber } from "MT_types/other";
import { ItemProps } from "MT_types/props";
import { ChangedMedication, GroupedOptions } from "MT_types/stores";
import { castToOptions } from "MT_utils/options";

import { ItemTemplate } from "../ItemTemplate";

export const TimesOfDay: React.FC<ItemProps<NullableNumber>> = ({
  onChange,
  index,
  onDelete,
}) => {
  const changedMedications = useStore<ChangedMedication[]>($changedMedications);
  const { id } = useParams() as CourseParams;

  const [selectedTimesOfDay, setSelectedTimesOfDay] =
    useState<SelectOption | null>(null);

  const groupedOptions = useStore<GroupedOptions>($options);
  const timesOfDayOptions = useMemo<SelectOption[]>(() => {
    return castToOptions(groupedOptions.timesOfDay, DEFAULT);
  }, [groupedOptions.timesOfDay]);

  const selectChangeHandler = (option: SelectOption | null) => {
    setSelectedTimesOfDay(option);
    onChange("timesOfDayId", option?.value ? +option.value : null);
  };

  useEffect(() => {
    const timesOfDayId: number = changedMedications[index]
      .timesOfDayId as number;

    timesOfDayId &&
      selectChangeHandler(
        findObject<number, SelectOption>(
          timesOfDayOptions,
          "value",
          timesOfDayId,
        ) || null,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, timesOfDayOptions]);

  const deleteField = () => {
    selectChangeHandler(null);
    onDelete?.("timesOfDay");
  };

  return (
    <ItemTemplate>
      <ItemTemplate.Label onDelete={deleteField}>
        Время суток
      </ItemTemplate.Label>
      <Select
        value={selectedTimesOfDay}
        onChange={selectChangeHandler}
        placeholder={timesOfDayOptions[0]?.label || "🕑"}
        options={timesOfDayOptions}
      />
    </ItemTemplate>
  );
};

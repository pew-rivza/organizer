import { useStore } from "effector-react";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";

import { Select } from "components/Select";
import { SelectOption } from "types/other";
import { findObject } from "utils/objects";

import { DECLINATION } from "MT_const/common";
import { $changedMedications } from "MT_models/medication";
import { $options } from "MT_models/option";
import { NullableNumber } from "MT_types/other";
import { ItemProps } from "MT_types/props";
import { ChangedMedication, GroupedOptions } from "MT_types/stores";
import { castToOptions } from "MT_utils/castToOptions";

import { ItemTemplate } from "./../ItemTemplate";

export const Frequency: React.FC<ItemProps<NullableNumber>> = ({
  index,
  onChange,
}) => {
  const [selectedFrequencyMeasure, setSelectedFrequencyMeasure] =
    useState<SelectOption | null>(null);

  const changedMedications = useStore<ChangedMedication[]>($changedMedications);
  const { frequency, frequencyCount, frequencyMeasureId } =
    changedMedications[index];

  const groupedOptions = useStore<GroupedOptions>($options);
  const frequencyOptions = useMemo<SelectOption[]>(() => {
    return castToOptions(groupedOptions.frequency, DECLINATION, {
      count: frequencyCount || 0,
    });
  }, [frequencyCount, groupedOptions.frequency]);

  const times = useMemo<string>(() => {
    return castToOptions(groupedOptions.times, DECLINATION, {
      count: frequency || 0,
    })[0]?.label;
  }, [frequency, groupedOptions.times]);

  const frequencyChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(
      "frequency",
      e.target.value === "" || !+e.target.value ? null : +e.target.value,
    );
  };

  const frequencyCountChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(
      "frequencyCount",
      e.target.value === "" || !+e.target.value ? null : +e.target.value,
    );
  };

  const selectChangeHandler = (option: SelectOption | null) => {
    setSelectedFrequencyMeasure(option);
    onChange("frequencyMeasureId", option?.value ? +option.value : null);
  };

  useEffect(() => {
    const selectedOption =
      findObject<NullableNumber, SelectOption>(
        frequencyOptions,
        "value",
        frequencyMeasureId,
      ) || null;

    setSelectedFrequencyMeasure(selectedOption);
  }, [frequencyMeasureId, frequencyOptions]);

  return (
    <ItemTemplate>
      <ItemTemplate.Label required>Частота</ItemTemplate.Label>
      <ItemTemplate.InputGroup>
        <ItemTemplate.CountInput
          value={frequency || ""}
          onChange={frequencyChangeHandler}
        />
        {times || "🕑"} в
        <ItemTemplate.CountInput
          value={frequencyCount || ""}
          onChange={frequencyCountChangeHandler}
        />
        <Select
          value={selectedFrequencyMeasure}
          onChange={selectChangeHandler}
          placeholder={frequencyOptions[0]?.label || "🕑"}
          options={frequencyOptions}
        />
      </ItemTemplate.InputGroup>
    </ItemTemplate>
  );
};

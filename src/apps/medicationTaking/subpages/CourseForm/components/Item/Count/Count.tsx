import React, { ChangeEvent, useEffect, useMemo, useState } from "react";

import { useStore } from "effector-react";

import { Select } from "components/Select";
import { SelectOption } from "types/other";
import { findObject } from "utils/objects";

import { DECLINATION } from "MT_const/common";
import { $changedMedications } from "MT_models/medication";
import { $options } from "MT_models/option";
import { NullableNumber } from "MT_types/other";
import { ItemProps } from "MT_types/props";
import { ChangedMedication, GroupedOptions } from "MT_types/stores";
import { castToOptions } from "MT_utils/options";

import { ItemTemplate } from "./../ItemTemplate";

export const Count: React.FC<ItemProps<NullableNumber>> = ({
  index,
  onChange,
}) => {
  const [selectedCountMeasure, setSelectedCountMeasure] =
    useState<SelectOption | null>(null);

  const changedMedications = useStore<ChangedMedication[]>($changedMedications);
  const { count, countMeasureId } = changedMedications[index];

  const groupedOptions = useStore<GroupedOptions>($options);
  const dosageFormOptions = useMemo<SelectOption[]>(() => {
    return castToOptions(groupedOptions.dosageForm, DECLINATION, {
      count: count || 0,
    });
  }, [count, groupedOptions.dosageForm]);

  useEffect(() => {
    const selectedOption =
      findObject<NullableNumber, SelectOption>(
        dosageFormOptions,
        "value",
        countMeasureId,
      ) || null;

    setSelectedCountMeasure(selectedOption);
  }, [countMeasureId, dosageFormOptions]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(
      "count",
      e.target.value === "" || !+e.target.value ? null : +e.target.value,
    );
  };

  const selectChangeHandler = (option: SelectOption | null) => {
    setSelectedCountMeasure(option);
    onChange("countMeasureId", option?.value ? +option.value : null);
  };

  return (
    <ItemTemplate>
      <ItemTemplate.Label required>Количество</ItemTemplate.Label>
      <ItemTemplate.InputGroup>
        по
        <ItemTemplate.CountInput
          value={count || ""}
          onChange={inputChangeHandler}
        />
        <Select
          value={selectedCountMeasure}
          onChange={selectChangeHandler}
          placeholder={dosageFormOptions[0]?.label || "🕑"}
          options={dosageFormOptions}
        />
      </ItemTemplate.InputGroup>
    </ItemTemplate>
  );
};

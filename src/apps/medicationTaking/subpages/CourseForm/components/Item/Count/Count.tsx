import { useStore } from "effector-react";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";

import { Select } from "components/Select";
import { Option } from "types/other";
import { findObject } from "utils/objects";

import { DECLINATION } from "MT_const/common";
import { $changedMedications } from "MT_models/medication";
import { $options } from "MT_models/option";
import { GroupedOptions, NullableNumber } from "MT_types/other";
import { ItemProps } from "MT_types/props";
import { Medication as MedicationType } from "MT_types/stores";
import { castToOptions } from "MT_utils/castToOptions";

import { ItemTemplate } from "./../ItemTemplate";

export const Count: React.FC<ItemProps<NullableNumber>> = ({
  index,
  onChange,
}) => {
  const [selectedCountMeasure, setSelectedCountMeasure] =
    useState<Option | null>(null);

  const changedMedications = useStore<MedicationType[]>($changedMedications);
  const { count, countMeasureId } = changedMedications[index];

  const groupedOptions = useStore<GroupedOptions>($options);
  const dosageFormOptions = useMemo<Option[]>(() => {
    return castToOptions(groupedOptions.dosageForm, DECLINATION, {
      count: count || 0,
    });
  }, [count, groupedOptions.dosageForm]);

  useEffect(() => {
    const selectedOption =
      findObject<NullableNumber, Option>(
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

  const selectChangeHandler = (option: Option | null) => {
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

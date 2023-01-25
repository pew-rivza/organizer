import { useStore } from "effector-react";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";

import { Select } from "components/Select";
import { Option } from "types/other";
import { findObject } from "utils/objects";

import { DECLINATION } from "MT_const/common";
import { $changedMedications } from "MT_models/medication";
import { $options } from "MT_models/option";
import { GroupedOptions, NullableNumber } from "MT_types/other";
import { PeriodItemVariantProps } from "MT_types/props";
import { Medication as MedicationType } from "MT_types/stores";
import { castToOptions } from "MT_utils/castToOptions";

import { ItemTemplate } from "./../../../ItemTemplate";

export const WithinVariant: React.FC<PeriodItemVariantProps> = ({
  variantSelectHandler,
  name,
  selected,
  index,
  changeHandler,
}) => {
  const [selectedPeriodMeasure, setSelectedPeriodMeasure] =
    useState<Option | null>(null);

  const changedMedications = useStore<MedicationType[]>($changedMedications);
  const { periodCount, periodMeasureId } = changedMedications[index || 0];

  const groupedOptions = useStore<GroupedOptions>($options);

  const periodOptions = useMemo<Option[]>(() => {
    return castToOptions(groupedOptions.period, DECLINATION, {
      count: periodCount || 0,
    });
  }, [groupedOptions.period, periodCount]);

  useEffect(() => {
    const selectedOption =
      findObject<NullableNumber, Option>(
        periodOptions,
        "value",
        periodMeasureId,
      ) || null;

    setSelectedPeriodMeasure(selectedOption);
  }, [periodMeasureId, periodOptions]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeHandler(
      "periodCount",
      e.target.value === "" || !+e.target.value ? null : +e.target.value,
    );
  };

  const selectChangeHandler = (option: Option | null) => {
    setSelectedPeriodMeasure(option);
    changeHandler("periodMeasureId", option?.value ? +option.value : null);
  };

  return (
    <ItemTemplate.Variant
      selected={selected}
      onChange={variantSelectHandler}
      name={name}
      isDisabled={!selected}
    >
      <ItemTemplate.InputGroup>
        в&nbsp;течение
        <ItemTemplate.CountInput
          value={periodCount || ""}
          disabled={!selected}
          onChange={inputChangeHandler}
        />
        <Select
          value={selectedPeriodMeasure}
          isDisabled={!selected}
          onChange={selectChangeHandler}
          placeholder={periodOptions[0]?.label || "🕑"}
          options={periodOptions}
        />
      </ItemTemplate.InputGroup>
    </ItemTemplate.Variant>
  );
};

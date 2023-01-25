import { useStore } from "effector-react";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";

import { Select } from "components/Select";
import { Option } from "types/other";
import { findObject } from "utils/objects";

import { DECLINATION, DEFAULT, IN_BEFORE_COMPLIANCE } from "MT_const/common";
import { $changedMedications } from "MT_models/medication";
import { $options } from "MT_models/option";
import {
  GroupedOptions,
  InBeforeComplianceKey,
  NullableNumber,
} from "MT_types/other";
import { ItemProps } from "MT_types/props";
import { Medication as MedicationType } from "MT_types/stores";
import { castToOptions } from "MT_utils/castToOptions";

import { ItemTemplate } from "./../ItemTemplate";

export const MealTime: React.FC<ItemProps<NullableNumber>> = ({
  index,
  onChange,
}) => {
  const [selectedMealTime, setSelectedMealTime] = useState<Option | null>(null);
  const [selectedInBeforeMeasure, setSelectedInBeforeMeasure] =
    useState<Option | null>(null);

  const changedMedications = useStore<MedicationType[]>($changedMedications);
  const { inBeforeCount, inBeforeMeasureId } = changedMedications[index];

  const groupedOptions = useStore<GroupedOptions>($options);
  const mealTimeOptions = useMemo<Option[]>(() => {
    return castToOptions(groupedOptions.mealTime, DEFAULT);
  }, [groupedOptions.mealTime]);

  const selectedMealTimeLabel: InBeforeComplianceKey | null =
    (selectedMealTime?.label as InBeforeComplianceKey) ||
    mealTimeOptions[0]?.label ||
    null;

  const inBeforeOptions = useMemo<Option[]>(() => {
    return castToOptions(groupedOptions.inBefore, DECLINATION, {
      count: inBeforeCount || 0,
    });
  }, [groupedOptions.inBefore, inBeforeCount]);

  useEffect(() => {
    const selectedOption =
      findObject<NullableNumber, Option>(
        inBeforeOptions,
        "value",
        inBeforeMeasureId,
      ) || null;

    setSelectedInBeforeMeasure(selectedOption);
  }, [inBeforeMeasureId, inBeforeOptions]);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(
      "inBeforeCount",
      e.target.value === "" || !+e.target.value ? null : +e.target.value,
    );
  };

  const mealTimeChangeHandler = (option: Option | null) => {
    setSelectedMealTime(option);
    onChange("mealTimeId", option?.value ? +option.value : null);
  };

  const inBeforeChangeHandler = (option: Option | null) => {
    setSelectedInBeforeMeasure(option);
    onChange("inBeforeMeasureId", option?.value ? +option.value : null);
  };

  return (
    <ItemTemplate>
      <ItemTemplate.Label>Время приема</ItemTemplate.Label>
      <ItemTemplate.InputGroup>
        <Select
          value={selectedMealTime}
          onChange={mealTimeChangeHandler}
          placeholder={mealTimeOptions[0]?.label || "🕑"}
          options={mealTimeOptions}
        />
        приема пищи{" "}
        {selectedMealTimeLabel &&
          IN_BEFORE_COMPLIANCE[selectedMealTimeLabel] && (
            <>
              {IN_BEFORE_COMPLIANCE[selectedMealTimeLabel]}
              <ItemTemplate.CountInput
                value={inBeforeCount || ""}
                onChange={inputChangeHandler}
              />
              <Select
                value={selectedInBeforeMeasure}
                onChange={inBeforeChangeHandler}
                placeholder={inBeforeOptions[0]?.label || "🕑"}
                options={inBeforeOptions}
              />
            </>
          )}
      </ItemTemplate.InputGroup>
    </ItemTemplate>
  );
};

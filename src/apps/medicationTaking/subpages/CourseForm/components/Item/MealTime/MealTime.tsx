import { useStore } from "effector-react";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { Select } from "components/Select";
import { SelectOption } from "types/other";
import { findObject } from "utils/objects";

import { DECLINATION, DEFAULT, IN_BEFORE_COMPLIANCE } from "MT_const/common";
import { $changedMedications } from "MT_models/medication";
import { $options } from "MT_models/option";
import { InBeforeComplianceKey, NullableNumber } from "MT_types/other";
import { ItemProps } from "MT_types/props";
import { ChangedMedication, GroupedOptions } from "MT_types/stores";
import { castToOptions } from "MT_utils/options";

import { ItemTemplate } from "./../ItemTemplate";

export const MealTime: React.FC<ItemProps<NullableNumber>> = ({
  index,
  onChange,
  onDelete,
}) => {
  const { id } = useParams();

  const [selectedMealTime, setSelectedMealTime] = useState<SelectOption | null>(
    null,
  );
  const [selectedInBeforeMeasure, setSelectedInBeforeMeasure] =
    useState<SelectOption | null>(null);

  const changedMedications = useStore<ChangedMedication[]>($changedMedications);
  const { inBeforeCount, inBeforeMeasureId } = changedMedications[index];

  const groupedOptions = useStore<GroupedOptions>($options);
  const mealTimeOptions = useMemo<SelectOption[]>(() => {
    return castToOptions(groupedOptions.mealTime, DEFAULT);
  }, [groupedOptions.mealTime]);

  const selectedMealTimeLabel: InBeforeComplianceKey | null =
    (selectedMealTime?.label as InBeforeComplianceKey) ||
    mealTimeOptions[0]?.label ||
    null;

  const inBeforeOptions = useMemo<SelectOption[]>(() => {
    return castToOptions(groupedOptions.inBefore, DECLINATION, {
      count: inBeforeCount || 0,
    });
  }, [groupedOptions.inBefore, inBeforeCount]);

  useEffect(() => {
    const selectedOption =
      findObject<NullableNumber, SelectOption>(
        inBeforeOptions,
        "value",
        inBeforeMeasureId,
      ) || null;

    setSelectedInBeforeMeasure(selectedOption);
  }, [inBeforeMeasureId, inBeforeOptions]);

  const inputChangeHandler = (e?: ChangeEvent<HTMLInputElement>) => {
    onChange(
      "inBeforeCount",
      !e || e.target.value === "" || !+e.target.value ? null : +e.target.value,
    );
  };

  const mealTimeChangeHandler = (option: SelectOption | null) => {
    setSelectedMealTime(option);
    onChange("mealTimeId", option?.value ? +option.value : null);
  };

  const inBeforeChangeHandler = (option: SelectOption | null) => {
    setSelectedInBeforeMeasure(option);
    onChange("inBeforeMeasureId", option?.value ? +option.value : null);
  };

  useEffect(() => {
    if (id) {
      const mealTimeId: number = changedMedications[index].mealTimeId as number;
      mealTimeId &&
        mealTimeChangeHandler(
          findObject<number, SelectOption>(
            mealTimeOptions,
            "value",
            mealTimeId,
          ) || null,
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, mealTimeOptions]);

  const deleteField = () => {
    mealTimeChangeHandler(null);
    inputChangeHandler();
    inBeforeChangeHandler(null);
    onDelete?.("mealTime");
  };

  return (
    <ItemTemplate>
      <ItemTemplate.Label onDelete={deleteField}>
        Время приема
      </ItemTemplate.Label>
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

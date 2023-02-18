import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useStore } from "effector-react";

import { Select } from "components/Select";
import { SelectOption } from "types/other";
import { findObject } from "utils/objects";

import { DEFAULT, GENDER } from "MT_const/common";
import { $changedMedications } from "MT_models/medication";
import { $options } from "MT_models/option";
import { CourseParams, NullableNumber } from "MT_types/other";
import { RouteOfAdministrationItemVariantProps } from "MT_types/props";
import { ChangedMedication, GroupedOptions, Option } from "MT_types/stores";
import { castToOptions } from "MT_utils/options";

import { ItemTemplate } from "./../../../ItemTemplate";

export const InVariant: React.FC<RouteOfAdministrationItemVariantProps> = ({
  variantSelectHandler,
  selectChangeHandler,
  name,
  selected,
  index,
}) => {
  const { id } = useParams() as CourseParams;

  const [selectedInWhich, setSelectedInWhich] = useState<SelectOption | null>(
    null,
  );
  const [selectedIn, setSelectedIn] = useState<SelectOption | null>(null);

  const changedMedications = useStore<ChangedMedication[]>($changedMedications);
  const { inWhichId } = changedMedications[index || 0];

  const groupedOptions = useStore<GroupedOptions>($options);
  const selectedInGenders = findObject<string | NullableNumber, Option>(
    groupedOptions.in || [],
    "id",
    selectedIn?.value || null,
  );

  const { feminine, masculine, neuter } = selectedInGenders || {};
  const [inWhichOptions, setInWhichOptions] = useState(
    castToOptions(groupedOptions.inWhich, GENDER, {
      wordGendersConfig: { feminine, masculine, neuter },
    }),
  );

  const inOptions = useMemo<SelectOption[]>(() => {
    return castToOptions(groupedOptions.in, DEFAULT);
  }, [groupedOptions.in]);

  useEffect(() => {
    const selectedInWhichOption =
      findObject<NullableNumber, SelectOption>(
        inWhichOptions,
        "value",
        inWhichId,
      ) || null;

    setSelectedInWhich(selectedInWhichOption);
  }, [inWhichId, inWhichOptions]);

  useEffect(() => {
    const firstInOption = groupedOptions.in?.[0] || {};
    const selectedInOption = findObject<string | number | void, Option>(
      groupedOptions.in || [],
      "id",
      selectedIn?.value,
    );
    const { feminine, masculine, neuter } = selectedInOption || firstInOption;

    setInWhichOptions(
      castToOptions(groupedOptions.inWhich, GENDER, {
        wordGendersConfig: { feminine, masculine, neuter },
      }),
    );
  }, [groupedOptions, selectedIn]);

  useEffect(() => {
    if (typeof index === "number") {
      const inId: number = changedMedications[index].inId as number;

      inId &&
        selectChangeHandler(
          "inId",
          setSelectedIn,
        )(findObject<number, SelectOption>(inOptions, "value", inId) || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, inOptions]);

  return (
    <ItemTemplate.Variant
      selected={selected}
      onChange={variantSelectHandler}
      name={name}
      isDisabled={!selected}
    >
      в
      <Select
        value={selectedInWhich}
        onChange={selectChangeHandler("inWhichId", setSelectedInWhich)}
        placeholder={inWhichOptions[0]?.label || "🕑"}
        options={inWhichOptions}
        isDisabled={!selected}
      />
      <Select
        value={selectedIn}
        onChange={selectChangeHandler("inId", setSelectedIn)}
        placeholder={inOptions[0]?.label || "🕑"}
        options={inOptions}
        isDisabled={!selected}
      />
    </ItemTemplate.Variant>
  );
};

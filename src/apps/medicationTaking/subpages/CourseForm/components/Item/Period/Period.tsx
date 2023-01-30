import { useStore } from "effector-react";
import React, { ChangeEventHandler } from "react";

import { $changedMedications } from "MT_models/medication";
import { ItemProps } from "MT_types/props";
import { ChangedMedication } from "MT_types/stores";

import { ItemTemplate } from "./../ItemTemplate";
import { IntervalVariant } from "./components/IntervalVariant";
import { WithinVariant } from "./components/WithinVariant";

export const Period: React.FC<ItemProps<number | Date | null | boolean>> = ({
  index,
  onChange,
}) => {
  const changedMedications = useStore<ChangedMedication[]>($changedMedications);
  const { withinChecked } = changedMedications[index];

  const variantSelectHandler: ChangeEventHandler<
    HTMLInputElement
  > = (): void => {
    onChange("withinChecked", !withinChecked);
  };

  return (
    <ItemTemplate>
      <ItemTemplate.Label required>Период</ItemTemplate.Label>
      <ItemTemplate.VariantGroup name={`period-${index}`}>
        <WithinVariant
          variantSelectHandler={variantSelectHandler}
          selected={withinChecked}
          changeHandler={onChange}
          index={index}
        />
        <IntervalVariant
          variantSelectHandler={variantSelectHandler}
          selected={!withinChecked}
          changeHandler={onChange}
          index={index}
        />
      </ItemTemplate.VariantGroup>
    </ItemTemplate>
  );
};

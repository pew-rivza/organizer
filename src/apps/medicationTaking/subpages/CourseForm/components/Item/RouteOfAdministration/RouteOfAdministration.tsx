import { useStore } from "effector-react";
import React, { ChangeEventHandler } from "react";

import { Option } from "types/other";

import { $changedMedications } from "MT_models/medication";
import { InVariant } from "MT_subpages/CourseForm/components/Item/RouteOfAdministration/components/InVariant";
import { NullableNumber } from "MT_types/other";
import { ItemProps } from "MT_types/props";
import { Medication as MedicationType } from "MT_types/stores";

import { ItemTemplate } from "./../ItemTemplate";
import { RouteOfAdministrationVariant } from "./components/RouteOfAdministrationVariant";

export const RouteOfAdministration: React.FC<
  ItemProps<NullableNumber | boolean>
> = ({ index, onChange }) => {
  const changedMedications = useStore<MedicationType[]>($changedMedications);
  const { routeOfAdministrationChecked } = changedMedications[index];

  const variantSelectHandler: ChangeEventHandler<
    HTMLInputElement
  > = (): void => {
    onChange("routeOfAdministrationChecked", !routeOfAdministrationChecked);
  };

  const selectChangeHandler =
    (
      field: string,
      setStateHandler: React.Dispatch<React.SetStateAction<Option | null>>,
    ) =>
    (option: Option | null) => {
      setStateHandler(option);
      onChange(field, option?.value ? +option.value : null);
    };

  return (
    <ItemTemplate>
      <ItemTemplate.Label required>Способ&nbsp;введения</ItemTemplate.Label>
      <ItemTemplate.InputGroup>
        <ItemTemplate.VariantGroup name={`route-of-administration-${index}`}>
          <RouteOfAdministrationVariant
            selected={routeOfAdministrationChecked}
            variantSelectHandler={variantSelectHandler}
            selectChangeHandler={selectChangeHandler}
          />
          <InVariant
            selected={!routeOfAdministrationChecked}
            variantSelectHandler={variantSelectHandler}
            selectChangeHandler={selectChangeHandler}
            index={index}
          />
        </ItemTemplate.VariantGroup>
      </ItemTemplate.InputGroup>
    </ItemTemplate>
  );
};

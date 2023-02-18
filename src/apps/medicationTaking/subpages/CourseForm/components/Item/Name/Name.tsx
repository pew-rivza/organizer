import React, { ChangeEvent } from "react";

import { useStore } from "effector-react";

import { $changedMedications } from "MT_models/medication";
import { ItemProps } from "MT_types/props";
import { ChangedMedication } from "MT_types/stores";

import { ItemTemplate } from "../ItemTemplate";

export const Name: React.FC<ItemProps<string>> = ({ index, onChange }) => {
  const changedMedications = useStore<ChangedMedication[]>($changedMedications);
  const { name } = changedMedications[index];

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange("name", e.target.value);
  };

  return (
    <ItemTemplate>
      <ItemTemplate.Label required>Название</ItemTemplate.Label>
      <input type="text" value={name} onChange={inputChangeHandler} />
    </ItemTemplate>
  );
};

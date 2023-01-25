import { useStore } from "effector-react";
import React, { ChangeEvent } from "react";

import { $changedMedications } from "MT_models/medication";
import { ItemProps } from "MT_types/props";
import { Medication as MedicationType } from "MT_types/stores";

import { ItemTemplate } from "./../ItemTemplate";

export const Comment: React.FC<ItemProps<string>> = ({ index, onChange }) => {
  const changedMedications = useStore<MedicationType[]>($changedMedications);
  const { comment } = changedMedications[index];

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange("comment", e.target.value);
  };

  return (
    <ItemTemplate>
      <ItemTemplate.Label>Комментарий</ItemTemplate.Label>
      <input type="text" value={comment} onChange={inputChangeHandler} />
    </ItemTemplate>
  );
};

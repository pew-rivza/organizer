import { useStore } from "effector-react";
import React, { ChangeEvent } from "react";

import { $changedMedications } from "MT_models/medication";
import { ItemProps } from "MT_types/props";
import { ChangedMedication } from "MT_types/stores";

import { ItemTemplate } from "./../ItemTemplate";

export const Comment: React.FC<ItemProps<string>> = ({
  index,
  onChange,
  onDelete,
}) => {
  const changedMedications = useStore<ChangedMedication[]>($changedMedications);
  const { comment } = changedMedications[index];

  const inputChangeHandler = (e?: ChangeEvent<HTMLInputElement>) => {
    onChange("comment", e ? e.target.value : "");
  };

  const deleteField = () => {
    inputChangeHandler();
    onDelete?.("comment");
  };

  return (
    <ItemTemplate>
      <ItemTemplate.Label onDelete={deleteField}>
        Комментарий
      </ItemTemplate.Label>
      <input type="text" value={comment} onChange={inputChangeHandler} />
    </ItemTemplate>
  );
};

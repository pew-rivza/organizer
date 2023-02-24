import React, { useEffect, useState } from "react";

import { useStore } from "effector-react";

import { Select } from "components/Select";
import { SelectOption } from "types/other";
import { findObject } from "utils/objects";

import { NullableNumber } from "MT_types/other";

import { $categories } from "VW_models/category";
import { $changedClothes, updateChangedClothes } from "VW_models/clothes";
import { Category as CategoryType, ChangedClothes } from "VW_types/stores";

import "./Category.scss";

export const Category: React.FC = () => {
  const categories = useStore<CategoryType[]>($categories);
  const changedClothes = useStore<ChangedClothes>($changedClothes);
  const [category, setCategory] = useState<SelectOption | null>(null);
  const options: SelectOption[] = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  useEffect(() => {
    const selectedCategoryOption =
      findObject<NullableNumber, SelectOption>(
        options,
        "value",
        changedClothes.category,
      ) || null;

    setCategory(selectedCategoryOption);
  }, [changedClothes.category, options]);

  const selectChangeHandler = (option: SelectOption | null) => {
    setCategory(option);
    updateChangedClothes({
      ...changedClothes,
      category: option?.value,
    } as ChangedClothes);
  };

  return (
    <div className="vw_clothes_form-category">
      <label>Категория</label>
      <Select
        value={category}
        onChange={selectChangeHandler}
        placeholder={options[0]?.label || "🕑"}
        options={options}
      />
    </div>
  );
};

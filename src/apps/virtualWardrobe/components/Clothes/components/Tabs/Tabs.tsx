import React from "react";

import { useStore } from "effector-react";

import { joinCn } from "utils/joinCn";

import { $categories } from "VW_models/category";
import { TabsProps } from "VW_types/props";
import { Category } from "VW_types/stores";

import "./Tabs.scss";

export const Tabs: React.FC<TabsProps> = ({ selected, onSelect }) => {
  const categories = useStore<Category[]>($categories);
  const allCn = joinCn(
    "vw_clothes_tabs-item",
    selected === null && "vw_clothes_tabs-item-selected",
  );

  return (
    <div className="vw_clothes_tabs">
      <div className={allCn} onClick={() => onSelect(null)}>
        Все
      </div>

      {categories.map((category) => {
        const cn = joinCn(
          "vw_clothes_tabs-item",
          category.id === selected && "vw_clothes_tabs-item-selected",
        );

        return (
          <div
            key={category.id}
            className={cn}
            onClick={() => onSelect(category.id)}
          >
            {category.name.replace(" ", "\u00A0")}
          </div>
        );
      })}
    </div>
  );
};

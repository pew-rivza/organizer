import React from "react";

import { useStore } from "effector-react";

import { $categories } from "VW_models/category";
import { $groupedClothes } from "VW_models/clothes";
import { SidebarProps } from "VW_types/props";
import { Category, GroupedClothes } from "VW_types/stores";

import { Item } from "../Item";

import "./Sidebar.scss";

export const Sidebar: React.FC<SidebarProps> = ({ draggableObject }) => {
  const categories = useStore<Category[]>($categories);
  const groupedClothes = useStore<GroupedClothes>($groupedClothes);

  return (
    <div className="vw_look_form_sidebar">
      {categories.map((category) => (
        <React.Fragment key={category.id}>
          <div className="vw_look_form_sidebar-header">{category.name}</div>

          {groupedClothes[category.id] && (
            <div className="vw_look_form_sidebar-body">
              {groupedClothes[category.id].map((clothes) => (
                <Item
                  key={clothes.id}
                  clothes={clothes}
                  draggableObject={draggableObject}
                />
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

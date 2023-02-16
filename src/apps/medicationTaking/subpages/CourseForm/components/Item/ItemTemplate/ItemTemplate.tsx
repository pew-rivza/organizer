import React from "react";

import { Icon } from "@iconify/react";
import { nanoid } from "nanoid";

import { ItemTemplateProps, ItemTemplateSubComponents } from "MT_types/props";

import { joinCn } from "utils/joinCn";

import "./ItemTemplate.scss";

export const ItemTemplate: React.FC<ItemTemplateProps> &
  ItemTemplateSubComponents = ({ children }) => {
  return <div className="mt_form_item">{children}</div>;
};

ItemTemplate.Label = ({ children, required, onDelete }) => {
  return (
    <label className="mt_form_item-label">
      {!required && (
        <Icon
          icon="radix-icons:cross-2"
          className="mt_form_item-delete"
          onClick={() => onDelete?.()}
        />
      )}
      {required && <span className="mt_form_item-required">*</span>}
      {children}
    </label>
  );
};

ItemTemplate.InputGroup = ({ children }) => {
  return <div className="mt_form_item-inputs">{children}</div>;
};

ItemTemplate.CountInput = ({ disabled, ...props }) => {
  const cn = joinCn("mt_form_item-count", !!disabled && "disabled");
  return <input type="text" className={cn} {...props} />;
};

ItemTemplate.Variant = ({ children, selected, isDisabled, ...props }) => {
  const id = nanoid(2);
  const contentCn = joinCn(
    "mt_form_item-variant-content",
    !!isDisabled && "disabled",
  );

  return (
    <div className="mt_form_item-variant">
      <div className="radio">
        <input type="radio" id={id} checked={selected} {...props} />
      </div>
      {selected ? (
        <div className={contentCn}>{children}</div>
      ) : (
        <label htmlFor={id} className={contentCn}>
          {children}
        </label>
      )}
    </div>
  );
};

ItemTemplate.VariantGroup = ({ children, name }) => {
  return (
    <div className="mt_form_item-variants">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { name });
      })}
    </div>
  );
};

import React from "react";

import { joinCn } from "utils/joinCn";

import { ItemTemplateProps, ItemTemplateSubComponents } from "MT_types/props";

import "./ItemTemplate.scss";

export const ItemTemplate: React.FC<ItemTemplateProps> &
  ItemTemplateSubComponents = ({ children }) => {
  return <div className="mt_form_item">{children}</div>;
};

ItemTemplate.Label = ({ children, required }) => {
  return (
    <label>
      {required && <span className="mt_form_item-required">*</span>}
      {children}
    </label>
  );
};

ItemTemplate.InputGroup = ({ children }) => {
  return <div className="mt_form_item-inputs">{children}</div>;
};

ItemTemplate.CountInput = (props) => {
  return <input type="text" className="mt_form_item-count" {...props} />;
};

ItemTemplate.Variant = ({ children, selected, isDisabled, ...props }) => {
  const cn = joinCn("mt_form_item-variant", !!isDisabled && "disabled");

  return (
    <React.Fragment>
      <div className="radio">
        <input type="radio" checked={selected} {...props} />
      </div>
      <div className={cn}>{children}</div>
    </React.Fragment>
  );
};

ItemTemplate.VariantGroup = ({ children, name }) => {
  return (
    <React.Fragment>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { name });
      })}
    </React.Fragment>
  );
};

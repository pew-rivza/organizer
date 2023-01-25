import React, {
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactElement,
} from "react";

import { Option } from "types/other";

export type ItemTemplateProps = {
  children: JSX.Element | JSX.Element[];
};

export type ItemTemplateSubComponents = {
  Label: React.FC<LabelProps>;
  InputGroup: React.FC<InputGroupProps>;
  CountInput: React.FC<InputHTMLAttributes<HTMLInputElement>>;
  VariantGroup: React.FC<VariantGroupProps>;
  Variant: React.FC<VariantProps>;
};

type LabelProps = {
  children: string;
  required?: boolean;
};

type InputGroupProps = {
  children: (JSX.Element | string)[] | JSX.Element;
};

type VariantProps = {
  children: (JSX.Element | string)[] | JSX.Element;
  selected: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  isDisabled?: boolean;
};

type VariantGroupProps = {
  children: ReactElement<VariantProps>[];
  name: string;
};

export type ItemVariantProps = {
  variantSelectHandler: ChangeEventHandler<HTMLInputElement>;
  selected: boolean;
  name?: string;
  index?: number;
};

export type RouteOfAdministrationItemVariantProps = ItemVariantProps & {
  selectChangeHandler: (
    field: string,
    setStateHandler: React.Dispatch<React.SetStateAction<Option | null>>,
  ) => (option: Option | null) => void;
};

export type PeriodItemVariantProps = ItemVariantProps & {
  changeHandler: (field: string, value: number | Date | null) => void;
};

export type MedicationProps = {
  index: number;
  deletable: boolean;
};

export interface ItemProps<ValueType> {
  index: number;
  onChange: (field: string, value: ValueType) => void;
}

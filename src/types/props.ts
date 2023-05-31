import { ButtonHTMLAttributes } from "react";
import { ReactDatePickerProps } from "react-datepicker";
import { GroupBase, Props } from "react-select";

import { SelectOption } from "types/other";

export type ConfirmationProps = {
  trigger: JSX.Element;
  question: string | JSX.Element;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
};

export type DatePickerProps<WithRange extends boolean | undefined = false> =
  ReactDatePickerProps<never, WithRange> & {
    classNames?: string[];
    wrapperClassNames?: string[];
    placeholder?: string;
    month?: boolean;
    inputSize?: number;
  };

export type SelectProps = Props<SelectOption, false, GroupBase<SelectOption>>;

export type ChipsProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
};

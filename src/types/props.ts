import { ButtonHTMLAttributes } from "react";
import { ReactDatePickerProps } from "react-datepicker";
import { GroupBase, Props } from "react-select";

import { Option } from "types/other";

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
  };

export type SelectProps = Props<Option, false, GroupBase<Option>>;

export type ChipsProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
};

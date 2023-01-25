import ru from "date-fns/locale/ru";
import React, { forwardRef } from "react";
import ExternalDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MaskedInput from "react-text-mask";

import { DatePickerProps } from "types/props";
import { joinCn } from "utils/joinCn";

import "./DatePicker.scss";

registerLocale("ru", ru);

export function DatePicker<WithRange extends boolean | undefined = false>({
  month = false,
  placeholder = "",
  classNames = [],
  wrapperClassNames = [],
  ...props
}: DatePickerProps<WithRange>) {
  const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat("ru");

  const CustomInput = forwardRef<
    HTMLInputElement & MaskedInput,
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  >((inputProps, ref) => {
    const placeholder: string = !!props.selectsRange
      ? `${dateFormatter.format(new Date())} - ${dateFormatter.format(
          new Date(),
        )}`
      : dateFormatter.format(new Date());
    return (
      <input
        type="text"
        {...inputProps}
        readOnly
        ref={ref}
        placeholder={placeholder}
      />
    );
  });

  const cn = joinCn(
    "datepicker",
    month && "month",
    !!props.selectsRange && "range",
    ...classNames,
  );
  const wrapperCn = joinCn(
    "datepicker_input-wrapper",
    month && "month",
    ...wrapperClassNames,
  );

  return (
    <ExternalDatePicker
      className={cn}
      dateFormat={month ? "MM.yyyy" : "dd.MM.yyyy"}
      popperClassName="datepicker_calendar"
      locale="ru"
      showPopperArrow={false}
      placeholderText={placeholder}
      customInput={<CustomInput />}
      showMonthYearPicker={month}
      wrapperClassName={wrapperCn}
      {...props}
    />
  );
}

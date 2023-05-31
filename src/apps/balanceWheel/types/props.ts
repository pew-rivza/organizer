import { LegacyRef } from "react";
import MaskedInput from "react-text-mask";

import { AreaFullInfo, Todo } from "BW_types/stores";

type ToolbarItem<HandlerType> = {
  show: boolean;
  handler?: HandlerType;
  available?: boolean;
};

export type ItemTemplateProps = {
  todo: Todo;
  disabledCheckbox: boolean;
  input: {
    show: boolean;
    value: string;
    onBlur: () => void;
    onChange: (value: string) => void;
    ref?: LegacyRef<MaskedInput>;
  };
  onClick?: () => void;
  toolbar: {
    save: ToolbarItem<() => Promise<void>>;
    cancel: ToolbarItem<() => void>;
    delete: ToolbarItem<() => Promise<void>>;
  };
};

export type EditableItemProps = {
  todo: Todo;
};

export type ListProps = {
  todos: Todo[];
  areaId: number;
};

export type HeaderProps = {
  area: AreaFullInfo;
};

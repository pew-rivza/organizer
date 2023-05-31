import { LegacyRef } from "react";
import MaskedInput from "react-text-mask";

import { CheckListFullInfo, Todo } from "CL_types/stores";

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
  date: {
    value: Date | null;
    onChange: (value: Date) => void;
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
  checkListId: number;
};

export type HeaderProps = {
  checkList: CheckListFullInfo;
};

export type CheckListProps = {
  checkList: CheckListFullInfo;
};

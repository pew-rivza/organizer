import React, {
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactElement,
} from "react";

import { SelectOption } from "types/other";

import { GroupedMedicationsByPeriod, VisibleChips } from "MT_types/other";
import { CourseFullInfo, Medication } from "MT_types/stores";

export type ItemTemplateProps = {
  children: React.ReactNode;
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
  onDelete?: () => void;
};

type InputGroupProps = {
  children: React.ReactNode;
};

type VariantProps = {
  children: React.ReactNode;
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
    setStateHandler: React.Dispatch<React.SetStateAction<SelectOption | null>>,
  ) => (option: SelectOption | null) => void;
};

export type PeriodItemVariantProps = ItemVariantProps & {
  changeHandler: (field: string, value: number | Date | null) => void;
};

export type MedicationFormProps = {
  index: number;
  deletable: boolean;
};

export interface ItemProps<ValueType> {
  index: number;
  onChange: (field: string, value: ValueType) => void;
  onDelete?: (field: string) => void;
}

export type FieldChipsProps = {
  visibleChips: VisibleChips;
  onChoose: (field: string) => void;
};

export type CourseProps = {
  course: CourseFullInfo;
};

export type MedicationProps = {
  medication: Medication;
};

export type MedicationsProps = {
  medications: Medication[];
  courseStart: Date | null;
  withoutPeriodCourseEnd: Date;
};

export type WithoutPeriodMedicationsProps = {
  groupedMedications: GroupedMedicationsByPeriod;
  courseStart: Date | null;
  withoutPeriodCourseEnd: Date;
};

export type WithPeriodMedicationsProps = {
  groupedMedications: GroupedMedicationsByPeriod;
};

export type ToolbarProps = {
  courseId: number;
};

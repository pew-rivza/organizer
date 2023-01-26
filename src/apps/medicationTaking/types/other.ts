import { Obj } from "types/other";

export type CastMode = "DECLINATION" | "GENDER" | "DEFAULT";

export type CastConfig = {
  count?: number;
  wordGendersConfig?: Obj & {
    feminine: string | void;
    masculine: string | void;
    neuter: string | void;
  };
};

export type WordForms = {
  one: string;
  few: string;
  many: string;
};

export type WordFormType = "one" | "few" | "many";
export type WordGenderType = "masculine" | "feminine" | "neuter";
export type NullableNumber = number | null;

export type InBeforeComplianceKey = "до" | "после";
export type InBeforeComplianceValue = "за" | "через";

export type InBeforeCompliance = Record<
  InBeforeComplianceKey,
  InBeforeComplianceValue
>;

export type GroupedObjects<ObjType> = {
  [key: string]: (ObjType & Obj)[];
};

export type VisibleChips = {
  timesOfDay: boolean;
  mealTime: boolean;
  comment: boolean;
};

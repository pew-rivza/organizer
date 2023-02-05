import { SelectOption } from "types/other";

import { DECLINATION, DEFAULT, DEFAULT_GENDER, GENDER } from "MT_const/common";
import {
  CastConfig,
  CastMode,
  WordForms,
  WordFormType,
  WordGenders,
  WordGenderType,
} from "MT_types/other";
import { Option } from "MT_types/stores";

export function castToOptions(
  arr: Option[],
  mode: CastMode = DEFAULT,
  config: CastConfig = {},
): SelectOption[] {
  switch (mode) {
    case DECLINATION:
      return (
        arr?.map(
          (option): SelectOption => ({
            value: option.id,
            label: getWordByCount(config.count || 0, option),
          }),
        ) || []
      );
    case GENDER:
      return (
        arr?.map((option): SelectOption => {
          return {
            value: option.id,
            label: getWordByGender(config.wordGendersConfig, option),
          };
        }) || []
      );
    case DEFAULT:
    default:
      return (
        arr?.map(
          (option): SelectOption => ({
            value: option.id,
            label: option.value,
          }),
        ) || []
      );
  }
}

export const getWordByCount = (count: number, forms: WordForms): string => {
  let form: WordFormType;
  const countMod100: number = count % 100;

  switch (countMod100 % 10) {
    case 1: {
      form = "one";
      break;
    }
    case 2:
    case 3:
    case 4: {
      form = "few";
      break;
    }
    default:
      form = "many";
  }

  if (count === 0 || (countMod100 >= 11 && countMod100 <= 19)) {
    form = "many";
  }

  if (count % 1 !== 0) {
    form = "few";
  }

  return forms[form];
};

export const getWordByGender = (
  gendersConfig: WordGenders | void,
  forms: WordGenders,
): string => {
  const gender: WordGenderType =
    (Object.keys(gendersConfig || {}) as WordGenderType[]).find(
      (gender): boolean => !!gendersConfig?.[gender],
    ) || DEFAULT_GENDER;

  return forms[gender] || "";
};

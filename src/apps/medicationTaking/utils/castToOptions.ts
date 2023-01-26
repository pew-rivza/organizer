import { SelectOption } from "types/other";

import { DECLINATION, DEFAULT, DEFAULT_GENDER, GENDER } from "MT_const/common";
import { CastConfig, CastMode, WordGenderType } from "MT_types/other";
import { Option } from "MT_types/stores";
import { getWordByCount } from "MT_utils/getWordByCount";

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
          const gender: WordGenderType =
            (
              Object.keys(config.wordGendersConfig || {}) as WordGenderType[]
            ).find((gender): boolean => !!config.wordGendersConfig?.[gender]) ||
            DEFAULT_GENDER;
          return {
            value: option.id,
            label: option[gender],
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

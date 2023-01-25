import { Option } from "types/other";

import { DECLINATION, DEFAULT, DEFAULT_GENDER, GENDER } from "MT_const/common";
import { CastConfig, CastMode, DBOption, WordGenderType } from "MT_types/other";
import { getWordByCount } from "MT_utils/getWordByCount";

export function castToOptions(
  arr: DBOption[],
  mode: CastMode = DEFAULT,
  config: CastConfig = {},
): Option[] {
  switch (mode) {
    case DECLINATION:
      return (
        arr?.map(
          (option): Option => ({
            value: option.id,
            label: getWordByCount(config.count || 0, option),
          }),
        ) || []
      );
    case GENDER:
      return (
        arr?.map((option): Option => {
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
          (option): Option => ({
            value: option.id,
            label: option.value,
          }),
        ) || []
      );
  }
}

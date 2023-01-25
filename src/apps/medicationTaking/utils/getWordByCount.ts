import { WordForms, WordFormType } from "MT_types/other";

export function getWordByCount(count: number, forms: WordForms): string {
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
}

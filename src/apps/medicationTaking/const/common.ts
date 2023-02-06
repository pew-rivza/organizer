import {
  CastMode,
  CountWordFields,
  DateFunctionsCompliance,
  InBeforeCompliance,
  InBeforeComplianceKey,
  InBeforeComplianceValue,
  Periods,
  WithoutPeriodKey,
  WithPeriodKey,
  WordGenderType,
} from "MT_types/other";
import { ChangedCourse, ChangedMedication } from "MT_types/stores";

const BEFORE_MEAL: InBeforeComplianceKey = "до";
const AFTER_MEAL: InBeforeComplianceKey = "после";
const IN: InBeforeComplianceValue = "через";
const BEFORE: InBeforeComplianceValue = "за";

export const IN_BEFORE_COMPLIANCE: InBeforeCompliance = {
  [BEFORE_MEAL]: BEFORE,
  [AFTER_MEAL]: IN,
};

export const DECLINATION: CastMode = "DECLINATION";
export const GENDER: CastMode = "GENDER";
export const DEFAULT: CastMode = "DEFAULT";

export const DEFAULT_GENDER: WordGenderType = "masculine";

export const EMPTY_MEDICATION: ChangedMedication = {
  name: "",
  count: null,
  countMeasureId: null,
  routeOfAdministrationChecked: true,
  routeOfAdministrationId: null,
  inWhichId: null,
  inId: null,
  frequency: null,
  frequencyCount: null,
  frequencyMeasureId: null,
  timesOfDayId: null,
  mealTimeId: null,
  inBeforeCount: null,
  inBeforeMeasureId: null,
  withinChecked: true,
  periodCount: null,
  periodMeasureId: null,
  periodDateStart: null,
  periodDateEnd: null,
  comment: "",
};

export const EMPTY_COURSE: ChangedCourse = {
  start: null,
  doctor: "",
  diagnosis: "",
};

export const COUNT_WORD_FIELDS: CountWordFields = {
  count: {
    countField: "count",
    optionGroup: "dosageForm",
    measureField: "countMeasureId",
  },
  frequency: {
    countField: "frequencyCount",
    optionGroup: "frequency",
    measureField: "frequencyMeasureId",
  },
  inBefore: {
    countField: "inBeforeCount",
    optionGroup: "inBefore",
    measureField: "inBeforeMeasureId",
  },
  period: {
    countField: "periodCount",
    optionGroup: "period",
    measureField: "periodMeasureId",
  },
};

export const WITHOUT_PERIOD_KEY: WithoutPeriodKey = "WITHOUT_PERIOD_KEY";
export const WITH_PERIOD_KEY: WithPeriodKey = "WITH_PERIOD_KEY";

const DAYS: Periods = "дней";
const WEEKS: Periods = "недель";
const MONTHS: Periods = "месяцев";
const YEARS: Periods = "лет";

export const DATE_FUNCTIONS_COMPLIANCE: DateFunctionsCompliance = {
  [DAYS]: { function: "Date", coefficient: 1, minus: 1 },
  [WEEKS]: { function: "Date", coefficient: 7, minus: 1 },
  [MONTHS]: { function: "Month", coefficient: 1 },
  [YEARS]: { function: "FullYear", coefficient: 1 },
};

import {
  CastMode,
  InBeforeCompliance,
  InBeforeComplianceKey,
  InBeforeComplianceValue,
  WordGenderType,
} from "MT_types/other";

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

export const EMPTY_MEDICATION = {
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

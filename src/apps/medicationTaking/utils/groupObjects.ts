import { Obj } from "types/other";

import { WITH_PERIOD_KEY, WITHOUT_PERIOD_KEY } from "MT_const/common";
import { GroupedMedicationsByPeriod, GroupedObjects } from "MT_types/other";
import { Medication as MedicationType } from "MT_types/stores";

export function groupObjectsByKeyValue<ObjType>(
  objectsArray: (ObjType & Obj)[],
  keyField: string,
): GroupedObjects<ObjType> {
  return objectsArray.reduce(
    (prevGroupedObjects: GroupedObjects<ObjType>, obj: ObjType & Obj) => {
      const newGroupedOptions = { ...prevGroupedObjects };
      if (!newGroupedOptions[obj[keyField]]) {
        newGroupedOptions[obj[keyField]] = [];
      }
      newGroupedOptions[obj[keyField]].push(obj);

      return newGroupedOptions;
    },
    {},
  );
}

export const groupMedicationsByPeriod = (
  medications: MedicationType[],
): GroupedMedicationsByPeriod => {
  const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat("ru");

  return medications.reduce<GroupedMedicationsByPeriod>(
    (groupedMedications, medication) => {
      const { periodCount, periodDateStart, periodDateEnd } = medication;
      const newGroupedMedications: GroupedMedicationsByPeriod = {
        ...groupedMedications,
      };

      if (periodCount) {
        newGroupedMedications[WITHOUT_PERIOD_KEY] =
          newGroupedMedications[WITHOUT_PERIOD_KEY] || [];
        newGroupedMedications[WITHOUT_PERIOD_KEY]?.push(medication);
      } else if (periodDateStart && periodDateEnd) {
        newGroupedMedications[WITH_PERIOD_KEY] =
          newGroupedMedications[WITH_PERIOD_KEY] || {};
        const groupKey = `${dateFormatter.format(
          periodDateStart,
        )} - ${dateFormatter.format(periodDateEnd)}`;
        newGroupedMedications[WITH_PERIOD_KEY][groupKey] =
          newGroupedMedications[WITH_PERIOD_KEY][groupKey] || [];
        newGroupedMedications[WITH_PERIOD_KEY][groupKey].push(medication);
      }

      return newGroupedMedications;
    },
    {},
  );
};

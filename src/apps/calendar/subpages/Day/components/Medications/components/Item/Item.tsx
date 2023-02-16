import React, { ChangeEvent } from "react";

import { useEvent, useStore } from "effector-react";

import {
  API_CHECK_MEDICATION,
  API_UNCHECK_MEDICATION,
} from "CR_api/medication";
import { ALL_DAY } from "CR_const/common";
import { $currentDate } from "CR_models/calendar";
import { fetchCheckedMedicationsFx } from "CR_models/medication";
import { MedicationItemDayProps } from "CR_types/props";
import { CheckedMedications } from "CR_types/stores";

import "./Item.scss";

export const Item: React.FC<MedicationItemDayProps> = ({
  medication,
  timesOfDay,
}) => {
  const currentDate = useStore<Date | null>($currentDate);
  const fetchCheckedMedications = useEvent<CheckedMedications[]>(
    fetchCheckedMedicationsFx,
  );

  const {
    id,
    name,
    count,
    nominativeCountMeasure,
    routeOfAdministration,
    frequency,
    times,
    inBeforePreposition,
    inBefore,
    mealTime,
    comment,
    checked,
    checkedId,
  } = medication;

  const changeMedicationTaking = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (currentDate) {
      if (event.target.checked) {
        await API_CHECK_MEDICATION(currentDate, timesOfDay, id);
      } else {
        if (checkedId) {
          await API_UNCHECK_MEDICATION(checkedId);
        }
      }
      fetchCheckedMedications();
    }
  };

  return (
    <div className="cr_day_medications-item">
      <div className="checkbox">
        <input
          type="checkbox"
          onChange={changeMedicationTaking}
          checked={checked}
          disabled={false}
        />
      </div>
      <div>
        {name} {count} {nominativeCountMeasure} {routeOfAdministration}{" "}
        {inBeforePreposition} {inBefore} {mealTime}{" "}
        {timesOfDay === ALL_DAY && `${frequency} ${times}`} {comment}
      </div>
    </div>
  );
};

import { Icon } from "@iconify/react";
import React, { useState } from "react";

import {
  removeChangedMedication,
  updateChangedMedication,
} from "MT_models/medication";
import { VisibleChips } from "MT_types/other";
import { MedicationProps } from "MT_types/props";

import { Comment } from "./../../../Item/Comment";
import { Count } from "./../../../Item/Count";
import { Frequency } from "./../../../Item/Frequency";
import { MealTime } from "./../../../Item/MealTime";
import { Name } from "./../../../Item/Name";
import { Period } from "./../../../Item/Period";
import { RouteOfAdministration } from "./../../../Item/RouteOfAdministration";
import { TimesOfDay } from "./../../../Item/TimesOfDay";

import { FieldChips } from "./../FieldChips";
import "./Medication.scss";

export const Medication: React.FC<MedicationProps> = ({ index, deletable }) => {
  const [visibleChips, setVisibleChips] = useState<VisibleChips>({
    timesOfDay: true,
    mealTime: true,
    comment: true,
  });

  function changeHandler<ValueType>(field: string, value: ValueType) {
    updateChangedMedication({ field, value, index });
  }

  const deleteMedication = (): void => {
    removeChangedMedication(index);
  };

  const chooseChips = (field: string): void => {
    setVisibleChips((prevState) => ({
      ...prevState,
      [field]: false,
    }));
  };

  return (
    <fieldset className="mt_form_medication">
      <legend>Медикамент</legend>
      <Name index={index} onChange={changeHandler} />
      <Count index={index} onChange={changeHandler} />
      <RouteOfAdministration index={index} onChange={changeHandler} />
      <Frequency index={index} onChange={changeHandler} />
      {!visibleChips.timesOfDay && (
        <TimesOfDay index={index} onChange={changeHandler} />
      )}
      {!visibleChips.mealTime && (
        <MealTime index={index} onChange={changeHandler} />
      )}
      <Period index={index} onChange={changeHandler} />
      {!visibleChips.comment && (
        <Comment index={index} onChange={changeHandler} />
      )}

      <FieldChips visibleChips={visibleChips} onChoose={chooseChips} />

      {deletable && (
        <Icon
          icon="ri:delete-bin-line"
          className="mt_form_medication-remove"
          onClick={deleteMedication}
        />
      )}
    </fieldset>
  );
};

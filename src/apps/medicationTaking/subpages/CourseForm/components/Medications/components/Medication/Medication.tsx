import { Icon } from "@iconify/react";
import React from "react";

import {
  removeChangedMedication,
  updateChangedMedication,
} from "MT_models/medication";
import { MedicationProps } from "MT_types/props";

import { Comment } from "./../../../Item/Comment";
import { Count } from "./../../../Item/Count";
import { Frequency } from "./../../../Item/Frequency";
import { MealTime } from "./../../../Item/MealTime";
import { Name } from "./../../../Item/Name";
import { Period } from "./../../../Item/Period";
import { RouteOfAdministration } from "./../../../Item/RouteOfAdministration";
import { TimesOfDay } from "./../../../Item/TimesOfDay";

import "./Medication.scss";

export const Medication: React.FC<MedicationProps> = ({ index, deletable }) => {
  function changeHandler<ValueType>(field: string, value: ValueType) {
    updateChangedMedication({ field, value, index });
  }

  const deleteMedication = (): void => {
    removeChangedMedication(index);
  };

  return (
    <fieldset className="mt_form_medication">
      <legend>Медикамент</legend>
      <Name index={index} onChange={changeHandler} />
      <Count index={index} onChange={changeHandler} />
      <RouteOfAdministration index={index} onChange={changeHandler} />
      <Frequency index={index} onChange={changeHandler} />
      <TimesOfDay index={index} onChange={changeHandler} />
      <MealTime index={index} onChange={changeHandler} />
      <Period index={index} onChange={changeHandler} />
      <Comment index={index} onChange={changeHandler} />

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

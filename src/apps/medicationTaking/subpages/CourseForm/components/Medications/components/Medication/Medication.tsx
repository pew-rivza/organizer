import React, { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { useStore } from "effector-react";

import {
  $changedMedications,
  removeChangedMedication,
  updateChangedMedication,
} from "MT_models/medication";
import { VisibleChips } from "MT_types/other";
import { MedicationFormProps } from "MT_types/props";
import { ChangedMedication } from "MT_types/stores";

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

export const Medication: React.FC<MedicationFormProps> = ({
  index,
  deletable,
}) => {
  const changedMedications = useStore<ChangedMedication[]>($changedMedications);
  const changedMedication = changedMedications[index];
  const { timesOfDayId, mealTimeId, comment } = changedMedication;
  const [visibleChips, setVisibleChips] = useState<VisibleChips>({
    timesOfDay: true,
    mealTime: true,
    comment: true,
  });

  useEffect(() => {
    setVisibleChips({
      timesOfDay: !timesOfDayId,
      mealTime: !mealTimeId,
      comment: !comment,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changedMedication]);

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

  const unchooseChips = (field: string): void => {
    setVisibleChips((prevState) => ({
      ...prevState,
      [field]: true,
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
        <TimesOfDay
          index={index}
          onChange={changeHandler}
          onDelete={unchooseChips}
        />
      )}
      {!visibleChips.mealTime && (
        <MealTime
          index={index}
          onChange={changeHandler}
          onDelete={unchooseChips}
        />
      )}
      <Period index={index} onChange={changeHandler} />
      {!visibleChips.comment && (
        <Comment
          index={index}
          onChange={changeHandler}
          onDelete={unchooseChips}
        />
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

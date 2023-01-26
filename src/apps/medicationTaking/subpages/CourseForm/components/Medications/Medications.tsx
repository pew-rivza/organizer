import { Icon } from "@iconify/react";
import { useStore } from "effector-react";
import React from "react";

import {
  $changedMedications,
  addChangedMedication,
} from "MT_models/medication";
import { ChangedMedication } from "MT_types/stores";

import { Medication } from "./components/Medication";

import "./Medications.scss";

export const Medications: React.FC = () => {
  const changedMedications = useStore<ChangedMedication[]>($changedMedications);

  const addMedication = (): void => {
    addChangedMedication();
  };

  return (
    <React.Fragment>
      <div className="mt_form_medications">
        {changedMedications.map((_, i) => (
          <Medication
            key={i}
            index={i}
            deletable={changedMedications.length !== 1}
          />
        ))}
      </div>
      <button
        className="mt_form_medications-add icon-button"
        onClick={addMedication}
      >
        <Icon icon="material-symbols:add" />
      </button>
    </React.Fragment>
  );
};

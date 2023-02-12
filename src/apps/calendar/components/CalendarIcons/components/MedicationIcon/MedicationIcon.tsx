import { Icon } from "@iconify/react";
import { useStore } from "effector-react";
import React from "react";
import { Tooltip } from "react-tooltip";

import { MedicationItem } from "apps/calendar/types/other";
import { WordForms } from "apps/medicationTaking/types/other";
import { getWordByCount } from "apps/medicationTaking/utils/options";

import { $options } from "MT_models/option";
import { GroupedOptions } from "MT_types/stores";

import { OTHER } from "CR_const/common";
import { MedicationIconProps } from "CR_types/props";
import { getGroupedMedications } from "CR_utils/medication";

export const MedicationIcon: React.FC<MedicationIconProps> = ({
  id,
  medications,
  disabled,
}) => {
  const groupedOptions = useStore<GroupedOptions>($options);
  const groupedMedications = getGroupedMedications(medications, groupedOptions);

  return (
    <div className="cr_day_icons-medication">
      <div id={`medication-${id}`}>
        <Icon icon={"game-icons:medicines"} />
      </div>
      {!disabled && (
        <Tooltip anchorId={`medication-${id}`}>
          {Object.keys(groupedMedications).map((timesOfDay) => {
            return (
              <React.Fragment key={`medications-list-${id}-${timesOfDay}`}>
                {!!groupedMedications[timesOfDay].length && (
                  <div className="cr_day_icons-medication-header">
                    {timesOfDay}
                  </div>
                )}
                {groupedMedications[timesOfDay].map(
                  (medication: MedicationItem) => {
                    const frequencyMeasure = getWordByCount(
                      medication.frequency,
                      groupedOptions.times[0] as WordForms,
                    );
                    return (
                      <div
                        key={`medications-list-${id}-${medication.id}`}
                        className="cr_day_icons-medication-item"
                      >
                        {medication.name} {medication.count}{" "}
                        {medication.measure}{" "}
                        {timesOfDay === OTHER &&
                          `${medication.frequency} ${frequencyMeasure}`}
                      </div>
                    );
                  },
                )}
              </React.Fragment>
            );
          })}
        </Tooltip>
      )}
    </div>
  );
};

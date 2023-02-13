import { Icon } from "@iconify/react";
import { useStore } from "effector-react";
import React from "react";
import { Tooltip } from "react-tooltip";

import { $options } from "MT_models/option";
import { MedicationInfo } from "MT_types/other";
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
                  (medication: MedicationInfo) => {
                    const {
                      name,
                      count,
                      nominativeCountMeasure,
                      frequency,
                      times,
                    } = medication;
                    return (
                      <div
                        key={`medications-list-${id}-${medication.id}`}
                        className="cr_day_icons-medication-item"
                      >
                        {name} {count} {nominativeCountMeasure}{" "}
                        {timesOfDay === OTHER && `${frequency} ${times}`}
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

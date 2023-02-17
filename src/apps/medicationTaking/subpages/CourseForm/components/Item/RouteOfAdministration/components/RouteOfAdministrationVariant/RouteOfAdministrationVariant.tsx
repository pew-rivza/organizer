import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { Select } from "components/Select";
import { useStore } from "effector-react";
import { SelectOption } from "types/other";
import { findObject } from "utils/objects";

import { DEFAULT } from "MT_const/common";
import { $changedMedications } from "MT_models/medication";
import { $options } from "MT_models/option";
import { CourseParams } from "MT_types/other";
import { RouteOfAdministrationItemVariantProps } from "MT_types/props";
import { ChangedMedication, GroupedOptions } from "MT_types/stores";
import { castToOptions } from "MT_utils/options";

import { ItemTemplate } from "../../../ItemTemplate";

export const RouteOfAdministrationVariant: React.FC<
  RouteOfAdministrationItemVariantProps
> = ({ variantSelectHandler, selectChangeHandler, name, selected, index }) => {
  const changedMedications = useStore<ChangedMedication[]>($changedMedications);
  const { id } = useParams() as CourseParams;
  const [selectedRouteOfAdministration, setSelectedRouteOfAdministration] =
    useState<SelectOption | null>(null);

  const groupedOptions = useStore<GroupedOptions>($options);
  const routeOfAdministrationOptions = useMemo<SelectOption[]>(() => {
    return castToOptions(groupedOptions.routeOfAdministration, DEFAULT);
  }, [groupedOptions.routeOfAdministration]);

  useEffect(() => {
    if (typeof index === "number") {
      const routeOfAdministrationId: number = changedMedications[index]
        .routeOfAdministrationId as number;

      routeOfAdministrationId &&
        selectChangeHandler(
          "routeOfAdministrationId",
          setSelectedRouteOfAdministration,
        )(
          findObject<number, SelectOption>(
            routeOfAdministrationOptions,
            "value",
            routeOfAdministrationId,
          ) || null,
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, routeOfAdministrationOptions]);

  return (
    <ItemTemplate.Variant
      selected={selected}
      onChange={variantSelectHandler}
      name={name}
      isDisabled={!selected}
    >
      <Select
        value={selectedRouteOfAdministration}
        onChange={selectChangeHandler(
          "routeOfAdministrationId",
          setSelectedRouteOfAdministration,
        )}
        placeholder={routeOfAdministrationOptions[0]?.label || "🕑"}
        options={routeOfAdministrationOptions}
        isDisabled={!selected}
      />
    </ItemTemplate.Variant>
  );
};

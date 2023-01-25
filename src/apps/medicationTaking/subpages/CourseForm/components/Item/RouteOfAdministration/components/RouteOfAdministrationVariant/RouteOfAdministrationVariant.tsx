import { useStore } from "effector-react";
import React, { useMemo, useState } from "react";

import { Select } from "components/Select";
import { Option } from "types/other";

import { DEFAULT } from "MT_const/common";
import { $options } from "MT_models/option";
import { GroupedOptions } from "MT_types/other";
import { RouteOfAdministrationItemVariantProps } from "MT_types/props";
import { castToOptions } from "MT_utils/castToOptions";

import { ItemTemplate } from "../../../ItemTemplate";

export const RouteOfAdministrationVariant: React.FC<
  RouteOfAdministrationItemVariantProps
> = ({ variantSelectHandler, selectChangeHandler, name, selected }) => {
  const [selectedRouteOfAdministration, setSelectedRouteOfAdministration] =
    useState<Option | null>(null);

  const groupedOptions = useStore<GroupedOptions>($options);
  const routeOfAdministrationOptions = useMemo<Option[]>(() => {
    return castToOptions(groupedOptions.routeOfAdministration, DEFAULT);
  }, [groupedOptions.routeOfAdministration]);

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

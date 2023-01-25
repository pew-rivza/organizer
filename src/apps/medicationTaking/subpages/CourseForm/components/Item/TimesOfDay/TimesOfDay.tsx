import { useStore } from "effector-react";
import React, { useMemo, useState } from "react";

import { Select } from "components/Select";
import { Option } from "types/other";

import { DEFAULT } from "MT_const/common";
import { $options } from "MT_models/option";
import { GroupedOptions, NullableNumber } from "MT_types/other";
import { ItemProps } from "MT_types/props";
import { castToOptions } from "MT_utils/castToOptions";

import { ItemTemplate } from "../ItemTemplate";

export const TimesOfDay: React.FC<ItemProps<NullableNumber>> = ({
  onChange,
}) => {
  const [selectedTimesOfDay, setSelectedTimesOfDay] = useState<Option | null>(
    null,
  );

  const groupedOptions = useStore<GroupedOptions>($options);
  const timesOfDayOptions = useMemo<Option[]>(() => {
    return castToOptions(groupedOptions.timesOfDay, DEFAULT);
  }, [groupedOptions.timesOfDay]);

  const selectChangeHandler = (option: Option | null) => {
    setSelectedTimesOfDay(option);
    onChange("timesOfDayId", option?.value ? +option.value : null);
  };

  return (
    <ItemTemplate>
      <ItemTemplate.Label>Время суток</ItemTemplate.Label>
      <Select
        value={selectedTimesOfDay}
        onChange={selectChangeHandler}
        placeholder={timesOfDayOptions[0]?.label || "🕑"}
        options={timesOfDayOptions}
      />
    </ItemTemplate>
  );
};

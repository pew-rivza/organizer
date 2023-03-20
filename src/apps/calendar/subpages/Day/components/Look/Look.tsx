import React from "react";
import { toast } from "react-toastify";

import { Icon } from "@iconify/react";

import { convertUTCDate } from "utils/date";

import { API_DELETE_LOOK } from "CR_api/look";
import { updateCalendarLooks } from "CR_models/calendar";
import { LookDayProps } from "CR_types/props";

import "./Look.scss";

export const Look: React.FC<LookDayProps> = ({ look, date }) => {
  const deleteLook = async () => {
    const convertedDate = convertUTCDate(date);

    if (convertedDate) {
      await API_DELETE_LOOK(convertedDate);
      updateCalendarLooks(convertedDate);
      toast("Образ удален с текущего дня!", {
        toastId: 16,
        type: "success",
      });
    }
  };

  return (
    <div className="cr_day_look">
      <div className="cr_day_look_header">
        <div>
          <Icon
            icon="mdi:wardrobe-outline"
            className="cr_day_look_header-icon"
          />
          Образ на день
        </div>
        <Icon
          icon="ri:delete-bin-line"
          className="cr_day_look_header-delete"
          onClick={deleteLook}
        />
      </div>
      <div className="cr_day_look_item">
        <img alt="" src={look.image} />
      </div>
    </div>
  );
};

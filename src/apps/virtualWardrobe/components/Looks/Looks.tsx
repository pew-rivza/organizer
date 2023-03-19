import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";

import { DatePicker } from "components/DatePicker";
import { dateFormatter } from "const/common";
import { convertUTCDate } from "utils/date";

import { API_DELETE_LOOK } from "VW_api/look";
import { $looks, fetchLooksFx } from "VW_models/look";
import { Look } from "VW_types/stores";

import { API_PUT_ON_LOOK } from "CR_api/look";

import "./Looks.scss";

export const Looks: React.FC = () => {
  const looks = useStore<Look[]>($looks);
  const navigate = useNavigate();
  const fetchLooks = useEvent<Look[]>(fetchLooksFx);

  const deleteLook = async (id: number): Promise<void> => {
    await API_DELETE_LOOK(id);
    fetchLooks();
    toast("Образ удален!", {
      toastId: 14,
      type: "success",
    });
  };

  const putOnLook = async (date: Date | null, id: number) => {
    const convertedDate = convertUTCDate(date);
    if (convertedDate) {
      const formattedDate = dateFormatter.format(convertedDate);
      await API_PUT_ON_LOOK(convertedDate, id);

      toast(`Образ добавлен на ${formattedDate}`, {
        toastId: 15,
        type: "success",
      });
    }
  };

  return (
    <div className="vw_looks">
      {looks.map((look) => (
        <div
          key={look.id}
          className="vw_looks-item"
          onClick={() => navigate(`edit/${look.id}`)}
        >
          <img alt="" src={look.image} />

          <div
            className="vw_looks-item-toolbar"
            onClick={(event) => event.stopPropagation()}
          >
            <DatePicker
              onChange={(date) => putOnLook(date, look.id)}
              customInput={
                <Icon
                  icon="pixelarticons:calendar-tomorrow"
                  className="vw_looks-item-toolbar-calendar"
                />
              }
            />
            <Icon
              icon="ri:delete-bin-line"
              className="vw_looks-item-toolbar-delete"
              onClick={async (event) => {
                event.stopPropagation();
                await deleteLook(look.id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
